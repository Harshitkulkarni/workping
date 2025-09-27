import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeReview = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7777/review/employee/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
        setUpdates(res.data.updates);
      })
      .catch(() => toast.error("Failed to load employee updates"));
  }, [id]);

  const getUpdatesForTask = (ticketNumber) =>
    updates.filter((update) => update.ticketNumber === ticketNumber);

  const handleApprove = async (ticketNumber) => {
    try {
      await axios.put(
        `http://localhost:7777/approve-task/${ticketNumber}`,
        {},
        { withCredentials: true }
      );
      toast.success("Task approved");

      // Refresh data
      const res = await axios.get(
        `http://localhost:7777/review/employee/${id}`,
        { withCredentials: true }
      );
      setTasks(res.data.tasks);
      setUpdates(res.data.updates);
    } catch (err) {
      toast.error("Failed to approve task");
    }
  };

  const renderStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    if (status === "completed") {
      return (
        <span className={`${base} bg-green-100 text-green-700`}>Completed</span>
      );
    }
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-lime-600 mb-6">
        Employee Task Review
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned to this employee.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="mb-6 border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">
                Ticket #{task.ticketNumber}
              </h3>
              {renderStatusBadge(task.status)}
            </div>

            <p className="text-gray-700 mb-2">{task.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Assigned on: {new Date(task.assignedAt).toLocaleDateString()}
            </p>

            <h4 className="text-md font-semibold mb-2 text-lime-600">
              Updates:
            </h4>
            {getUpdatesForTask(task.ticketNumber).length === 0 ? (
              <p className="text-sm text-gray-500">No updates yet.</p>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4">
                {getUpdatesForTask(task.ticketNumber).map((update) => (
                  <li key={update._id}>
                    <strong>Status:</strong> {update.status} |{" "}
                    <strong>Comment:</strong> {update.comments} |{" "}
                    <strong>Date:</strong>{" "}
                    {new Date(update.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => handleApprove(task.ticketNumber)}
              disabled={task.status === "completed"}
              className={`mt-2 px-4 py-2 rounded-md text-sm text-white ${
                task.status === "completed"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {task.status === "completed" ? "Approved" : "Approve"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeReview;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const { userId } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const endpoint = userId
          ? `http://localhost:7777/tasks/user/${userId}`
          : `http://localhost:7777/my-tasks`;

        const res = await axios.get(endpoint, { withCredentials: true });
        setTasks(res.data.tasks);
      } catch (err) {
        toast.error("Failed to load tasks");
      }
    };

    fetchTasks();
  }, [userId]);
  console.log(tasks);
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "status") return a.status?.localeCompare(b.status);
    return (
      new Date(b.assignedAt || b.createdAt) -
      new Date(a.assignedAt || a.createdAt)
    );
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-lime-600 mb-6">
        {userId ? "User's Assigned Tasks" : "Your Assigned Tasks"}
      </h2>

      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <table className="w-full table-auto border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-lime-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Sl. No</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Ticket #</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task, index) => (
            <tr key={task._id} className="border-t">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                {new Date(
                  task.assignedAt || task.createdAt
                ).toLocaleDateString()}
              </td>
              <td className="p-3 font-mono">{task.ticketNumber}</td>
              <td className="p-3">{task.description}</td>
              <td className="p-3 capitalize">{task.status || "not present"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

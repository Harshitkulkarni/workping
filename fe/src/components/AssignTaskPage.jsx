import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Helper component for the Search Icon
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// --- Main Component ---
const AssignTaskPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // State for the modal and its inputs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [ticketNumber, setTicketNumber] = useState("");
  const [description, setDescription] = useState("");

  // Fetch employees on component mount
  useEffect(() => {
    axios
      .get("http://localhost:7777/users/my-employees", {
        withCredentials: true,
      })
      .then((res) => {
        setEmployees(res.data.employees);
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to fetch employees.");
      });
  }, []);

  // --- Modal Controls ---
  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setTicketNumber("");
    setDescription("");
  };

  // --- Task Assignment Logic ---
  const handleAssign = async () => {
    if (!ticketNumber || !description) {
      toast.warn("Please enter ticket number and description.");
      return;
    }
    if (!selectedEmployee) {
      toast.error("No employee selected.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:7777/assign-task",
        {
          employeeId: selectedEmployee._id,
          ticketNumber,
          description,
        },
        { withCredentials: true }
      );
      toast.success(`Task assigned to ${selectedEmployee.fullName}!`);
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to assign task.");
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((emp) =>
    emp.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="bg-brand-green-light min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* --- Header --- */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800">Assign Tasks</h1>
            <p className="text-slate-500 mt-2">
              Select an employee from the list to assign a new task.
            </p>
          </div>

          {/* --- Main Content Card --- */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Find an employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>

            {/* Employee List */}
            <div className="space-y-2">
              {filteredEmployees.map((emp) => (
                <button
                  key={emp._id}
                  onClick={() => handleOpenModal(emp)}
                  className="w-full flex items-center p-4 rounded-lg text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-green-700 font-semibold">
                      {getInitials(emp.fullName)}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-800">
                      {emp.fullName}
                    </p>
                    <p className="text-sm text-slate-500">{emp.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Assignment Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#f9faf7] bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Assign Task
            </h2>
            <p className="mb-6 text-slate-600">
              To:{" "}
              <span className="font-semibold text-brand-green-dark">
                {selectedEmployee?.fullName}
              </span>
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ticket Number"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="bg-[#9ce56d] font-semibold text-[#102713] flex items-center rounded-lg py-2 border border-[#102713] px-6 cursor-pointer hover:shadow-2xl"
              >
                Assign Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignTaskPage;

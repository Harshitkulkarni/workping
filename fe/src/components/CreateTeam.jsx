import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { baseURL } from "@/utils/constant";

const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    memberIds: [],
    manager: "", // ✅ Include manager in teamData
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + "/employees", { withCredentials: true })
      .then((res) => setEmployees(res.data.users))
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (id) => {
    setTeamData((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(id)
        ? prev.memberIds.filter((uid) => uid !== id)
        : [...prev.memberIds, id],
    }));
  };

  const handleManagerSelect = (e) => {
    setTeamData({ ...teamData, manager: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamData.manager) {
      toast.warn("Please select a manager for the team");
      return;
    }

    if (!teamData.memberIds.includes(teamData.manager)) {
      toast.warn("Manager must also be a team member");
      return;
    }

    try {
      await axios.post(baseURL + "/create", teamData, {
        withCredentials: true,
      });
      toast.success("Team created successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error("Failed to create team");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-lime-600">
        Create New Team
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Team Name"
          value={teamData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
        />
        <textarea
          name="description"
          placeholder="Team Description"
          value={teamData.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
        />

        {/* Manager Selection */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Manager
        </label>
        <select
          value={teamData.manager}
          onChange={handleManagerSelect}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md bg-gray-50"
        >
          <option value="" disabled>
            Select Manager
          </option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.fullName}
            </option>
          ))}
        </select>

        {/* Team Members */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Select Team Members
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {employees.map((emp) => (
            <label
              key={emp._id}
              className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <input
                type="checkbox"
                checked={teamData.memberIds.includes(emp._id)}
                onChange={() => handleCheckbox(emp._id)}
              />
              <div>
                <p className="font-medium">{emp.fullName}</p>
                <p className="text-sm text-gray-500">{emp.email}</p>
              </div>
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-md transition"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;

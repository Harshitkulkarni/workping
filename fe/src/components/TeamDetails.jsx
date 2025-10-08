import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { baseURL } from "@/utils/constant";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/myteams/${id}`, { withCredentials: true })
      .then((res) => setTeam(res.data.team))
      .catch((err) => toast.error("Failed to load team details"));
  }, [id]);

  if (!team)
    return (
      <div className="text-center mt-20 text-gray-500">Loading team...</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-lime-600 mb-6">{team.name}</h2>
      <p className="text-gray-600 mb-8">{team.description}</p>

      <table className="w-full table-auto border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-lime-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">EmpID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.members.map((member) => {
            const empId = member._id.slice(-3); // last 3 digits
            return (
              <tr key={member._id} className="border-t">
                <td className="p-3">
                  <img
                    src={member.photoURL}
                    alt={member.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-mono">{empId}</td>
                <td className="p-3">{member.fullName}</td>
                <td className="p-3">{member.role}</td>
                <td className="p-3">{member.type}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/tasks/user/${member._id}`)}
                    className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    View Task
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamDetails;

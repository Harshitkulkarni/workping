import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { baseURL } from "@/utils/constant";
const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + "/myteams", { withCredentials: true })
      .then((res) => setTeams(res.data.teams))
      .catch((err) => toast.error("Failed to load teams"));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-lime-600 mb-10">
        Your Teams
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/myteams/${team._id}`)}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {team.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{team.description}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Created by: <strong>{team.createdBy?.fullName}</strong>
              </span>
              <span className="text-sm text-gray-500">
                👥 {team.members.length} members
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {team.members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md shadow-sm"
                >
                  <img
                    src={member.photoURL}
                    alt={member.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{member.fullName}</p>
                    <p className="text-xs text-gray-500">{member.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;

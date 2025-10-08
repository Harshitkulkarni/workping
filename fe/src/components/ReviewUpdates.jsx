import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { baseURL } from "@/utils/constant";

const ReviewUpdates = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + "/review/employees", { withCredentials: true })
      .then((res) => setEmployees(res.data.employees))
      .catch(() => toast.error("Failed to load employees"));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-lime-600 mb-6">
        Review Team Updates
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center"
          >
            <img
              src={emp.photoURL}
              alt={emp.fullName}
              className="w-16 h-16 rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold">{emp.fullName}</h3>
            <p className="text-sm text-gray-500">{emp.email}</p>
            <p className="text-sm text-gray-500 capitalize">{emp.type}</p>
            <button
              onClick={() => navigate(`/review/employee/${emp._id}`)}
              className="mt-4 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md text-sm"
            >
              View Updates
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewUpdates;

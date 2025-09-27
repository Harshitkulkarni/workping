import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatesForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ticketNumber: "",
    description: "",
    status: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:7777/updatesform",
      formData,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200 || res.status === 201) {
      toast.success("Form submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 1500); // Delay to let toast show
    } else {
      toast.error("Form submission failed!");
    }
  };
  return (
    <div>
      <div className="flex h-full items-center justify-center px-4 mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-lime-100"
        >
          <h2 className="text-3xl font-semibold text-center text-black mb-3 tracking-tight">
            UPDATES
          </h2>
          <input
            type="text"
            name="ticketNumber"
            placeholder="Ticket Number"
            value={formData.ticketNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm focus:outline-none focus:ring focus:border-green-400"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            required
            className="w-full border border-gray-300 rounded-md p-3 mb-4 text-sm text-gray-500 focus:outline-none focus:ring focus:border-green-400"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
          </select>

          <textarea
            name="comments"
            placeholder="Comments"
            value={formData.comments}
            onChange={handleChange}
            required
            rows="1"
            className="w-full border border-gray-300 rounded-md p-4 mb-4 text-base focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-400 resize-y min-h-[100px]"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="1"
            className="w-full border border-gray-300 rounded-md p-4 mb-6 text-base focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-400 resize-y min-h-[100px]"
          />
          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold rounded-md py-3 transition shadow-lg shadow-lime-100"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatesForm;

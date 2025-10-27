import React from "react";

const Maintenance = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Maintenance Requests</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Issue Description</label>
          <textarea className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400" rows="4" placeholder="Describe your issue"></textarea>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Maintenance;

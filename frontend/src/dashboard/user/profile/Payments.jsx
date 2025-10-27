import React from "react";

const Payments = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Payment History</h2>
      <table className="w-full border border-green-300 rounded-lg">
        <thead className="bg-green-200">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-green-300">
            <td className="p-3">2025-09-01</td>
            <td className="p-3">Rs. 5000</td>
            <td className="p-3 text-green-700 font-semibold">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payments;

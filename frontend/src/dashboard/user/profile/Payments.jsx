import React, { useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiCheckLine,
  RiTimeLine,
  RiErrorWarningLine,
  RiCloseLine,
} from "react-icons/ri";

const Payments = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [preview, setPreview] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      month: "January 2025",
      amount: 15000,
      status: "paid",
      date: "2025-01-05",
      method: "Bank Transfer",
    },
    {
      id: 2,
      month: "December 2024",
      amount: 15000,
      status: "paid",
      date: "2024-12-03",
      method: "Online Payment",
    },
    {
      id: 3,
      month: "February 2025",
      amount: 15000,
      status: "pending",
      date: "Due: 2025-02-05",
      method: "-",
    },
  ]);

  // Calculate outstanding balance dynamically
  const outstandingBalance = paymentHistory
    .filter((payment) => payment.status === "pending")
    .reduce((total, payment) => total + payment.amount, 0);

  const getStatusIcon = (status) => {
    if (status === "paid") return <RiCheckLine className="text-green-600 text-lg" />;
    if (status === "pending") return <RiTimeLine className="text-yellow-600 text-lg" />;
    return <RiErrorWarningLine className="text-red-600 text-lg" />;
  };

  const getStatusStyle = (status) => {
    if (status === "paid")
      return "bg-green-100 text-green-700 border border-green-200";
    if (status === "pending")
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    return "bg-red-100 text-red-700 border border-red-200";
  };

  const handleSlipChange = (e) => {
    const file = e.target.files[0];
    setPaymentSlip(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (!paymentSlip) {
      alert("Please attach your payment slip before submitting.");
      return;
    }

    const newPayment = {
      id: paymentHistory.length + 1,
      month: new Date().toLocaleString("default", { month: "long", year: "numeric" }),
      amount: 15000, // You can make this dynamic from input later
      status: "pending",
      date: `Submitted: ${new Date().toLocaleDateString()}`,
      method: paymentMethod,
    };

    setPaymentHistory([newPayment, ...paymentHistory]);

    alert(`Payment proof submitted successfully via ${paymentMethod}. Awaiting verification.`);
    setShowModal(false);
    setPaymentSlip(null);
    setPreview(null);
    setPaymentMethod("Bank Transfer");

    // TODO: Replace with backend API call
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Outstanding Balance Card */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Outstanding Balance</p>
            <h2 className="text-3xl font-bold text-gray-800">
              LKR {outstandingBalance.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Due: {paymentHistory.find(p => p.status === "pending")?.date || "No pending payments"}
            </p>
          </div>
          <RiMoneyDollarCircleLine className="text-green-500 text-6xl opacity-60" />
        </div>
        {outstandingBalance > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Pay Now
          </button>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Payment History</h3>
        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                  {getStatusIcon(payment.status)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{payment.month}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-800">LKR {payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{payment.method}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${getStatusStyle(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Payment Slip Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <RiCloseLine size={22} />
            </button>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Upload Payment Proof
            </h3>

            <p className="text-gray-600 text-sm mb-4">
              Please deposit to the following bank account and upload your payment slip.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-2 text-sm text-gray-700 border border-gray-200">
              <p><strong>Bank Name:</strong> People's Bank</p>
              <p><strong>Account Name:</strong> University Hostel Fund</p>
              <p><strong>Account No:</strong> 1234567890</p>
              <p><strong>Branch:</strong> Matara</p>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Payment Method:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
                >
                  <option>Bank Transfer</option>
                  <option>Online Payment</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Upload Payment Slip:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSlipChange}
                  className="mt-2 block w-full text-sm text-gray-600 border border-gray-300 rounded-md p-2"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Slip Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg border border-gray-200"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow"
              >
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
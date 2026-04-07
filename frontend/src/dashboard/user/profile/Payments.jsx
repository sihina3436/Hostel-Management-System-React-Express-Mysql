import React, { useEffect, useMemo, useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiCheckLine,
  RiTimeLine,
  RiErrorWarningLine,
  RiCloseLine,
  RiUploadCloud2Line,
  RiBankLine,
  RiSecurePaymentLine,
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

  // revoke blob URL on unmount / change to prevent memory leak
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const outstandingBalance = useMemo(() => {
    return paymentHistory
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  }, [paymentHistory]);

  const nextDue = useMemo(() => {
    return paymentHistory.find((p) => p.status === "pending")?.date || "No pending payments";
  }, [paymentHistory]);

  const statusMeta = (status) => {
    if (status === "paid") {
      return {
        icon: <RiCheckLine className="text-emerald-300 text-lg" />,
        pill: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/20",
        label: "Paid",
      };
    }
    if (status === "pending") {
      return {
        icon: <RiTimeLine className="text-amber-300 text-lg" />,
        pill: "bg-amber-500/15 text-amber-200 border border-amber-500/20",
        label: "Pending",
      };
    }
    return {
      icon: <RiErrorWarningLine className="text-rose-300 text-lg" />,
      pill: "bg-rose-500/15 text-rose-200 border border-rose-500/20",
      label: "Overdue",
    };
  };

  const handleSlipChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPaymentSlip(file);

    const url = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentSlip(null);
    setPaymentMethod("Bank Transfer");
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
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
      amount: 15000,
      status: "pending",
      date: `Submitted: ${new Date().toLocaleDateString()}`,
      method: paymentMethod,
    };

    setPaymentHistory([newPayment, ...paymentHistory]);

    alert(`✅ Payment proof submitted via ${paymentMethod}. Awaiting verification.`);
    handleCloseModal();

    // TODO: Replace with backend API call
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

          <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="text-white/60 text-sm font-semibold">Outstanding Balance</div>
              <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                LKR {outstandingBalance.toLocaleString()}
              </div>
              <div className="mt-2 text-sm text-white/60">
                Next due: <span className="text-white/85 font-semibold">{nextDue}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <RiSecurePaymentLine />
                  Secure submissions
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                  <RiBankLine />
                  Bank deposit supported
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 grid place-items-center text-emerald-200">
                <RiMoneyDollarCircleLine className="text-3xl" />
              </div>

              {outstandingBalance > 0 ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 px-5 py-3 font-extrabold
                             hover:bg-emerald-400 transition"
                >
                  Pay Now
                </button>
              ) : (
                <span className="text-sm text-white/70 font-semibold">
                  No payments due
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-7">
          <div className="text-white font-extrabold text-lg">Tips</div>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>• Upload a clear slip image (no blur).</li>
            <li>• Include ref number in transfer description.</li>
            <li>• Verification can take 24–48 hours.</li>
          </ul>
        </div>
      </div>

      {/* Payment history */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-6 sm:p-7 flex items-end justify-between gap-4">
          <div>
            <div className="text-white font-extrabold text-xl">Payment History</div>
            <div className="mt-1 text-sm text-white/60">
              Track payments and verification status.
            </div>
          </div>

          <div className="text-xs text-white/60 font-semibold">
            Records: <span className="text-white/85">{paymentHistory.length}</span>
          </div>
        </div>

        <div className="px-6 sm:px-7 pb-7">
          <div className="space-y-3">
            {paymentHistory.map((payment) => {
              const meta = statusMeta(payment.status);

              return (
                <div
                  key={payment.id}
                  className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                        {meta.icon}
                      </div>

                      <div>
                        <div className="text-white font-bold">{payment.month}</div>
                        <div className="text-sm text-white/60">{payment.date}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="text-white font-extrabold">
                        LKR {Number(payment.amount).toLocaleString()}
                      </div>
                      <div className="text-sm text-white/60">{payment.method}</div>

                      <span
                        className={[
                          "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
                          meta.pill,
                        ].join(" ")}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 bg-slate-950/70"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

            <div className="p-6 sm:p-7 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 h-10 w-10 rounded-2xl bg-white/5 border border-white/10
                           grid place-items-center text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Close modal"
              >
                <RiCloseLine size={20} />
              </button>

              <div className="text-white font-extrabold text-xl">
                Upload Payment Proof
              </div>
              <div className="mt-1 text-sm text-white/60">
                Deposit to the following bank account and upload your slip.
              </div>

              {/* Bank details */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 space-y-1.5">
                <div className="flex items-center gap-2 text-white/90 font-bold">
                  <RiBankLine />
                  Bank Details
                </div>
                <div>
                  <span className="text-white/60">Bank Name:</span>{" "}
                  <span className="font-semibold">People's Bank</span>
                </div>
                <div>
                  <span className="text-white/60">Account Name:</span>{" "}
                  <span className="font-semibold">University Hostel Fund</span>
                </div>
                <div>
                  <span className="text-white/60">Account No:</span>{" "}
                  <span className="font-semibold">1234567890</span>
                </div>
                <div>
                  <span className="text-white/60">Branch:</span>{" "}
                  <span className="font-semibold">Matara</span>
                </div>
              </div>

              <form onSubmit={handleSubmitPayment} className="mt-5 space-y-4">
                {/* Method */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 text-white px-4 py-3 outline-none
                               focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15 transition"
                  >
                    <option className="bg-slate-900" value="Bank Transfer">
                      Bank Transfer
                    </option>
                    <option className="bg-slate-900" value="Online Payment">
                      Online Payment
                    </option>
                  </select>
                </div>

                {/* Upload */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Upload Payment Slip (image)
                  </label>

                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSlipChange}
                      className="hidden"
                    />

                    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 hover:bg-white/10 transition cursor-pointer">
                      <div className="flex items-center gap-3 text-white/80">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                          <RiUploadCloud2Line className="text-xl" />
                        </div>
                        <div>
                          <div className="font-bold text-white/90">
                            {paymentSlip ? paymentSlip.name : "Click to choose an image"}
                          </div>
                          <div className="text-xs text-white/60">
                            PNG/JPG recommended. Clear photo.
                          </div>
                        </div>
                      </div>

                      {preview && (
                        <img
                          src={preview}
                          alt="Slip Preview"
                          className="mt-4 w-full h-44 object-cover rounded-2xl border border-white/10"
                        />
                      )}
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold hover:bg-emerald-400 transition"
                >
                  Submit Payment
                </button>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full rounded-2xl bg-white/5 border border-white/10 text-white/90 py-3 font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
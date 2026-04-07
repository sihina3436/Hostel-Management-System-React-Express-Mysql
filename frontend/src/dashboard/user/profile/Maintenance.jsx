import React, { useMemo, useState } from "react";
import {
  RiToolsLine,
  RiSendPlane2Line,
  RiAlertLine,
  RiCheckLine,
  RiTimeLine,
} from "react-icons/ri";

const Maintenance = () => {
  const [issue, setIssue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // demo local history (replace later with API)
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "Light not working",
      description: "The tube light is not working since yesterday.",
      status: "pending",
      date: "2026-03-18",
    },
    {
      id: 2,
      title: "Water leakage",
      description: "Leakage near the washroom tap, please fix.",
      status: "resolved",
      date: "2026-02-27",
    },
  ]);

  const canSubmit = useMemo(() => issue.trim().length >= 10 && !submitting, [issue, submitting]);

  const statusMeta = (status) => {
    if (status === "resolved") {
      return {
        icon: <RiCheckLine className="text-emerald-200 text-lg" />,
        pill: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
        label: "Resolved",
      };
    }
    if (status === "pending") {
      return {
        icon: <RiTimeLine className="text-amber-200 text-lg" />,
        pill: "bg-amber-500/10 border-amber-500/20 text-amber-200",
        label: "Pending",
      };
    }
    return {
      icon: <RiAlertLine className="text-rose-200 text-lg" />,
      pill: "bg-rose-500/10 border-rose-500/20 text-rose-200",
      label: "Rejected",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // Demo: simulate API
      await new Promise((r) => setTimeout(r, 600));

      const newReq = {
        id: Date.now(),
        title: issue.trim().split(" ").slice(0, 4).join(" ") + (issue.trim().split(" ").length > 4 ? "..." : ""),
        description: issue.trim(),
        status: "pending",
        date: new Date().toISOString().slice(0, 10),
      };

      setRequests((prev) => [newReq, ...prev]);
      setIssue("");
      alert("✅ Maintenance request submitted. We will review it soon.");
    } catch (err) {
      alert("❌ Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Maintenance
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Submit issues and track request status.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-white/85">
          <RiToolsLine className="text-lg text-emerald-200" />
          Requests: {requests.length}
        </span>
      </div>

      {/* Create request */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Issue Description
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={5}
              placeholder="Describe your issue (e.g. water leak, broken fan, damaged socket)..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/40
                         px-4 py-3 outline-none transition
                         focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-white/60">
                Minimum 10 characters.
              </span>
              <span className={issue.trim().length >= 10 ? "text-emerald-200 font-bold" : "text-white/45"}>
                {issue.trim().length}/10
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold
                       hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <RiSendPlane2Line className="text-lg" />
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-6 sm:p-8">
          <h3 className="text-white font-extrabold text-xl">My Requests</h3>
          <p className="mt-1 text-sm text-white/60">
            Latest requests appear at the top.
          </p>

          <div className="mt-5 space-y-3">
            {requests.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70 font-semibold">
                No maintenance requests yet.
              </div>
            ) : (
              requests.map((r) => {
                const meta = statusMeta(r.status);

                return (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-white font-extrabold truncate">
                          {r.title}
                        </div>
                        <div className="mt-1 text-sm text-white/60">
                          Submitted: <span className="text-white/85 font-semibold">{r.date}</span>
                        </div>
                        <p className="mt-3 text-sm text-white/75 leading-relaxed">
                          {r.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
                          {meta.icon}
                        </div>
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
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
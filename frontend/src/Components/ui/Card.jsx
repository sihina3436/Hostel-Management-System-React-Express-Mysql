import React from "react";

const Card = ({ className = "", children }) => {
  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-white/5 backdrop-blur",
        "shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Accent bar (optional but matches your theme) */}
      <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
      <div className="p-0">{children}</div>
    </div>
  );
};

export default Card;
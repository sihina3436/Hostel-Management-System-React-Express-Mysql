import React from "react";

const PageHeader = ({ title, subtitle, right }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {title}
        </h1>
        {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
      </div>

      {right && <div className="flex gap-2">{right}</div>}
    </div>
  );
};

export default PageHeader;
import React from "react";

const BaseComponent = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-neutral shadow-custom rounded-lg p-6 border border-gray-200 ${className}`}
    >
      {title && (
        <h2 className="text-2xl font-semibold text-primary mb-4">{title}</h2>
      )}
      <div className="text-textPrimary">{children}</div>
    </div>
  );
};

export default BaseComponent;

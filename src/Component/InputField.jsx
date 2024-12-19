// components/InputField.jsx
import React from "react";

const InputField = ({ label, type, id, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        required={required}
      />
    </div>
  );
};

export default InputField;

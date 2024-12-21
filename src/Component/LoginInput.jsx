import * as React from "react";

const LoginInput = ({ label, id, type = "text", placeholder, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <>
      <label htmlFor={id} className="self-start mt-10 text-xl font-medium">
        {label}
      </label>
      <input
         id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="px-8 py-4 mt-3.5 w-full text-base bg-violet-100 shadow-lg rounded-[40px] text-slate-700"
        aria-label={label}
      />
    </>
  );
}

export default LoginInput;


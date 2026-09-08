import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
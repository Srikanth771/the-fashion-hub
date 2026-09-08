import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
}) => {
  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-900",
    secondary:
      "bg-white text-black border border-gray-300 hover:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
    success:
      "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-5 py-2 rounded-lg font-medium transition duration-300 disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
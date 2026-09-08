import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;
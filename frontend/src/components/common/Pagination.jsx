import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center gap-3 mt-8">

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}

    </div>
  );
};

export default Pagination;
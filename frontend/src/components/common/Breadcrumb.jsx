import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex gap-2 text-sm">

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">

          {index !== items.length - 1 ? (
            <>
              <Link
                to={item.path}
                className="hover:text-blue-600"
              >
                {item.label}
              </Link>

              /
            </>
          ) : (
            <span className="font-semibold">
              {item.label}
            </span>
          )}

        </div>
      ))}

    </nav>
  );
};

export default Breadcrumb;
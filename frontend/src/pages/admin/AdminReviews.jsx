
import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rohit Sharma",
    product: "Slim fit oxford shirt",
    comment: "Fits perfectly and the fabric feels premium.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Reddy",
    product: "Bomber jacket",
    comment: "Great look, sleeves are slightly long.",
    rating: 4,
  },
  {
    id: 3,
    name: "Imran Khan",
    product: "Leather derby shoes",
    comment: "Sole came loose after a week. Requesting a return.",
    rating: 2,
  },
  {
    id: 4,
    name: "Karan Mehta",
    product: "Cotton kurta set",
    comment: "Ideal for the festive season.",
    rating: 5,
  },
];

const AdminReviews = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Customer feedback and product ratings
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Customer Reviews</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="px-5 py-5 hover:bg-gray-50 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    on {review.product}
                  </p>
                </div>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
          Showing {reviews.length} reviews
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

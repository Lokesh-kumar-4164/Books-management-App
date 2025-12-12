import React, { useState } from "react";
import useUser from "../context/useUser.jsx";
import apiClient from "../services/api-config.js";

const ReviewForm = ({ bookID, addReviewToState }) => {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const starIndices = [1, 2, 3, 4, 5];

  const handleStarClick = (index) => {
    if (!user) {
      alert("Please login to submit a review");
      return;
    }
    setRating(index);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please add some stars");
      return;
    }

    const reviewData = {
      rating,
      comment: reviewText.trim() || "-",
    };

    try {
      const response = await apiClient.post(
        "https://api-booknook.onrender.com/api/books/add-review",
        {
          bookId: bookID,
          userId: user._id,
          rating: reviewData.rating,
          review: reviewData.comment,
        }
      );

      // Add new review to parent state
      addReviewToState({
        _id: response.data._id || Math.random(), 
        user: user.name,
        ...reviewData,
      });

      // Reset form
      setRating(0);
      setReviewText("");

      alert("Review submitted successfully! ✨");
    } catch (e) {
      console.log("Error submitting review:", e);
      alert("Failed to submit review. Try again!");
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Rate & Review This Masterpiece! 📖
        </h2>

        {/* Star Rating */}
        <div className="flex justify-center items-center space-x-1 mb-4">
          {starIndices.map((index) => (
            <button
              key={index}
              onClick={() => handleStarClick(index)}
              aria-label={`Rate ${index} star${index > 1 ? "s" : ""}`}
              className={`text-4xl transition-all duration-200 ease-out ${
                index <= rating
                  ? "text-yellow-400 scale-110"
                  : "text-gray-300 scale-100"
              } hover:scale-125 focus:outline-none transform`}
            >
              {index <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        <p className="mt-2 mb-4 font-semibold text-gray-700">
          {rating > 0 ? `Selected Rating: ${rating}/5` : "Click a star to rate!"}
        </p>

        {/* Review Textarea */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 transition duration-150 resize-none outline-none text-sm text-gray-700 mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-gradient-to-r from-teal-400 to-cyan-600 text-white font-bold tracking-wide py-3 rounded-lg shadow-lg shadow-cyan-300/50 hover:shadow-xl hover:shadow-cyan-400/60 transition duration-300 transform hover:scale-[1.01] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {rating === 0 ? "Select Stars to Submit" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;

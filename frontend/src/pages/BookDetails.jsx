import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../services/api-config.js";
import Loading from "../components/Loading.jsx";
import ReviewForm from "../components/Review.jsx";
import useUser from "../context/useUser.jsx";

function BookDetails() {
  const { user } = useUser();
  const location = useLocation();
  const book = location.state; 
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  // Fetch reviews
 

  
  const calculateAvg = (reviewsArray) => {
    if (reviewsArray.length === 0) return setAvgRating(0);
    const sum = reviewsArray.reduce((acc, r) => acc + r.rating, 0);
    setAvgRating((sum / reviewsArray.length).toFixed(1));
  };

  // Add review to state
  const addReviewToState = (newReview) => {
    const updated = [...reviews, newReview];
    setReviews(updated);
    calculateAvg(updated);
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const response = await apiClient.delete(`https://api-booknook.onrender.com/api/books/delete-review/${reviewId}`);
      if(response.status!=204) throw new Error("Failed to delete review.");
      const updated = reviews.filter((r) => r._id !== reviewId);
      setReviews(updated);
      calculateAvg(updated);
      alert("Review deleted successfully!");
    } catch (e) {
      console.log("Delete failed:", e);
      alert("Failed to delete review.");
    }
  };

  useEffect(() => {
    if (!book) return;
     const fetchReviews = async () => {
    try {
      const response = await apiClient.get(
        `https://api-booknook.onrender.com/api/books/reviews/${book._id}`
      );
      // const response = await apiClient.get(
      //   `http://localhost:3200/api/books/reviews/${book._id}`
      // );
      setReviews(response.data.reviews);
      
      calculateAvg(response.data.reviews);
    } catch (e) {
      console.log("Error fetching reviews:", e);
      setReviews([]);
    }
  };
  fetchReviews()
    
  }, [book]);

  

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-teal-700 mb-2">{book?.title}</h1>
        <h2 className="text-xl text-gray-700 mb-2">by {book?.author}</h2>
        <p className="text-yellow-600 font-semibold mb-4">
          ⭐ Average Rating: {avgRating} / 5
        </p>

        <div className="flex flex-wrap gap-4 mb-4">
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
            {book.genre}
          </span>
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
            Published: {book.publishedYear}
          </span>
        </div>

        <p className="text-gray-700 mb-6">{book.description}</p>

        {/* Review Form */}
        <ReviewForm bookID={book._id} addReviewToState={addReviewToState} />

        {/* Reviews List */}
        {(reviews && reviews.length === 0) ? (
          <h3 className="text-xl font-semibold text-gray-600 mt-6">
            No reviews yet
          </h3>
        ) : (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-teal-700">Reviews</h3>
            <div className="space-y-4">
              {reviews && reviews.map((review) => (
                <div
                  key={review._id || review.id}
                  className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{review.user}</span>
                    <span className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {review.review || "No text, just a rating!"}
                    
                  </p>

                  {/* Delete button only for the user who posted the review */}
                  
                    {user && user._id === review.userId && (
                     <button 
                       onClick={() => handleDeleteReview(review._id)}
                       className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
                     >
                       Delete 
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;

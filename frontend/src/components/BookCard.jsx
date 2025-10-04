import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Card = ({ book }) => {
  const Navigate = useNavigate()
  return (
    <div className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer relative">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{book.title}</h3>
      <p className="text-gray-600 mb-1">Author: {book.author}</p>
      <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
      <p className="text-gray-600 mb-1">Published: {book.publishedYear}</p>
      
      {book.rating && (
        <p className="text-yellow-500 font-medium mb-4">
          {"★".repeat(Math.round(book.rating))}{"☆".repeat(5 - Math.round(book.rating))} ({book.rating.toFixed(1)})
        </p>
      )}
      <button onClick={() => Navigate("/bookdetails",{state:book})} className="w-[80%] px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition mt-4 absolute top-[70%] left-5">
        View Details
      </button>
      <div className="w-full h-8"></div>
    </div>
  );
};

export default Card;

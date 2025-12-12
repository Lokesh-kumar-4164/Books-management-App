import React, { useState,useEffect } from "react";

import BookCard from "./BookCard";
import apiClient from "../services/api-config.js"
import Loading from "./Loading.jsx";


const  BookList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books,setBooks] = useState(null)
  const booksPerPage = 5;

  const getBooks = async () => {
    try{
      const response = await apiClient.get("https://api-booknook.onrender.com/api/books");
      setBooks(response.data)
    }catch(e){
      console.log("Error while fetching books"+e)
    }
  }

  useEffect(() => {
    getBooks()
  },[])

  if(!books){
    return <Loading/>
  }

  if( books.length === 0){
    return <div className="flex justify-center mt-8 space-x-3"><h1 className="text-xl">No books found</h1></div>
  }
  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Book List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1
                ? "bg-teal-600 text-white"
                : "bg-white text-teal-600 hover:bg-teal-100"
            } transition`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookList;

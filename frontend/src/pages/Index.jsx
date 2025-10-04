import React, { lazy,Suspense } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import useUser from "../context/useUser";

const BookCard = lazy(() => import('../components/BookCard'))

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Subtle Art of Not Giving a F***", author: "Mark Manson" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" },
  { id: 4, title: "Deep Work", author: "Cal Newport" },
];

function App() {
  const { user, login, logout } = useUser();
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-100 to-teal-200 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-900">
          Welcome to Your Book Collection!
        </h2>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Track your favorite books, discover new authors, and manage your reading journey—all in one place.
        </p>
        
      </section>

      {/* Books Section */}
      <Suspense fallback={<div>Loading...</div>}>
      
      <BookList/>
      </Suspense>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
        &copy; {new Date().getFullYear()} Book Management App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

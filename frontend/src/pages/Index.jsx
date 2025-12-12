import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import useUser from "../context/useUser";

const BookCard = lazy(() => import("../components/BookCard"));

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Subtle Art of Not Giving a F***", author: "Mark Manson" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" },
  { id: 4, title: "Deep Work", author: "Cal Newport" }
];

function App() {
  const { user, login, logout } = useUser();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur shadow-sm">
        
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-100 to-teal-200 py-24 text-center shadow-inner">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-teal-900 drop-shadow-sm">
            Welcome to BookNook!
          </h2>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Track your favorite books, explore new titles, and grow your reading journey.
          </p>

          <div className="mt-8">
            <a
              href="#books"
              className="px-6 py-3 bg-teal-700 text-white rounded-lg text-lg shadow hover:bg-teal-800  transition"
            >
              Browse Books
            </a>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-teal-800 text-center mb-10">
          Book Collection
        </h3>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <BookList />
        </Suspense>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BookNook — All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

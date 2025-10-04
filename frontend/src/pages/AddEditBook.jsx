import React, { useState, useEffect } from "react";

function AddEditBook({ book = null, onSave }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setGenre(book.genre);
      setPublishedYear(book.publishedYear);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = { title, author, description, genre, publishedYear };
    console.log("Saved book:", bookData);
    if (onSave) onSave(bookData);
    alert(`Book ${book ? "updated" : "added"} successfully!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-200 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          {book ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Author</label>
            <input
              type="text"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Book Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Genre</label>
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Published Year</label>
            <input
              type="number"
              placeholder="2023"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition transform hover:-translate-y-1"
          >
            {book ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEditBook;

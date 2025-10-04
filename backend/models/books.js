import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    publishedYear: { type: Number },
    averageRating: { type: Number, default: 0 },
  },

);

const Book = mongoose.model("Book", bookSchema);
export default Book;

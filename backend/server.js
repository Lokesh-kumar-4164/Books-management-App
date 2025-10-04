import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/books",bookRoutes)

const db = process.env.MONGO_URI;
mongoose
  .connect(db, {
    dbName: "BOOKS_DB",
  })
  .then(async () => {
    console.log("Connection Successful");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.error(" Connection FAILED:", err);
  });

const conn = mongoose.connection;
conn.on("error", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Received");
});

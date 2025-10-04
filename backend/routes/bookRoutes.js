import express from "express";
import Book from "../models/books.js";
import User from "../models/users.js";
import Review from "../models/reviews.js";

const router = express.Router()


router.get('/',async (req,res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(e){
        console.log(e);
    }
})

router.get("/reviews/:id",async (req,res) => {
    const {id } = req.params;
    try{
        const reviews = await Review.find({book_id:id})
        const reviewsPromises = reviews.map(async (review) => {
            review = review.toObject()
            const user = await User.findById(review.user_id)
            return {
                id:review._id,
                user: user?  user.name: "Unknown",
                rating:review.rating,
                comment:review.review
            }
        })
        const reviewsData = await Promise.all(reviewsPromises)
        res.status(200).json(reviewsData)
    }catch(e){
        console.log(e)
    }
})

router.post("/add-review",async (req,res) => {
    console.log(req.body)
    const {bookId:book_id,userId:user_id,rating,review} = req.body;
    try{
        const newReview = new Review({book_id,user_id,rating,review});
        await newReview.save();
        res.status(200).json({message:"Review added successfully"});
    }catch(e){
        console.log(e);
    }
})




export default router
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
    const {id:book } = req.params;
    
    try{
        const reviewData = await Review.find({book})
            .populate({path:"user",select:"name"})
            .populate({path:"book",select:"title"});
        const reviews = reviewData.map((r) => {
            if(r.book._id.toString() === book.toString()){
                return {
                    _id:r._id,
                    userId:r.user._id,
                    user:r.user.name,
                    rating:r.rating,
                    review:r.review
                } 
            }
        })
        
        res.status(200).json({reviews});

    }catch(e){
        console.log(e)
    }
})

router.post("/add-review",async (req,res) => {
    
    const {bookId:book,userId:user,rating,review} = req.body;
    try{ 
        const newReview = new Review({book,user,rating,review});
        await newReview.save();
        res.status(200).json({message:"Review added successfully"});
    }catch(e){
        console.log(e); 
    }
})

router.delete("/delete-review/:id",async (req,res) => {
    const {id} = req.params;
    try{
        await Review.findByIdAndDelete(id);   
        res.status(204).json({message:"Review deleted successfully"});
    }catch(e){
        console.log(e);
    }
})




export default router
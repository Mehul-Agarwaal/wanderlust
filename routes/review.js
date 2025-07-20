const express = require("express");
const router = express.Router({mergeParams: true});//mergeParams is important here

const {reviewSchema,listingSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpressError.js");


//review validation function
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError("400",errMsg);
    }
    else{
        next();
    }
};


//review route
//Post Route
router.post("/reviews",validateReview,wrapAsync (async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("new review is saved");
    res.redirect(`/listings/${listing._id}`);


}));

//Delete review route
router.delete("/:reviewId", wrapAsync(async(req,res)=>{
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
    
}));

module.exports = router;
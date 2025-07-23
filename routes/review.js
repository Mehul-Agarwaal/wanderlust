const express = require("express");
const router = express.Router({mergeParams: true});//mergeParams is important here
const wrapAsync = require("../utils/wrapAsyn.js");
const {validateReview,isLoggedIn,  isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");

//review route
//Post Route
router.post("/",isLoggedIn ,validateReview,wrapAsync (reviewControllers.reviewPost));

//Delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(reviewControllers.deleteReview));

module.exports = router;
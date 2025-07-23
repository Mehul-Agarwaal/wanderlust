const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing} = require("../middleware.js");



router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

router.get("/new",isLoggedIn, (req, res) => {
    res.render("./listings/new.ejs");
});


//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

//create route
router.post("/",isLoggedIn,validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
        console.log(newListing);
        req.flash("success","Listing saved successfully");
        res.redirect("/listings");

    }));

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));

//edit route
router.patch("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
   
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","edited the listing successfully")
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id",isLoggedIn,isOwner ,wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted")
    res.redirect("/listings");
}));

module.exports = router;

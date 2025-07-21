const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

//listing validation function
const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
    
}


router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

router.get("/new", (req, res) => {
    res.render("./listings/new.ejs")
});

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

//create route
router.post("/",validateListing,
    wrapAsync(async (req, res) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        console.log(newListing);
        req.flash("success","Listing saved successfully");
        res.redirect("/listings");

    }));

router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));

router.patch("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
}));

//delete route
router.delete("/:id",wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted")
    res.redirect("/listings");
}));

module.exports = router;


const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({accessToken: mapToken});

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
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
};

module.exports.createListing = async (req, res) => {
    let response = await geoCodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
    })
    .send();

    if (!response || !response.body || !response.body.features || response.body.features.length === 0) {
        req.flash("error", "Invalid location. Please provide a valid address.");
        return res.redirect("/listings/new");
    }
    
    
    let url = req.file.path;
    let filename= req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
   
    req.flash("success","Listing saved successfully");
    res.redirect("/listings");

};

module.exports.editGet = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/w_250");
    
    res.render("./listings/edit.ejs", { listing,originalUrl });
};

module.exports.edit = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);

    // Update fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    listing.category = req.body.listing.category;

    // Re-geocode
    if (req.body.listing.location) {
        const response = await geoCodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();

        if (response.body.features.length > 0) {
            listing.geometry = response.body.features[0].geometry;
        } else {
            console.log("No geocode result found");
        }
    }

    // Update image if provided
    if (typeof req.file !== "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save(); // 💥 Must always be called
    req.flash("success", "Edited the listing successfully");
    res.redirect(`/listings/${id}`);
};


module.exports.delete = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted")
    res.redirect("/listings");
};
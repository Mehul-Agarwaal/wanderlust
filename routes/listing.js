const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const {isLoggedIn ,isOwner,validateListing} = require("../middleware.js");
const multer = require("multer"); 
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

//controllers
const listingControllers = require("../controllers/listings.js");


router
    .route("/")
    //index route
    .get( wrapAsync(listingControllers.index))
    //create route
    .post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingControllers.createListing));
   

router.get("/new",isLoggedIn, listingControllers.renderNewForm);


router.route("/:id")
    //show route
    .get( wrapAsync(listingControllers.showListings))
    //edit route
    .patch(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingControllers.edit))
    //delete route
    .delete(isLoggedIn,isOwner ,wrapAsync(listingControllers.delete));


//edit get route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingControllers.editGet));


module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const Listing = require("../models/listing.js");

const filterController = require("../controllers/filters.js")

router.get("/:category",wrapAsync(filterController.showFilteredListings));

module.exports=router;
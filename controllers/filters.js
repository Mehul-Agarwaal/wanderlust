const Listing = require("../models/listing");

module.exports.showFilteredListings = async (req,res)=>{
    const {category}=req.params;
    const allListings =await Listing.find({category:category});
    res.render("./listings/index.ejs",{allListings});
}

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/outdoor-lamps-turned-on-XbwHrt87mQ0",
            set: (v) =>
            v === ""
            ? "https://unsplash.com/photos/outdoor-lamps-turned-on-XbwHrt87mQ0"
            : v,
        },
    },

    price:Number,
    location:String,
    country:String,
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;
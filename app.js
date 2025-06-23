const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("./models/listing.js");

//connect to mongodb
main()
.then((res)=>{console.log("database connected");})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//models


app.get("/",(req,res)=>{
    res.send("Working");
});

app.get("/testListing",async (req,res)=>{
    let sampleListing = new Listing({
        title:"villa",
        description:"By the beach",
        price:1230,
        location:"Ajmer",
        country:"India",

    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful");

});

app.get("/listings",async(req,res)=>{
    await Listing.find({})
    .then((res)=>{console.log(res);});
    res.send("listigs");
});

app.listen(port,()=>{
    console.log("app is listening on "+port);
});



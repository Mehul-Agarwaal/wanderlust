const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const path=require("path");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=>{console.log("database connected");})
.catch((err)=>{console.log(err);});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"68828604e9ee75d8c50d0962"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

//router
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

//connect to mongodb
main()
    .then((res) => { console.log("database connected"); })
    .catch((err) => { console.log(err); });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.send("Working");
});

//listing routes
app.use("/listings",listings);

//review routes
app.use("/listings/:id/reviews",reviews);


// app.get("/testListing", wrapAsync(async (req, res) => {
//     let sampleListing = new Listing({
//         title: "villa",
//         description: "By the beach",
//         price: 1230,
//         location: "Ajmer",
//         country: "India",

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful");

// }));


// This is your catch-all route for unhandled paths
// It MUST come after all your defined routes
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// This is your error-handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err; // Set default values for statusCode and message
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err})
});

app.listen(port, () => {
    console.log("app is listening on " + port);
});
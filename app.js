const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsyn.js");
const ExpressError = require("./utils/ExpressError.js");

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

app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "villa",
        description: "By the beach",
        price: 1230,
        location: "Ajmer",
        country: "India",

    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("Successful");

});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
});

app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs")
});

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
});

//create route
app.post("/listings",
    wrapAsync(async (req, res) => {

        const newListing = new Listing(req.body.listing);
        await newListing.save();
        console.log(newListing);
        res.redirect("/listings");

    }));

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
});

app.patch("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});

// This is your catch-all route for unhandled paths
// It MUST come after all your defined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// This is your error-handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err; // Set default values for statusCode and message
    res.status(statusCode).send(message);
});

app.listen(port, () => {
    console.log("app is listening on " + port);
});
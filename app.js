const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const dbUrl = process.env.ATLASDB_URL;


//router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const filterRouter = require("./routes/filter.js");

//connect to mongodb
main()
    .then((res) => { console.log("database connected"); })
    .catch((err) => { console.log(err); });

async function main() {
    await mongoose.connect(dbUrl)
}

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
 
//session
const sessionOptions = {
    secret: "secretSessionCode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};

// app.get("/", (req, res) => {
//     res.send("Working");
// });

//project phase2 partc
app.use(session(sessionOptions));
app.use(flash());

//phase2 partd
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email: "Fake@gmail.com",
//         username: "Delta-student",
//     });

//     let registeredUser = await User.register(fakeUser,"abcd");
//     res.send(registeredUser);
// });


//listing routes
app.use("/listings",listingRouter);

//review routes
app.use("/listings/:id/reviews",reviewRouter);

//filter routes
app.use("/filters",filterRouter);

//user Routes
app.use("/",userRouter);


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
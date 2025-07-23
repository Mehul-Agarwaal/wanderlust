const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {userSchema} = require("../schema.js")
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsyn.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


//signup get route
router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});
//signup post route
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        const{username, email, password }  = req.body;
        const newUser = new User({username,email});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");


        })
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    

}));

//login get route
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

//login post route
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),
    wrapAsync(async(req,res)=>{
        req.flash("success","LogIn Success!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
}));

//logout get route
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Loggeg out successfully");
        res.redirect("/listings");
    })
})

module.exports = router;
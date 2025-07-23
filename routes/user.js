const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../controllers/users.js");


router.route("/signup")
    //signup get route
    .get(userControllers.signUpRender)
    //signup post route
    .post(wrapAsync(userControllers.signUp));

    
router.route("/login")
    //login get route
    .get(userControllers.loginRender)
    //login post route
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}),wrapAsync(userControllers.login));

//logout get route
router.get("/logout",userControllers.logout);

module.exports = router;
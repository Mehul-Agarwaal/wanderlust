const User = require("../models/user");


module.exports.signUpRender = (req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
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
    

};

module.exports.loginRender = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
        req.flash("success","LogIn Success!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Loggeg out successfully");
        res.redirect("/listings");
    })
};
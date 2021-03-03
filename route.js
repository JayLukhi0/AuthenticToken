const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('./Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');

router.post("/register",async(req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashePswd = await bcrypt.hash(req.body.pswd,salt);
    const user = new User({
        username:req.body.uname,
        pswd : hashePswd
    });
    await user.save();
    res.send(user);
});

router.post("/login",async(req,res)=>{
    const user =await User.findOne({username:req.body.uname});
    if(!user){
        return res.send("User not exist");
    }
    else{
        const isValid = await bcrypt.compare(req.body.pswd,user.pswd);
        if (!isValid) {
            res.send("Password is not correct.......");
        } else {
            // res.send("Login Successfull....");
            const token =await jwt.sign({_id:user._id},"vision");
            res.header("auth-token",token);
            res.send(token);
        }
    }
});

//Public Route
router.get("/books",(req,res)=>{
    res.json({
        title : "C/C++",
        qty:52
    })
});

//Private Route
router.get("/bills",auth,(req,res)=>{
    res.json({
        title : "Java",
        qty:60
    })
});

module.exports = router;
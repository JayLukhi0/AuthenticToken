const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('./Model/user');
const Book = require('./Model/book');
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
    msg="";
    if(!user){
        return res.send("User not exist");
    }
    else{
        const isValid = await bcrypt.compare(req.body.pswd,user.pswd);
        if (!isValid) {
            msg="Password is not correct.......";
            res.send({msg});
        } else {
            // res.send("Login Successfull....");
            const token =await jwt.sign({_id:user._id},process.env.SECRET_KEY);
            res.send({token,msg});
            // res.header("auth-token",token);
        }
    }
});


// //Private Route
router.get("/posts",auth,(req,res)=>{
    res.json({
        title : "Java",
        qty:60
    })
});
router.get("/comments",(req,res)=>{
    res.json({
        title : "Java",
        qty:60
    })
});
router.get("/books",auth,async(req,res)=>{
    const books = await Book.find();
    res.send(books);
});

router.post("/books",async (req,res)=>{

    try {
        const book = new Book({
            name:req.body.name,
            qty:req.body.qty
            
        });
        await book.save();
        res.send(book);
        
    } catch (error) {
        res.status(404).send(error);
        
    }
});

router.patch("/books/:id",auth,async(req,res)=>{
    try {
        const book = await Book.findOne({_id:req.params.id});
        if(req.body.name){
            book.name = req.body.name;
        }
        await book.save();
        res.send(book);
    } catch (error) {
        
    }
});


router.get("/user/:id",async(req,res)=>{
    const user = await User.findOne({_id:req.params.id});
    res.send(user);
});

module.exports = router;
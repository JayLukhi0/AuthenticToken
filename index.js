const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./route') ;

mongoose.connect("mongodb://localhost:27017/emp",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app = express();
        app.use(bodyparser.urlencoded({extended:true}));
        app.use(express.json());
        app.use('/api',route);
        
        app.listen(3000, ()=>{
            console.log("<-------Server Started-------->")
        });
    }
);

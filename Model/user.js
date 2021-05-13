const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"User already exists"]
    },
    pswd:String
});

module.exports = mongoose.model("User",userSchema);
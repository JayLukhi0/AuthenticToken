const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:String,
    pswd:String
});

module.exports = mongoose.model("User",userSchema);
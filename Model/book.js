const mongoose = require('mongoose');

const bookschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        unique:[true,"Book already exists"]
    },
    qty:{
        type:Number,
        min:1,
        required:true
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("book",bookschema);
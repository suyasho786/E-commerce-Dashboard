const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String

});
module.exports = mongoose.model("Products" , productSchema);// collection ka naam and userschema (parameters)
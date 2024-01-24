const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/config');
const User = require('./db/users');
const Product = require('./db/Product');
const app = express();
app.use(cors());
app.use(express.json());
app.post('/register' ,async (req, resp)=>{
    // resp.send('register is working ');
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    // resp.send("hello i am here");

})
app.post('/login' ,async (req, resp)=>{
    // resp.send('register is working ');
    if(req.body.password && req.body.email){
        console.log(req.body);
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }else{
            resp.send({result:"result:No user found"});
        }
    }else{
        resp.send({result:"Fill The Details Properly"});
    }
})
app.post('/add' ,async (req, resp)=>{
    // resp.send('register is working ');
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})
app.listen(5000);
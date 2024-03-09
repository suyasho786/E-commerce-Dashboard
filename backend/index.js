const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db/config');
const { ObjectId } = require('mongodb');
const User = require('./db/users');
const Product = require('./db/Product');
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm-key';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.post('/register', async (req, resp) => {
    // resp.send('register is working ');
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        Jwt.sign({ result }, jwtKey, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                resp.send({ result: "Something got fucked up" });
            }
            resp.send({ result, auth: token });
        });
    }
    
    // resp.send("hello i am here");

})
app.post('/login', async (req, resp) => {
    // resp.send('register is working ');
    if (req.body.password && req.body.email) {
        console.log(req.body);
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something got fucked up" });
                }
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: "result:No user found" });
        }
    } else {
        resp.send({ result: "Fill The Details Properly" });
    }
})
app.post('/add',verifyToken, async (req, resp) => {
    // resp.send('register is working ');
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})
app.get('/products',verifyToken, async (req, resp) => {
    let product = await Product.find();
    if (product.length > 0) {
        resp.send(product);
    } else {
        resp.send("no data");
    }

});
app.delete('/product/:id', verifyToken,async (req, resp) => {
    // console.log('api called');

    let result = await Product.deleteOne({ _id: req.params.id });

    resp.send(result);

})
app.put('/update/:id', verifyToken,async (req, res) => {
    try {
        let { id } = req.params;


        const objectId = new ObjectId(id);
        const updatedProduct = await Product.findByIdAndUpdate(objectId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.log("error hitted");
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    // const { id } = req.params;
    // console.log('Product ID:', id);

})
app.get('/search/:key', verifyToken,async (req, res) => {


    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    res.send(result);
});

function verifyToken (req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).send({ result: "Token not found" });
    } else {
        // Assuming the token is in the format "Bearer <actual_token>"
        token = token.split(' ')[1];
        console.log(token);

        // const secretKey = jwtKey; // Replace with your actual secret key
        Jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                res.status(401).send({result : "please provide valid token"})
            }

            // The token is valid, and you can access the decoded information (e.g., user ID)
            // req.userId = decoded.userId; // Adjust this based on the token content

            next(); // Move to the next middleware or route handler
        });
    }
}

app.listen(PORT);
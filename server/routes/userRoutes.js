const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (request, response) => {
    try{
        const userExists = await User.findOne({ email: request.body.email });

        if(userExists){
            response.status(403).send({
                success: false,
                message: "User already exists"
            });
            return;
        }

        // Hash the pass word before storing in db
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashedPassword;
        
        const newUser = new User(request.body);
        await newUser.save();

        response.status(200).send({
            success: true,
            message: "Registration Successful, Please login!"
        });
    }catch(err){
        console.log(err);
        response.status(500).send({
            success: false,
            message: "Something went wrong. Please try again in sometime."

        });
    };
});

router.post('/login', async(request, response) => {
    try{
        const user = await User.findOne({email : request.body.email});
        console.log(user);
        if(!user){
            response.status(401).send({
                success : false,
                message: "Invalid User",
            });
            return;
        }

        const validPassword = await bcrypt.compare(request.body.password, user.password);
        
        if(!validPassword){
            response.status(401).send({
                success:false,
                message:"Invalid Credentials",
            });
            return;
        }

        const token = jwt.sign({userId: user._id}, "ScalerBMS", {
            expiresIn:"1d",
        })

        response.status(200).send({
            success:true,
            message:"User Logged In!",
            token:token
        });
    }catch(err){
        console.log(err);
        response.status(500).send({
            success:false,
            message:"Something went wrong. Plase try again in sometime."
        });
    }
});

module.exports = router;
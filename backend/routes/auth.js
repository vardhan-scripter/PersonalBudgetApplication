const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/config");
const passport = require("passport");

//@type  POST
//@route  /register
//@desc  User Registration
//@access PUBLIC

router.post('/register',(req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res
                .status(400)
                .json({
                    success: false,
                    message: "email is already exists"
                })
            }else{
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                })
                //Encrypt password using bcrypt
                bcrypt.genSalt(10,(err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    success: true,
                                    message: "User created successfully"
                                })
                            })
                            .catch(err => {
                                res.json({success: false, Errormessage: "Internal server error"})
                            })
                    })
                })
            }
        })
        .catch(err => {
            res.json({success: false, message: "Internal server error"})
        })
});

//@type  POST
//@route  /login
//@desc  User Login
//@access PUBLIC

router.post('/login',(req,res) => {
    const email = req.body.email;
    const password= req.body.password;
    User.findOne({email: email})
        .then(user => {
            if(!user){
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: "credentials mismatch"
                    })
            }
            bcrypt
                .compare(password,user.password)
                .then(isUser => {
                    if(isUser){
                        const payload = {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                        }
                        jsonwt.sign(
                            payload,
                            key.secret,
                            {expiresIn: 15000},
                            (err,token) => {
                                res.json({
                                    success: true,
                                    message: "You login successfully",
                                    token: "Bearer " + token
                                });
                            })
                    }else{
                        return res
                            .status(404)
                            .json({
                                success: false,
                                message: "credentials mismatch"
                            })
                    }
                })
                .catch(err => {
                    res.json({success: false, message: "Internal server error"})
                })
        })
        .catch(err => {
            res.json({success: false, message: "Internal server error"})
        })
});

//@type  GET
//@route  /getUserDetails
//@desc  User Details
//@access PUBLIC

router.get('/getUserDetails',passport.authenticate("jwt", {session: false}),(req,res) => {
    res.json(req.user);
});

module.exports = router;
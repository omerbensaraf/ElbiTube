const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');
const checkAuth = require('../middleware/check-auth');

function isEmailValid(email) {
    const emailRegx =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegx.test(email);
}

function isPasswordValid(password) {
    /*const passwordRegx =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegx.test(password);*/
    return (password.length >= 6  && password.length <= 16);
}

router.post('/signin', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(users => {
        if(users.length < 1) {            
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: users[0].email,
                    userId: users[0]._id
                }, config.secretKey, {});
                const farFuture = new Date(new Date().getTime() + (1000*60*60*24*365*10));
                res.cookie('token', token, { httpOnly: true, expires: farFuture });                
                return res.status(200).json({
                    message: 'Authentication succesed',
                    email: users[0].email
                });
            }
            return res.status(401).json({
                message: 'Authentication failed'
            });
        })
    })
    .catch(err => {
        console.log('User signin failed: ', err);
        return res.status(500).json({
            error: err
        });
    });
});

router.post('/signup', (req, res, next) => {
    const email = req.body.email;
    const plainPass = req.body.password;

    if (!isEmailValid(email)) {
        return res.status(500).json({
            message: 'Please sign up with a valid Elbit mail'
        });

    } else if (!isPasswordValid(plainPass)) {
        return res.status(500).json({
            message: 'Password length should be 6-16 characters'
        });
    } else {
        // Email and password valid. continue with user creation
        User.find({email: email})
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email already exists'
                });
            } else {
                bcrypt.hash(plainPass, 10, (err, hash) =>{
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: email,
                            password: hash
                        });
                        user
                        .save()
                        .then((result)=> {
                            const token = jwt.sign({
                                email,
                                userId: result.id
                            }, config.secretKey, {});
                            const farFuture = new Date(new Date().getTime() + (1000*60*60*24*365*10));
                            res.cookie('token', token, { httpOnly: true, expires: farFuture });            
                            res.status(201).json({
                                message: 'User created',
                                email
                            });
                        })
                        .catch((err)=>{
                            console.log('User creation failed: ', err);
                            return res.status(500).json({
                                error: err
                            });
                        })
                    }
                });
            }
        });
    }
});


router.get('/getAllUsers', checkAuth, (req, res, next) => {
    // only admin can access this rest
    User.find({})
    .exec()
    .then((users) => {        
        return res.status(200).json(users);
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
});

router.get('/logout', (req, res, next) => {
    // remove the cookie
    res.clearCookie('token');
    return res.status(200).json({
        message: 'logged out successfuly'
    });
});

module.exports = router;
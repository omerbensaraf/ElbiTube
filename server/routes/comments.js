const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

router.get('/getAllComments', (req, res) =>{
    mongoose.model('Comment').find(function (err,comments) {
        res.send(comments);
    })
});

router.post('/postComment', (req, res, next) => {
    Comment.create(req.body.comment).then((result)=> {          
        res.status(201).json({
            message: 'Comment Added'
        });
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

router.get('/getAllRootComments', (req, res) =>{
    console.log(req.query.videoId);
    let rootComments = {
        parent : null,
        videoId : req.query.videoId
    }
    mongoose.model('Comment').find(rootComments, function (err,comments) {
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
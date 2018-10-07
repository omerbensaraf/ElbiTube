const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

router.get('/getAllComments', (req, res) =>{
    mongoose.model('Comment').find(function (err,comments) {
        res.send(comments);
    })
});

module.exports = router;
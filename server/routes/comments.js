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


router.get('/getReplies', (req, res) =>{
    console.log(req.query.commentId);
    let replies = {
        parent : req.query.commentId
    }
    mongoose.model('Comment').find(replies, function (err,comments) {
        res.send(comments);
    })
});


router.post('/postComment', (req, res, next) => {
    console.log("ppppppppppppppp");
    Comment.create(req.body.comment).then((result)=> {
        console.log("ppppppppppppppp"); 
        updateParentsCounter(req.body.comment.parent);
        res.status(201).json({
            message: 'Comment Added'
        });
    });
});


function updateParentsCounter(parent){
    console.log(parent);
    let currParent = parent;
    while(parent !== null){
        let query = { _id : parent };
        let options = { new: true }; 
        mongoose.model('Video').findOneAndUpdate(query, {$inc: {counter: 1}} ,options,
            function(err, doc) {
            if (err)
                return res.status(500).json(err);
            else {
                currParent = doc.parent;
                console.log(currParent);
            }
        })
    }
}

module.exports = router;
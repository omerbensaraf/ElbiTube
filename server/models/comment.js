var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var commentSchema = new Schema({
  parent : {type: Schema.Types.ObjectId, ref: 'Comment', required: false},
  videoId: {type: Schema.Types.ObjectId, ref: 'Video', required: true},
  user :  String,
  time : Number,
  content : String,
  likeUsers : [String],
  disLikeUsers : [String]
});

// Create a model to compile the schema
var Comment = mongoose.model('Comment', commentSchema);

// Make this available to our users in our Node applications
module.exports = Comment;

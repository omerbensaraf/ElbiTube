var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var videoSchema = new Schema({
    title: String,
    src: String,
    imageSrc: String,
    type: String,
    likeUsers : [String],
    disLikeUsers : [String],
    views: Number,
    uploadedBy: String,
    category: String
});

// Create a model to compile the schema
var Video = mongoose.model('Video', videoSchema);

// Make this available to our users in our Node applications
module.exports = Video;

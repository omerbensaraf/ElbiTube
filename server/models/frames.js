var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var frameSchema = new Schema({
    title: String,
    src: String,
    created_at: Date,
    updated_at: Date
});

// Create a model to compile the schema
var Frame = mongoose.model('Frame', frameSchema);

// Make this available to our users in our Node applications
module.exports = Frame;
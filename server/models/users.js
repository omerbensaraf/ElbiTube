var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

// Create a model to compile the schema
var User = mongoose.model('User', userSchema);

// Make this available to our users in our Node applications
module.exports = User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, dropDups: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: { type: String, required: true }
});

// Create a model to compile the schema
var User = mongoose.model('User', userSchema);

// Make this available to our users in our Node applications
module.exports = User;
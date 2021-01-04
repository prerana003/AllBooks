const mongoose = require ('mongoose');

const loginschema = new mongoose.Schema({
    name : String,
    emailID : String,
    password : String,
    DOB: Date,
    gender: String
});

module.exports = mongoose.model('login',loginschema,'RegisteredUsers');
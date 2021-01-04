const mongoose = require ('mongoose');

const loginschema = new mongoose.Schema({
    name : String,
    emailID : String,
    password : String,
    dob: Date,
    //gender: String
});

module.exports = mongoose.model('login',loginschema,'RegisteredUsers');
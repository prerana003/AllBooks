const mongoose = require ('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const loginschema = new mongoose.Schema({
    name : String,
    emailID : String,
    password : String,
    dob: Date,
    //gender: String
	cart: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book'
		}
	],
	cartTotal: { type: Number, default: 0.0 }
});

loginschema.plugin(passportLocalMongoose, { usernameField: 'name', passwordField: 'password' });

module.exports = mongoose.model('login',loginschema,'RegisteredUsers');
const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const passport = require('passport');

const loginModel = require('../models/loginSchema');

//connecting to database
const db = "mongodb+srv://preranahazra98:P1998@cluster0.fhhyl.mongodb.net/OnlineBookstore?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(db, {
	useNewUrlParser : true, 
	useUnifiedTopology: true,
	useCreateIndex: true}, function(error){
    if (error)
        console.log("Error!" + error);
	else
		console.log('Connected to DB');
});

//signup api
router.post('/signup', (req, res) => {
	// console.log('New signup process', req.body);
	
    var newSignup = new loginModel({
		name: req.body.username,
		emailID: req.body.email,
		dob: req.body.dob
	});
	
	loginModel.register(newSignup, req.body.password, (err, user) => {
		if(err){
			// console.log("Error", err.message);
			res.redirect('/signup');
		}
		passport.authenticate('local')(req, res, () => {
			res.redirect('/user');
		})
	});
});

router.post('/login', passport.authenticate('local' , {
	successRedirect: '/user',
	failureRedirect: '/login'
}), (req, res) => {});

module.exports=router;

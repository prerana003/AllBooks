const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');

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
		name: req.body.uname,
		emailID: req.body.email,
		// password: req.body.psw,
		dob: req.body.dob
	});
	
	loginModel.register(newSignup, req.body.psw, (err, user) => {
		if(err){
			// console.log("Error", err.message);
			res.redirect('/signup');
		}
		loginModel.authenticate()(newSignup.name, req.body.psw, (err, result) => {
			if(err){
				// console.log("Auth error", err);
				res.redirect('/');
			}
			// console.log('SignUp successful', user);
			res.render('user', { username: user.name });
		});
	});
});

router.post('/login', (req, res) => {
	// console.log('In login POST', req.body);
	
	loginModel.authenticate()(req.body.uname, req.body.psw, (err, result) => {
		if(err){
			// console.log("Error", err);
			res.redirect('/');
		}
		// console.log("Logged In!", result);
		res.render('user', { username: result.name });
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

module.exports=router;

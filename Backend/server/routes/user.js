const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../../middleware');

const loginUser = require('../models/loginSchema');
const books = require('../models/bookSchema');

router.get('/', isLoggedIn, async (req, res) => {
	try {
		let user = await loginUser.findById(req.user._id).populate('cart');
		res.render('user', { cart : user.cart });
		
	} catch (err) {
		console.log(err);
	}
});

router.post('/add/:id', isLoggedIn, async (req, res) => {
	try{
		let user = await loginUser.findById(req.user._id);
		let boi = await books.findById(req.params.id);
		user.cart.push(boi);
		user.save();
		res.redirect('/user');
		// console.log(user);
	}
	catch (err) {
		console.log(err);
	}
});

router.delete('/:id', isLoggedIn, async (req, res) => {
	try {
		let user = await loginUser.findById(req.user._id);
		user.cart.splice(user.cart.indexOf(req.params.id), 1);
		user.save();
		res.redirect('/user');
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
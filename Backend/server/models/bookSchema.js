const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	image: String,
	price: String,
	gist: String
});

module.exports = mongoose.model('Book', bookSchema);
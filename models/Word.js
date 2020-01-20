// For non lexical words
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WordSchema = new Schema({
	name: {
		type: String,
	}
});

module.exports = Word = mongoose.model('word', WordSchema);
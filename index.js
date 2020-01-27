const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const words = require('./routes/api/words');
const app = express()

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(()	=>	{})
	.catch(err	=>	console.log(err))

// Use Routes
app.use('/complexity', words);

module.exports = app
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const words = require('./routes/api/words');
const pw = require('./util/populateWords');
const app = express()

// BodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(()	=>	console.log('MongoDB connected...'))
	.catch(err	=>	console.log(err))

// Use Routes
app.use('/api/words', words);

const port = process.env.PORT || 5001;

app.listen(port, ()	=>	{
    console.log(`Server started on port ${port}`)
    pw.populateWords();
});
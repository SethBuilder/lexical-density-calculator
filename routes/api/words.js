const express = require('express');
const router = express.Router();

// Word Model
const NonLexWord = require('../../models/Word');

// @route	GET api/words
// @desc	Get Lexical Density of a sentence
// @access	Public
router.get('/', async (req, res)	=>	{

	const sentenceWithPunctuations = req.body.sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	const sentence = sentenceWithPunctuations.replace(/\s{2,}/g," ").toLowerCase();
	const words = sentence.split(" ");

	const totalNumberOfWords = words.length;
	let totalNumberOfLexicalWords = 0;
	let nonLexicalWords = [];

	nonLexicalWords = await NonLexWord.find({});

	words.forEach(word => {
		const found = nonLexicalWords.find(element => element.name === word);
		if(!found) {
			totalNumberOfLexicalWords++;
		}
	});
	const ld = (totalNumberOfLexicalWords / totalNumberOfWords * 100).toFixed(2);
	res.json(
		{
			data: {
				overall_ld: ld
			}
		}
	);
});

module.exports = router;
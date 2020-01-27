const express = require('express');
const router = express.Router();
const { getLD, wordCounter, sentencesWithoutPunctuations } = require('../../util');
const NonLexWord = require('../../models/Word');
const { check, validationResult } = require('express-validator');

// @route	GET api/words
// @desc	Get Lexical Density of text
// @access	Public
router.get('/', [
	check('text')
		.exists()
		.isLength({ max: 1000 })
		.withMessage('Text is too long; must be less than 1000 characters')
		.custom(text => {
			if (wordCounter(text) > 100) {
				return Promise.reject('Text is too long; must be less than 100 words')
			}
			return true;
		})
		.withMessage('Text is too long; must be less than 100 words')
], async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	let sentences = sentencesWithoutPunctuations(req.body.text)
	sentences = sentences.replace(/\s{2,}/g, " ").toLowerCase().split(".");
	let nonLexicalWords = await NonLexWord.find({});
	var lexicalDensities = [];

	for await (sentence of sentences) {
		const ld = getLD(sentence, nonLexicalWords);
		lexicalDensities.push(ld);
	}
	// console.log(lexicalDensities);

	// Calculate overall LD
	const numberOfSentences = sentences.length;
	let sumOfLDs = 0;

	lexicalDensities.forEach(ld => {
		sumOfLDs += ld;
	});

	const overallLD = parseFloat((sumOfLDs / numberOfSentences).toFixed(2));
	const verbose = req.query.mode === "verbose";

	if (verbose) {
		res.json({
			data: {
				sentence_ld: lexicalDensities,
				overall_ld: overallLD
			}
		})
	} else {
		res.json(
			{
				data: {
					overall_ld: overallLD
				}
			}
		);
	}

});

module.exports = router;
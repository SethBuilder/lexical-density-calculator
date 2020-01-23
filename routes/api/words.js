const express = require('express');
const router = express.Router();
const {getLD} = require('../../util/getLD');
const NonLexWord = require('../../models/Word');

// @route	GET api/words
// @desc	Get Lexical Density of text
// @access	Public
router.get('/', async (req, res)	=>	{

	const sentenceWithPunctuations = req.body.sentence.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	const sentences = sentenceWithPunctuations.replace(/\s{2,}/g," ").toLowerCase().split(".");
	let nonLexicalWords = await NonLexWord.find({});
	var lexicalDensities = [];

	// sentences.forEach(sentence => getLD(sentence, (ld) => lexicalDensities.push(ld)));
	for await (sentence of sentences) {
		 const ld = getLD(sentence,nonLexicalWords);
		 lexicalDensities.push(ld);
	}
	console.log(lexicalDensities);
	// Calculate overall LD
	const numberOfSentences = sentences.length;
	let sumOfLDs = 0;
	
	lexicalDensities.forEach(ld => {
		sumOfLDs += ld;
	});

	const overallLD = parseFloat((sumOfLDs / numberOfSentences).toFixed(2));
	const verbose = req.query.mode === "verbose";

	if(verbose) {
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
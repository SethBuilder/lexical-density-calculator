const fs = require('fs');
const readline = require('readline');
exports.getLD = (sentence, nonLexicalWords) => {
    try {
        const words = sentence.split(" ");
        const totalNumberOfWords = words.length;
        let totalNumberOfLexicalWords = 0;
        words.forEach(word => {
            const found = nonLexicalWords.find(element => element.name === word);
            if (!found) {
                totalNumberOfLexicalWords++;
            }
        })
        return parseFloat((totalNumberOfLexicalWords / totalNumberOfWords).toFixed(2));
    } catch (error) {
        console.log(error);
    }

}

exports.populateWords = async () => {
    Word.collection.drop()
        .then(res => console.log('Dropped non-lex words collection'))
        .catch(err => console.log(`This error occured while dropping non-lex words collection: ${err}`));

    const fileStream = fs.createReadStream('non-lex-words.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // Read non lex words from txt file line by line.
    for await (const line of rl) {

        // Save words in MongoDB
        const newWord = new Word({
            name: line.trim()
        });

        await newWord.save().then(word => console.log(`added word ${word}`));
    }
}


exports.sentencesWithoutPunctuations = function(sentences) {
	return sentences.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

exports.wordCounter = function(sentences) {
	return sentences.split(' ').length;
}


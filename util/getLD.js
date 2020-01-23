
exports.getLD = (sentence, nonLexicalWords) => {
    try {
        const words = sentence.split(" ");
        const totalNumberOfWords = words.length;
        let totalNumberOfLexicalWords = 0;
        words.forEach(word => {
            const found = nonLexicalWords.find(element => element.name === word);
            if(!found) {
                totalNumberOfLexicalWords++;
            }
        })
        return parseFloat((totalNumberOfLexicalWords / totalNumberOfWords).toFixed(2));
    } catch (error) {
        console.log(error);
    }

}
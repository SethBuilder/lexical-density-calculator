# Introduction
This is a node.js api that calculates the lexical density of pieces of text provided it the request body to the API.

# Usage
1. Download repo.
2. create a .env file and add: `mongoURI=<URI to a MongoDB database>`.
3. Run `npm start`

# Assumptions
This program removes all punctuations from the provided text, then it splits to sentences based on full stops, 
calculates the lexical densities of each sentences (to be provided in verbose mode) and finally calculates the average from all sentences.

# Shortcoming
If the provided text ends with a full stop, it's considered an extra sentence with a lexical density of 1.

# Tests
`npm run test`

# Contact
Forward your questions to: seif@seif.rocks.

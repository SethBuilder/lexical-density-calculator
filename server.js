const server = require("./index");
const {populateWords} = require('./util');
const port = process.env.PORT || 5001;

server.listen(port, ()	=>	{
    console.log(`Server started on port ${port}`)
    // populateWords();
});

module.exports = server;
const jokes = require('give-me-a-joke');  // cretae a variable called jokes and require the give-me-a-joke module
const colors = require('colors');
// console.log(jokes);

jokes.getRandomDadJoke(function(joke) { 
    console.log(joke.rainbow);
    })


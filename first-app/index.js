const express = require('express');
const app = express();

// create a GET route 
// app.use((req, res) => {      
//     // console.log('We got a new request!');
//     // console.log(req);
//     // res.send('Hello, we got your request! This is a response.'); // send back a response
//     // res.send({color: 'red', gg: 'gg'}); // send json object
//     // res.send('<h1>This is my webpage</h1>'); // send html

// })


// '/' => welcome to our home page
app.get('/', (req, res) => {
    res.send("Welcome to the homepage!");
})

// '/r/:subreddit' => subreddit //path with patern
app.get('/r/:subreddit', (req, res) => {
    // console.log(req.params);
    // res.send("Welcome to a subreddit!");  // send back a response
    const { subreddit } = req.params;   
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

// '/r/:subreddit/:postId' => subreddit post id
app.get('/r/:subreddit/:posId', (req, res) => {
    const { subreddit, posId } = req.params;    // get params from url // params is an object use destructuring as well as object shorthand for key and value
    res.send(`<h1>Viewing post id ${posId} on ${subreddit} subreddit</h1>`);
})

// /cats => 'meow'

app.get('/cats', (req, res) => {
    // console.log('CAT REQUEST');
    res.send("meow");
})
// /dogs => 'arf'

app.get('/dogs', (req, res) => {
    res.send("arf");
})


app.get('/search/', (req, res) => {
    // console.log(req.query);
    // res.send("search");

    const {q} = req.query; // get query from url
    if(!q) { // if q is not exist
        res.send("<h1>Nothing found if nothing search</h1>"); // if no query
    }
    res.send(`<h1>Search results for: ${q}</h1>`); // if query found then send back a response with query value     
    
})

//post request
app.post('/dogs', (req, res) => {
    res.send("post request");
})

app.get('*', (req, res) =>{
    res.send("I don't know that path!");
})

// console.dir(app);
app.listen(3000, () => {
    console.log('Listening on port 3000')
})
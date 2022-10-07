const express = require('express')
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override') // npm install method-override used to override the method of a form to use PUT and DELETE and PATCH

app.use(express.urlencoded({ extended: true  })) // for parsing application/x-www-form-urlencoded and application/json to req.body object // extended: true is for nested objects in request body (e.g. { user: { name: 'John' } })
app.use(express.json()) // for parsing application/json
app.use(methodOverride('_method')) // for overriding the method of a form to use PUT and DELETE and PATCH
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const tweets = [
    {
        id: uuidv4(),
        username: 'User01',
        tweet: 'How is the weekend'
    },
    {
        id: uuidv4(),
        username: 'User02',
        tweet: 'Everything looks good!'
    },
    {
        id: uuidv4(),
        username: 'User03',
        tweet: 'Kinda hot in here!!'
    },
    {
        id: uuidv4(),
        username: 'User04',
        tweet: 'Feeling bored'
    }
]

 // form to create new tweet
 app.get('/tweets/new', (req,res) =>{
    res.render('tweets/new')

 })

 // create new tweet
 app.post('/tweets', (req,res) =>{
    // console.log(req.body);
    const {username, tweet} = req.body;
    // tweets.push({username , tweet});
    tweets.push({username , tweet, id: uuidv4()});
    res.redirect('/tweets');
 })



// show route = view detail of specific tweet
app.get('/tweets/:id', (req,res) =>{
    const {id} = req.params;
    // const tweet = tweets.find(t => t.id === parseInt(id)); // find tweet with id = id in url params 
    const tweet = tweets.find(t => t.id === id); // find tweet with id = id in url params 
    res.render('tweets/show', {tweet});
})

// update spedific tweet
app.patch('/tweets/:id', (req, res) =>{
    const {id} = req.params;
    const newTweetText = req.body.tweet;
    let foundTweet = tweets.find(t => t.id === id);
    foundTweet.tweet = newTweetText;
    res.redirect('/tweets');
})

//form edit exitsing tweet
app.get('/tweets/:id/edit', (req,res) =>{
    const {id} = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/edit', {tweet});
})

//reading all tweets
app.get('/tweets', (req, res) => {
    res.render('tweets/index', {tweets});
 })




// app.get('fruit', (req,res) =>{
//     res.send("Get /fruit response")
// })

// app.post('/fruit', (req, res) =>{
//     // console.log(req.body)
//     //destructuring
//     const {nameOfFruit, qty} = req.body
//     if (qty > 1){
//         res.send(`Here are your ${qty} ${nameOfFruit}s Enjoy!`) 
//     }else{
//         res.send(`Here is your ${qty} ${nameOfFruit}. Enjoy!`)
//     }

//     // res.send("Post /fruit response")
// })

app.listen(3000, () => {
    console.log('Server started on port 3000');
})
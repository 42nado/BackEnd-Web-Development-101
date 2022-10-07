// import express
const { render } = require("ejs");;
const express = require("express");
const path = require("path");
const redditData =require("./data.json");
// console.log(redditData);


//execute express
const app = express();

app.use(express.static(path.join(__dirname, '/public'))); // to use static files like css, js, images, etc in public folder from views folder

// app.use(express.static(path.joins(__dirname), '/public'))

app.set('view engine', 'ejs');  // set the view engine to ejs to render ejs files
app.set('views', path.join(__dirname, 'views')); // set the views directory to the views folder

//home page route
app.get('/', (req, res) => {
    res.render('home'); // render the home.ejs file in the views folder
})

app.get('/cats', (req,res) =>{
    //pretend array come from database
    const cats = [
        'Muning', 'Chi-chi', 'Garfield', 'Ming-ming'
    ];
    res.render('cats',{cats}); // render the cats.ejs file in the views folder and pass the cats array to it
})

// app.get('/r/:subreddit', (req,res) =>{
//     const{subreddit} = req.params;
//     const data =  redditData[subreddit];
//     // console.log(data);
//     res.render('subreddit', {subreddit});
// })

app.get('/r/:subreddit', (req,res) =>{
    const{subreddit} = req.params;
    const data =  redditData[subreddit];
    if(data){
        res.render('subreddit', {...data});
    }
    else{
        res.render('notfound');
    }

    // if (subreddit in redditData){
    //     const data =  redditData[subreddit];
    // // console.log(data);
    // res.render('subreddit', {...data}); // ...data is the same as data:data spread operator
    // return
    // }
    // res.render("notfound",{subreddit})
    

})

app.get('/rand', (req, res) => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    res.render('random', {randomNum}); //res.render('random', {rand: randomNum}); // // render the random.ejs file in the views folder and pass the random number to it using key template variable rand
})

app.listen(3000, () => {  //listen to port 3000 for incoming requests to the server
    console.log("Listening on port 3000");

})
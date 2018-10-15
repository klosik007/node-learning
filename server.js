const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; 
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if (err){
            console.log('Unable to connect to the server!');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     // next();
// });



hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

app.get('/', (req, res) =>{
    res.render('index.hbs',{
        pageTitle: 'Hello headbars!',
        welcomeMessage: 'Hi! Nice to meet you!',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About',
        footer: 'footer'
    });
});

app.get('/heroku', (req, res) =>{
    res.render('heroku.hbs',{
        pageTitle: 'Heroku',
        welcomeMessage: `Heroku is a latest deployment service I've already discovered`
    });
})

app.get('/bad', (req, res) =>{
    res.send({
        status: 400,
        symptom: 'Failed to load a page!'
    });
});

app.listen(port, () =>{
    console.log(`Server is up to port ${port}`);
});
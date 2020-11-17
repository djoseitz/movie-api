const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
    {
      title: 'Raiders of the Lost Ark',
      director: 'Steven Spielberg'
    },
    {
      title: 'Dark City',
      director: 'Alex Proyas'
    },
    {
      title: 'Coraline',
      director: 'Henry Selick'
    },
    {
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner'
    },
    {
        title: 'Alien',
        director: 'Ridley Scott'
    },
    {
        title: 'The Hunt for Red October',
        director: 'John McTiernan'
    },
    {
        title: 'Baby Driver',
        director: 'Edgar Wright'
    },
    {
        title: 'Hot Fuzz',
        director: 'Edgar Wright'
    },
    {
        title: 'Akira',
        director: 'Katsuhiro Otomo'
    },
    {
        title: 'The Lord of the Rings (trilogy)',
        director: 'Peter Jackson'
    },
];

app.use(morgan('common'));
  
// GET requests & app.use
app.get('/', (req, res) => {
res.send('Welcome to my movie hub, I hope you enjoy it!');
});

app.get('/movies', (req, res) => {
res.json(topMovies);
});

app.use(express.static('public'));

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR! Does not compute!');
  });

// listen for requests
app.listen(8080, () =>
console.log('Your app is listening on port 8080.');
);
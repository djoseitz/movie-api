const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
    {
      title: 'Raiders of the Lost Ark',
      director: 'Steven Spielberg'
      genre: 'Adventure'
    },
    {
      title: 'Dark City',
      director: 'Alex Proyas'
      genre: 'Horror'
    },
    {
      title: 'Coraline',
      director: 'Henry Selick'
      genre: 'Adventure'
    },
    {
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner'
        genre: 'Sci-Fi'
    },
    {
        title: 'Alien',
        director: 'Ridley Scott'
        genre: 'Horror'
    },
    {
        title: 'The Hunt for Red October',
        director: 'John McTiernan'
        genre: 'Thriller'
    },
    {
        title: 'Baby Driver',
        director: 'Edgar Wright'
        genre: 'Thriller'
    },
    {
        title: 'Hot Fuzz',
        director: 'Edgar Wright'
        genre: 'Action'
    },
    {
        title: 'Akira',
        director: 'Katsuhiro Otomo'
        genre: 'Sci-Fi'
    },
    {
        title: 'The Lord of the Rings',
        director: 'Peter Jackson'
        genre: 'Adventure'
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

app.get('/movies/[TITLE]', (req, res) => {
    res.send('Successful GET request returning data on a specific movie by name');
});

app.get('/movies/genre/[NAME]', (req, res) => {
    res.send('Successful GET request returning data about a genre of movies');
});

app.get('/movies/directors/[NAME]', (req, res) => {
    res.send('Successful GET request returning data about a director');
});

app.post('/users', (req, res) => {
    res.send('Successful POST request returning a text message indicating whether the user was successfully added');
});

app.put('/users/[NAME]/info/[USERNAME]', (req, res) => {
    res.send('Successful PUT request returning a text message indicating the user and the updated username');
});

app.post('/users/[NAME]/favorites/[TITLE]', (req, res) => {
    res.send('Successful POST request returning a text message indicating whether the movie was successfully added');
});

app.delete('/users/[NAME]/favorites/[TITLE]', (req, res) => {
    res.send('Successful DELETE request returning a text message indicating whether the movie was successfully removed');
});

app.delete('/users', (req, res) => {
    res.send('Successful DELETE request returning a text message indicating whether the user was successfully removed');
});

app.use(express.static('public'));

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR! Does not compute!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
  });
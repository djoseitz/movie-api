const express = require('express');
morgan = require('morgan');

const app = express();

let topMovies = [
    {
      title: 'Raiders of the Lost Ark',
      director: 'Steven Spielberg',
      description: 'Adventure'
    },
    {
      title: 'Dark City',
      director: 'Alex Proyas',
      description: 'Horror'
    },
    {
      title: 'Coraline',
      director: 'Henry Selick',
      description: 'Adventure'
    },
    {
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        description: 'Sci-Fi'
    },
    {
        title: 'Alien',
        director: 'Ridley Scott',
        description: 'Horror'
    },
    {
        title: 'The Hunt for Red October',
        director: 'John McTiernan',
        description: 'Thriller'
    },
    {
        title: 'Baby Driver',
        director: 'Edgar Wright',
        desrcription: 'Thriller'
    },
    {
        title: 'Hot Fuzz',
        director: 'Edgar Wright',
        description: 'Action'
    },
    {
        title: 'Akira',
        director: 'Katsuhiro Otomo',
        description: 'Sci-Fi'
    },
    {
        title: 'The Lord of the Rings',
        director: 'Peter Jackson',
        description: 'Adventure'
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

app.get('/movies/:title', (req, res) => {
    res.send('Successful GET request returning data on a specific movie by name');
});

app.get('/movies/genre/:name', (req, res) => {
    res.send('Successful GET request returning data about a genre of movies');
});

app.get('/movies/directors/:name', (req, res) => {
    res.send('Successful GET request returning data about a director');
});

app.post('/users', (req, res) => {
    res.send('Successful POST request returning a text message indicating whether the user was successfully added');
});

app.put('/users/:name/info/:username', (req, res) => {
    res.send('Successful PUT request returning a text message indicating the user and the updated username');
});

app.post('/users/:name/favorites/:title', (req, res) => {
    res.send('Successful POST request returning a text message indicating whether the movie was successfully added');
});

app.delete('/users/:name/favorites/:title', (req, res) => {
    res.send('Successful DELETE request returning a text message indicating whether the movie was successfully removed');
});

app.delete('/users/:name', (req, res) => {
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
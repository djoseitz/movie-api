const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/CineFanDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
morgan = require('morgan');

const app = express();

let movies = [
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

// Get all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + error);
        });
})

// Get a movie by title
app.get('/movies/title', (req, res) => {
    Movies.findOne({ Title: req.params.Titles })
        .then((movies) => {
            res.json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

// Get a description of a genre
app.get('/movies/genre/:name', (req, res) => {
    Movie.findOne({ 'Genre.Name': req.params.name })
        .then((movie) => {
            res.json(movie.Genre);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

app.get('/movies/directors/:name', (req, res) => {
    res.send('Successful GET request returning data about a director');
});

//Add a user
/*We'll expect JSON in this format
{
    ID: Integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
}*/
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) =>{res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Get all users
app.get('/users', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

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
    res.status(500).send('ERROR! Does not compute! ' + err);
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
  });
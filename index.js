const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/CineFanDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
morgan = require('morgan');

const app = express();

app.use(express.static('public'));

const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

let auth = require('./auth')(app);

/* let movies = [
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
]; */

app.use(morgan('common'));
  
// GET requests & app.use
app.get('/', (req, res) => {
res.send('Welcome to my movie hub, I hope you enjoy it!');
});

// Return a list of all movies & data
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

// Return data about a single movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movies) => {
            res.json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

// Return data about a genre
app.get('/movies/genre/:name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.name })
        .then((movie) => {
            res.json(movie.Genre);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

// Return data about a director
app.get('/movies/director/:name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name })
        .then((movie) => {
            res.json(movie.Director);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
})

// Add a user
/* We'll expect JSON in this format
{
    ID: Integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
} */
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
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
        $addToSet: {FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure the updated document is returned
    (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
    });
});

// Remove a movie from a user's list of favorites
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure the updated document is returned
    (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
    });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found');
        } else {
            res.status(200).send(req.params.Username + ' was deleted');
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR! Does not compute! ' + err);
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080');
  });
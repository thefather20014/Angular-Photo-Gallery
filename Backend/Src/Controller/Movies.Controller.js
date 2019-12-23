const ctrlMovies = {};
const Movies = require('../Model/Movies');
const { updateValidation } = require('../Routes/Validations');
const path = require('path');
const fs = require('fs-extra');

ctrlMovies.getMovies = async (req, res) => {

    const movies = await Movies.find();
    res.json(movies);
};

ctrlMovies.createMovie = async (req, res) => {

    const { Title,
        Duration,
        Director,
        Resolution,
        Genre,
        Price,
        Rating,
        Date,
        Description,
        Stars,
        Country,
        Languague } = req.body;

    const movie = new Movies({

        Title,
        Duration,
        Director,
        Resolution,
        Genre,
        Price,
        Rating,
        Date,
        ImagePath: '/' + req.file.filename,
        OriginalPath: req.file.path,
        Description,
        Stars,
        Country,
        Languague
    });

    try {
        await movie.save();
        res.json({ status: 'Movie Successfull Created!', movie });
        console.log(movie);
    }
    catch (err) {
        res.status(400).send(err);
    }

};

ctrlMovies.getMovie = async (req, res) => {

    const movie = await Movies.findById(req.params.id);
    res.json(movie);
};

ctrlMovies.updatedMovie = async (req, res) => {

    const { Title,
        Duration,
        Director,
        Resolution,
        Genre,
        Price,
        Rating,
        Date,
        Description,
        Stars,
        Country,
        Languague } = req.body;

    const { id } = req.params;

    const newMovie = {

        Title,
        Duration,
        Director,
        Resolution,
        Genre,
        Price,
        Rating,
        Date,
        Description,
        Stars,
        Country,
        Languague
    };

    const { error } = updateValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].path[0]);
    }
    else {
        const movieUpdated = await Movies.findByIdAndUpdate(id, { $set: newMovie }, { new: true });
        res.json({ status: 'Movie Successfull Updated!', movieUpdated });
    }

};

ctrlMovies.deleteMovie = async (req, res) => {

    const { id } = req.params;

    try 
    {
        const movieDeleted = await Movies.findByIdAndRemove(id);

    if(movieDeleted) 
    {
        await fs.unlink(path.join(movieDeleted.OriginalPath));
    }

    return res.json({status: "Movie Successfull Deleted!", movieDeleted});
    }
    catch(err) 
    {
        res.status(400).send('Movie Not Deleted!');
    }

};

module.exports = ctrlMovies;
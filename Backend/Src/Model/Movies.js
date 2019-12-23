const { Schema, model } = require('mongoose');

const moviesSchema = new Schema({

    Title: { type: String, required: true, min: 3, max: 256 },
    Duration: { type: Number, required: true },
    Director: { type: String, required: true, min: 3, max: 256 },
    Resolution: { type: String, required: true, min: 3, max: 256 },
    Genre: { type: String, required: true, min: 3, max: 256 },
    Price: { type: Number, required: true },    
    Rating: { type: String, required: true, min: 1, max: 5 },
    Date: { type: Date, required: true },
    ImagePath: { type: String, required: true, min: 1, max: 256 },
    OriginalPath: { type: String, required: true, min: 1, max: 256 },
    Description: { type: String, required: true, min: 1, max: 256 },
    Stars: { type: Number, required: true },
    Country: { type: String, required: true, min: 1, max: 256 },
    Languague: { type: String, required: true, min: 1, max: 120 },
    DateCreated: { type: Date, default: Date.now }
});

module.exports = model('Movies', moviesSchema);
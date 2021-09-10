const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: String,
});

// function for validate genre
const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error, value } = schema.validate(genre);

    if (error) return { error };
    return { name: genre.name };
};

module.exports.Genre = mongoose.model('Genre', genreSchema);
module.exports.validate = validateGenre;

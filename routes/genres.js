const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

// GET list of all genres
// GET /api/genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        console.error(err.message);
        res.json(err);
    }
});

// GET /api/genres/:id
router.get('/:id', async (req, res) => {
    try {
        // find relevent genre for requested id
        // if not found send 404
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('No genre for requested Id');

        // send found genre
        res.json(genre);
    } catch (err) {
        console.error(err.message);
        res.json(err);
    }
});

// CREATE a new genre
// POST /api/genres with req.body { name: '' }
router.post('/', async (req, res) => {
    // validate genre name
    const { error, name } = validate(req.body);
    // if not valid send 400 - Bad request
    if (error) return res.status(404).send(error.details[0].message);

    // create new genre
    const genre = new Genre({
        name,
    });

    try {
        // save new genre to database
        const savedGenre = await genre.save();
        // show new genre
        res.json(savedGenre);
    } catch (err) {
        console.error(err.message);
        res.json(err.message);
    }
});

// UPDATE a existing genre
// PUT /api/genres/:id with req.body { name: '' }
router.put('/:id', async (req, res) => {
    try {
        // find genre for requested id
        const genre = await Genre.findById(req.params.id);
        // if not found send 404 - Not found
        if (!genre)
            return res.status(404).send('Not found a genre for requested Id');

        // validate genre name
        const { error, name } = validate(req.body);
        // if not valid send 400 - Bad request
        if (error) return res.status(400).send(error.details[0].message);

        // update genre
        genre.name = name;
        genre.set({
            name,
        });
        const updatedGenre = await genre.save();

        // show updated genre
        res.json(updatedGenre);
    } catch (err) {
        console.error(err.message);
        res.json(err);
    }
});

// delete a existing genre
// DELETE /api/genres/:id
router.delete('/:id', async (req, res) => {
    try {
        // delete that genre
        const deletedGenre = await Genre.findByIdAndRemove(req.params.id);
        // if not found send 404
        if (!deletedGenre)
            return res.status(404).send('Not found genre for requested Id');
        // show deleted genre
        res.json(deletedGenre);
    } catch (err) {
        console.error(err.message);
        res.json(err);
    }
});

module.exports = router;

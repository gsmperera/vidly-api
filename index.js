require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const home = require('./routes/home');
const genres = require('./routes/genres');

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('connected to mongodb...'))
    .catch((err) => console.error(err.message));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

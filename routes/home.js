const express = require('express');
const router = express.Router();

// home
router.get('/', (req, res) => {
    res.send('Hello, Welcome to Vidly!');
});

module.exports = router;

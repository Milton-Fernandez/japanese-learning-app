const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('retrieving data');
    const queryText = 'SELECT * FROM "data" ORDER BY "title";';
    pool.query(queryText).then(response => {
        console.log('Retrieved all data');
        res.status(200).send(response.rows);
    }).catch(err => {
        console.log('Error in get', err);
        res.sendStatus(500);
    });
});



module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('retrieving data');
    const queryText = 'SELECT * FROM "result";';
    pool.query(queryText).then(response => {
        console.log('Retrieved all data');
        res.status(200).send(response.rows);
    }).catch(err => {
        console.log('Error in get', err);
        res.sendStatus(500);
    });
});

router.post('/add', (req, res) => {
    console.log('Adding data');
    const newData = req.body;
    const queryText = `INSERT INTO "result" ("user","name","correct","incorrect","quizname","date") VALUES ($1,$2,$3,$4,$5,$6); `;
    pool.query(queryText, [newData.user, newData.name, newData.correct, newData.incorrect,newData.quizname,newData.date])
        .then(restult => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new data', error);
            res.sendStatus(500);
        });
});



module.exports = router;
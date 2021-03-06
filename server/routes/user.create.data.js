const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', (req, res) => {
    console.log('retrieving data');
    const queryText = 'SELECT * FROM "userdata" ;';
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
    const queryText = `INSERT INTO "userdata" ("title","japanese","english","key","user") VALUES ($1,$2,$3,$4,$5); `;
    pool.query(queryText, [newData.title, newData.japanese, newData.english, newData.key,newData.user])
        .then(restult => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new data', error);
            res.sendStatus(500);
        });
});


module.exports = router;
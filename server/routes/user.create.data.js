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


router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    console.log('Deleting data at id:', id);
    const queryText = `DELETE FROM "userdata" WHERE "id" = $1;`;
    console.log(id);
    pool.query(queryText, [id]).then(() => {
        console.log(`Deleted at id: ${id} successfully`);
        res.sendStatus(204);
    }).catch(err => {
        console.log('Error in delete', err);
        res.sendStatus(500);
    });
});

router.put('/update/:id', (req, res) => {
    const data = req.body;
    const query = `UPDATE "userdata" SET "title" = $1, "japanese" = $2, "english" = $3, "key" = $4
    WHERE "id" = $5 ;`;
    console.log(req.body);
    pool.query(query, [data.title, data.japanese, data.english, data.key, req.params.id])
        .then(result => {
            res.status(200).send(result.rows)
            console.log('in server');

        }).catch(err => {
            console.log(err)
            console.log(req.body);
            res.sendStatus(500)
        })

});


module.exports = router;
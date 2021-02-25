const express = require('express');
const pool = require('../modules/pool');
const { default: axios } = require('axios');

const router = express.Router();

router.get('/',(req,res) => {
    console.log('retrieving data');
    const queryText = 'SELECT * FROM "data" ORDER BY RANDOM();';
    pool.query(queryText).then(response =>{
        console.log('Retrieved all data');
        res.status(200).send(response.rows);
    }).catch(err => {
        console.log('Error in get',err);
        res.sendStatus(500);
    });
});

router.post('/add',(req,res) =>{
    console.log('Adding data');
    const newData = req.body;
    const queryText = `INSERT INTO "data" ("title","japanese","english","key") VALUES ($1,$2,$3,$4); ` ;
    pool.query(queryText, [newData.title,newData.japanese,newData.english,newData.key])
        .then(restult => {
            res.sendStatus(201);
        })
        .catch(error =>{
            console.log('Error adding new data',error);
            res.sendStatus(500);
        });
});

router.put('/update/:id', (req,res) =>{
    const data = req.body.payload;
    const query = `UPDATE "data" SET "title" = $1, "japanese" = $2, "english" = $3, "key" = $4
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
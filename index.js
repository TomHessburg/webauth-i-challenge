const express = require('express');
const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);



server.get('/', (req,res) => {
    res.send('welcome to auth')
})


server.listen(5000, () => console.log('server listening on localhost:5000'))
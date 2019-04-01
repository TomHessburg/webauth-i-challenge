const express = require('express');
const server = express();
const bcrypt = require('bcryptjs');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

server.use(express.json());

server.get('/', (req,res) => {
    res.send('welcome to auth')
})




server.post('/api/register', (req,res) => {
    //Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
    
    db('users')
        .insert(user)
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json(err));
})

server.post('/api/login', (req,res) => {
    //Use the credentials sent inside the body to authenticate the user. On successful login, create a new session for the user and send back a 'Logged in' message and a cookie that contains the user id. If login fails, respond with the correct status code and the message: 'You shall not pass!'

    db('users')
        .where({username: req.body.username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                res.status(200).json({ message: `Logged in`, cookie: user.id });
            }else{
                res.status(401).json({ message: 'You shall not pass!' });
            }
        }).catch(err => res.status(500).json({message: 'there was an error retrieving your account...'}));

})

server.get('/api/users', restricted, (req,res) => {
    //If the user is logged in, respond with an array of all the users contained in the database. 
    //If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.
    db('users')
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err));

})

function restricted(req,res,next){
    let { username, password } = req.headers;

    if(username && password){
  
    db('users')
        .where({ username: username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
            next()
            } else {
            res.status(401).json({ message: 'YOU SHALL NOT PAAAASSSSSSSs' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }
    else{
        res.status(401).json({message: "Please provied credentials"})
    }
}


server.listen(5000, () => console.log('server listening on localhost:5000'))
const express = require('express');
const db = require('./db');
const { User, Department } = db.models;

const app = express();

module.exports = app;

app.use(express.json());

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.post('/api/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(next);
});


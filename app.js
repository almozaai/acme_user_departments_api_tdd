const express = require('express');
const db = require('./db');
const { User, Department } = db.models;

const app = express();

module.exports = app;

app.use(express.json());

Object.entries(db.conn.models).forEach()

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

app.put('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.get('/api/departments', (req, res, next) => {
  Department.findAll()
    .then(departments => res.send(departments))
    .catch(next);
});

app.post('/api/departments', (req, res, next) => {
  Department.create(req.body)
    .then(department => res.status(201).send(department))
    .catch(next);
});

app.put('/api/departments/:id', (req, res, next) => {
  Department.findByPk(req.params.id)
    .then(department => department.update(req.body))
    .then(department => res.send(department))
    .catch(next);
});

app.delete('/api/departments/:id', (req, res, next) => {
  Department.findByPk(req.params.id)
    .then(department => department.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

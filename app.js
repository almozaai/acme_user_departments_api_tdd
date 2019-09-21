const express = require('express');
const db = require('./db');
const { User, Department } = db.models;
const { pluralize } = require('inflection');

const app = express();

module.exports = app;

app.use(express.json());

Object.entries(db.conn.models).forEach(([name, model]) => {
  const route = `/api/${pluralize(name)}`;

  app.get(route, (req, res, next) => {
    model.findAll()
      .then(items => res.send(items))
      .catch(next);
  });

  app.post(route, (req, res, next) => {
    model.create(req.body)
      .then(item => res.status(201).send(item))
      .catch(next);
  });

  app.put(`${route}/:id`, (req, res, next) => {
    model.findByPk(req.params.id)
      .then(item => item.update(req.body))
      .then(item => res.send(item))
      .catch(next);
  });

  app.delete(`${route}/:id`, (req, res, next) => {
    model.findByPk(req.params.id)
      .then(item => item.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
  });
});

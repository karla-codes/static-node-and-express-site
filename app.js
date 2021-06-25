'use strict';

const express = require('express');
const app = express();
const { projects } = require('./data.json');
const staticPath = '/static';

// MIDDLEWARE
app.set('view engine', 'pug');
app.use(staticPath, express.static('public'));

// ROUTES

// index route
app.get('/', (req, res) => {
  res.render('index', { projects });
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
});

// project route
app.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  const name = projects[id].project_name;
  res.render('project', { name });
});

// 404 ERROR HANDLER
app.use((req, res, next) => {
  const err = new Error("Uh oh, looks like this page doesn't exist.");
  err.status = 404;
  next(err);
});

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(err.status);
  console.log(err.message);
  console.log(err.status);
  next();
});

// SERVER SETUP
app.listen(3000, () => {
  console.log(`The app is running on localhost: 3000!`);
});

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
  const { description } = projects[id];
  const { technologies } = projects[id];
  const images = projects[id].image_urls.slice(1);
  const repo = projects[id].github_link;
  const liveLink = projects[id].live_link;
  res.render('project', {
    name,
    description,
    technologies,
    images,
    repo,
    liveLink,
  });
});

// 404 ERROR HANDLER
app.use((req, res, next) => {
  const err = new Error("Uh oh, looks like this page doesn't exist.");
  err.status = 404;
  res.render('page-not-found', { err });
});

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  err.status = 500;
  res.status(500);
  console.log(err.message);
  console.log(err.status);
  res.render('error', { err });
});

// SERVER SETUP
app.listen(3000, () => {
  console.log(`The app is running on localhost: 3000!`);
});

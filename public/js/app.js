'use strict';

const express = require('express');
const app = express();
const data = require('../data.json');
const { projects } = data;
const staticPath = '/static';

console.log(data);

// MIDDLEWARE
app.set('view engine', 'pug');
app.use(staticPath, express.static('public'));

// ROUTES

// index route
app.get('/', (req, res) => {
  res.render('index', data.projects);
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
});

// project route
app.get('/projects/:id', (req, res) => {
  const 
  const { id } = req.params;
  const name = projects[id].project_name;
  res.render('project', { name } )
});

// SERVER SETUP
app.listen(3000, () => {
  console.log(`The app is runnin on localhost: 3000!`);
})
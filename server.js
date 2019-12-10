const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require('./data/accounts/accounts-router')

const server = express();

server.use(express.json());


server.get('/', logger,  (req, res) => {
    res.send(`<h2>Sanity Test</h2>`);
  });
  
  //custom middleware
  
  function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl} at ${ new Date().toISOString()}`)
    next();
  }

  server.use('/api/accounts', accountRouter)

module.exports = server;
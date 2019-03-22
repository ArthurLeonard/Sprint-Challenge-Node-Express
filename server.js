// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express'); // import express NEED TO ADD IT TO YARN TOO
const projectsRouter = require('./projects.js');
const actionsRouter = require('./actions.js');

const server = express();           // create server object

server.use(express.json());         // to allow server to work with json format

server.get('/', (req, res) => { res.send('Hello Mom!') } );

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);


module.exports = server;




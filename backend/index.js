'use strict';
const { setUpServer } = require('./src/db/db');

const cors = require('cors');
const express = require('express');
const server = express();

// Router index
const router = require('./src/api/routes/router');

server.use(express.json());
server.use(cors());
server.use('/api', router);

setUpServer(server);

module.exports = server;

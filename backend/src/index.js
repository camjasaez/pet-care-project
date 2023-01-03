'use strict';
const { setUpServer } = require('./db/db');

const cors = require('cors');
const express = require('express');
const server = express();
const nodemailer = require('nodemailer');

// Router index
const router = require('./api/routes/router');

server.use(express.json());
server.use(cors());
server.use('/api', router);

setUpServer(server);

module.exports = server;

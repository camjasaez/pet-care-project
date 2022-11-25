'use strict';
const { Router } = require('express');
const healthCheck = require('./healthCheck/healthCheck.route');
const router = Router();

router.use('/healthcheck', healthCheck); //Server verification

module.exports = router;

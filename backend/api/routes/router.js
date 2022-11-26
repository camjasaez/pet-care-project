'use strict';
const { Router } = require('express');
const healthCheck = require('./healthCheck/healthCheck.route');
const petOwner = require('./petOwner/petOwner.route');
const router = Router();

router.use('/healthcheck', healthCheck); //Server verification
router.use('/petowner', petOwner); //petOwner Endpoint

module.exports = router;

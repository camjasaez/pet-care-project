'use strict';
const { Router } = require('express');
const healthCheck = require('./healthCheck/healthCheck.route');
const petOwner = require('./petOwner/petOwner.route');
const pet = require('./pet/pet.route');
const router = Router();

router.use('/healthcheck', healthCheck); //Server verification
router.use('/petowner', petOwner); //petOwner Endpoint
router.use('/pet', pet); //pet Endpoint

module.exports = router;

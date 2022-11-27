'use strict';
const { Router } = require('express');
const healthCheck = require('./healthCheck/healthCheck.route');
const petOwner = require('./petOwner/petOwner.route');
const pet = require('./pet/pet.route');
const careTaker = require('./careTaker/careTaker.route');
const care = require('./care/care.route');
const takeCare = require('./takeCare/takeCare.route');
const router = Router();

router.use('/healthcheck', healthCheck); //Server verification
router.use('/petowner', petOwner); //petOwner Endpoint
router.use('/pet', pet); //pet Endpoint
router.use('/caretaker', careTaker); //careTaker Endpoint
router.use('/care', care); //care Endpoint
router.use('/takecare', takeCare); //takeCare Endpoint

module.exports = router;

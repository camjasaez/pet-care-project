'use strict';
const { Router } = require('express');
const healthCheck = require('../../controllers/healthCheck/healthCheck.controller');

const router = Router();

router.get('/', healthCheck);

module.exports = router;

'use strict';

const { Router } = require('express');
const router = Router();

const care = require('../../controllers/care/care.controller');

router.get('/', care.getCare);
router.post('/:idCareTaker', care.createCare);

module.exports = router;

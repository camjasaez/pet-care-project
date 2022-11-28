'use strict';

const { Router } = require('express');
const router = Router();

const care = require('../../controllers/care/care.controller');

router.get('/', care.getCare);
router.get('/:id', care.getCareById);
router.post('/', care.createCare);
router.delete('/:id', care.deleteCare);
router.patch('/:id', care.withdrawPet);
router.patch('/:idCare/rating/:idRating', care.addRating);

module.exports = router;

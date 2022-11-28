'use strict';

const { Router } = require('express');
const router = Router();

const pet = require('../../controllers/pet/pet.controller');

router.route('/').get(pet.getPets).post(pet.createPet);

router.route('/:id').post(pet.createPet);

router.route('/:id').get(pet.getPet).put(pet.updatePet).delete(pet.deletePet);

module.exports = router;

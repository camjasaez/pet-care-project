'use strict';

const { Router } = require('express');
const petOwner = require('../../controllers/petOwner/petOwner.controller');

const router = Router();

router.get('/', petOwner.getPetOwners);
router.get('/:id', petOwner.getPetOwnerById);
router.post('/', petOwner.createPetOwner);
router.delete('/:id', petOwner.removePetOwners);
router.put('/:id', petOwner.modifyPetOwner);
module.exports = router;
'use astrict';

const { Router } = require('express');
const careTaker = require('../../controllers/careTaker/careTaker.controller');

const router = Router();

router.get('/', careTaker.getCareTakers);
router.get('/:id', careTaker.getCareTakerById);
router.post('/', careTaker.createCareTaker);
router.delete('/:id', careTaker.deleteCareTaker);
router.put('/:id', careTaker.modifyCareTaker);

module.exports = router;

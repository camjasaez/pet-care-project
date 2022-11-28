const { Router } = require('express');
const takeCare = require('../../controllers/takeCare/takeCare.controller');

const router = Router();

router.get('/', takeCare.getTakeCare);
router.get('/:id', takeCare.getTakeCareById);
router.post('/', takeCare.createTakeCare);

module.exports = router;

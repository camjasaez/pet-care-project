const { Router } = require('express');
const RatingController = require('../../controllers/rating/rating.controller');

const router = Router();

router.post('/', RatingController.createRating);
router.get('/:id', RatingController.getRatingById);
router.get('/', RatingController.getAllRating);

module.exports = router;

const express = require('express');
const tourControl = require('../controllers/tourControler');

const router = express.Router();

router.route('/').get(tourControl.getAlltour).post(tourControl.addTour);
router
  .route('/:id')
  .get(tourControl.getsingleTour)
  .patch(tourControl.tourUpdate)
  .delete(tourControl.delTour);

module.exports = router;

// .delete(tourControl.delTour);

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.cancelReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:reservationId', reservationController.getReservation);

module.exports = router;
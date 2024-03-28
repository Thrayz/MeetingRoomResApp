const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { auth, authorize } = require('../middleware/auth');

router.post('/',auth, reservationController.createReservation);
router.put('/:reservationId',auth, reservationController.updateReservation);
router.delete('/:reservationId',auth, reservationController.cancelReservation);
router.get('/', auth, reservationController.getAllReservations);
router.get('/:reservationId',auth, reservationController.getReservation);
router.get('/filter/:userId',auth, reservationController.getReservationsByUserAndFilterPaginated);
router.get('/meeting-room/:meetingRoomId',auth, reservationController.getReservationsByMeetingRoom);

module.exports = router;
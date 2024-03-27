const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');

router.post('/', meetingRoomController.createMeetingRoom);
router.get('/search', meetingRoomController.searchMeetingRooms);
router.put('/:meetingRoomId', meetingRoomController.updateMeetingRoom);
router.delete('/:meetingRoomId', meetingRoomController.deleteMeetingRoom);
router.get('/', meetingRoomController.getAllMeetingRooms);
router.get('/paginated', meetingRoomController.getMeetingRoomsPaginated);
router.get('/:meetingRoomId', meetingRoomController.getMeetingRoom);



module.exports = router;

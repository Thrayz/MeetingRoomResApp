const express = require('express');
const router = express.Router();
const meetingRoomController = require('../controllers/meetingRoomController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', authorize, meetingRoomController.createMeetingRoom);
router.get('/search', auth, meetingRoomController.searchMeetingRooms);
router.put('/:meetingRoomId', authorize, meetingRoomController.updateMeetingRoom);
router.delete('/:meetingRoomId', authorize, meetingRoomController.deleteMeetingRoom);
router.get('/', auth, meetingRoomController.getAllMeetingRooms);
router.get('/paginated', auth, meetingRoomController.getMeetingRoomsPaginated);
router.get('/:meetingRoomId', auth, meetingRoomController.getMeetingRoom);



module.exports = router;

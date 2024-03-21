const { MeetingRoom } = require('../models/meetingRoom');

exports.createMeetingRoom = async (req, res) => {
    try {
        const { name, capacity, equipments, availability } = req.body;
        const newMeetingRoom = await MeetingRoom.create({ name, capacity, equipments, availability});
        res.status(201).json({ message: 'Meeting room created successfully', newMeetingRoom });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateMeetingRoom = async (req, res) => {
    try {
        const { meetingRoomId } = req.params;
        const { name, capacity, equipments, availability } = req.body;
        const meetingRoom = await meetingRoom.findByIdAndUpdate (meetingRoomId, { name, capacity, equipments, availability }, { new: true, runValidators: true });
        res.status(200).json({ message: 'Meeting room updated successfully', meetingRoom });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMeetingRoom = async (req, res) => {
    try {
        const { meetingRoomId } = req.params;
        await meetingRoom.findByIdAndDelete(meetingRoomId);
        res.status(200).json({ message: 'Meeting room deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllMeetingRooms = async (req, res) => {
    try {
        const meetingRooms = await meetingRoom.find();
        res.status(200).json(meetingRooms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMeetingRoom = async (req, res) => {
    try {
        const { meetingRoomId } = req.params;
        const meetingRoom = await meetingRoom.findById(meetingRoomId);
        res.status(200).json(meetingRoom);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};




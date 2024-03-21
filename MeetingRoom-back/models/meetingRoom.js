const mongoose = require('mongoose');

const meetingRoomSchema = new mongoose.Schema({
    name: {type: String,required: true},
    capacity: {type: Number,required: true},
    equipments: {type: [String]},
    availability: {type: Boolean,default: true}
});

const MeetingRoom = mongoose.model('MeetingRoom', meetingRoomSchema);
module.exports = { MeetingRoom, meetingRoomSchema};
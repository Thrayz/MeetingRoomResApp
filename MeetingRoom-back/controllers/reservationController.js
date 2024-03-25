const { Reservation } = require('../models/Reservation');
const { sendEmail } = require('../mailService/emailSender');

exports.createReservation = async (req, res) => {
    try {
        const { user, meetingRoom, reservationDate, startTime, endTime } = req.body;
        
        const conflictingReservation = await Reservation.findOne({
            meetingRoom,
            reservationDate,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $eq: startTime }, endTime: { $eq: endTime } }
            ]
        });

        if (conflictingReservation) {
            return res.status(409).json({ message: 'Conflict: The meeting room is already reserved for this time slot' });
        }

        const reservation = await Reservation.create({ user, meetingRoom, reservationDate, startTime, endTime });

        const reservationDateFormatted = reservationDate.toLocaleDateString('en-GB');
        const startTimeFormatted = startTime.toLocaleTimeString('en-US', { hour12: true });
        const endTimeFormatted = endTime.toLocaleTimeString('en-US', { hour12: true });

        const emailText = `Your reservation for the meeting room ${meetingRoom} on ${reservationDateFormatted} from ${startTimeFormatted} to ${endTimeFormatted} has been successfully created.`;

        await sendEmail('Reservation Confirmation', emailText);

        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { user, meetingRoom, reservationDate, startTime, endTime } = req.body;
        
        const conflictingReservation = await Reservation.findOne({
            _id: { $ne: reservationId }, 
            meetingRoom,
            reservationDate,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $eq: startTime }, endTime: { $eq: endTime } }
            ]
        });

        if (conflictingReservation) {
            return res.status(409).json({ message: 'Conflict: The meeting room is already reserved for this time slot' });
        }

        const reservation = await Reservation.findByIdAndUpdate(reservationId, { user, meetingRoom, reservationDate, startTime, endTime });
        res.status(200).json({ message: 'Reservation updated successfully', reservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.cancelReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        await Reservation.findByIdAndDelete(reservationId);
        res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await Reservation.findById(reservationId);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getReservationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Reservation.find({ user: userId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getReservationsByMeetingRoom = async (req, res) => {
    try {
        const { meetingRoomId } = req.params;
        const reservations = await Reservation.find({ meetingRoom: meetingRoomId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getReservationsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const reservations = await Reservation.find({ reservationDate: date });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservationsByMeetingRoomAndDate = async (req, res) => {
    try {
        const { meetingRoomId, date } = req.params;
        const reservations = await Reservation.find({ meetingRoom: meetingRoomId, reservationDate: date });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

exports.getReservationsByUserAndDate = async (req, res) => {
    try {
        const { userId, date } = req.params;
        const reservations = await Reservation.find({ user: userId, reservationDate: date });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservationsByUserAndMeetingRoom = async (req, res) => {
    try {
        const { userId, meetingRoomId } = req.params;
        const reservations = await Reservation.find({ user: userId, meetingRoom: meetingRoomId });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservationsByUserMeetingRoomAndDate = async (req, res) => {
    try {
        const { userId, meetingRoomId, date } = req.params;
        const reservations = await Reservation.find({ user: userId, meetingRoom: meetingRoomId, reservationDate: date });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  

exports.getReservationsByMeetingRoomAndTime = async (req, res) => {
    try {
        const { meetingRoomId, startTime, endTime } = req.params;
        const reservations = await Reservation.find({ meetingRoom: meetingRoomId, startTime: { $lt: endTime }, endTime: { $gt: startTime } });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllReservationsPaginated = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const reservations = await Reservation.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Reservation.countDocuments();
        res.status(200).json({
            reservations,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getReservationsByUserPaginated = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 3 } = req.query;
        const reservations = await Reservation.find({ user: userId })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Reservation.countDocuments({ user: userId });
        res.status(200).json({
            reservations,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.getReservationsByUserAndFilterPaginated = async (req, res) => {
    try {
        const { userId } = req.params;
        const { meetingRoomId, reservationDate } = req.query;
        const filter = { user: userId };
        if (meetingRoomId) filter.meetingRoom = meetingRoomId;
        if (reservationDate) filter.reservationDate = reservationDate;
        let { page = 1, limit = 10 } = req.query;
        
        page = +page;
        limit = +limit;

        const reservations = await Reservation.find(filter)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
        const count = await Reservation.countDocuments(filter);
        res.status(200).json({
            reservations,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

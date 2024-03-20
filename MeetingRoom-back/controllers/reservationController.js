const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const { user, meetingRoom, reservationDate, startTime, endTime } = req.body;
        const reservation = await Reservation.create({ user, meetingRoom, reservationDate, startTime, endTime });
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const { user, meetingRoom, reservationDate, startTime, endTime } = req.body;
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


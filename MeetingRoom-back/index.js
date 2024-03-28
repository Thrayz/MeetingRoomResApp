const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');



const app = express();
const port = 3000;


const corsOptions = {
    origin: 'https://mrra-1d094.web.app',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


const reservationController = require('./controllers/reservationController');
const meetingRoomController = require('./controllers/meetingRoomController');
const authController = require('./controllers/authController');
const reservationRoutes = require('./routes/reservation');
const meetingRoomRoutes = require('./routes/meetingRoom');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reservation', reservationRoutes);
app.use('/meetingRoom', meetingRoomRoutes);
app.use('/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');

});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});


module.exports = app;

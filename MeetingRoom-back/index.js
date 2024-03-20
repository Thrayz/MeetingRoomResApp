const express = require('express');
const meetingRoomController = require('./controllers/meetingRoomController');
const reservationRoutes = require('./routes/reservation');
const reservationController = require('./controllers/reservationController');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});




app.use(express.json());

app.use('/reservation', reservationRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

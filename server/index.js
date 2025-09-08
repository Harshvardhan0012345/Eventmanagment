// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware Setup (should be first)
app.use(cors());
app.use(express.json()); // This is for parsing JSON bodies

// 2. MongoDB Connection
// Make sure you have a .env file in this /server directory
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// 3. Define Routers
const eventsRouter = require('./routes/events');
const usersRouter = require('./routes/users');
const rsvpsRouter = require('./routes/rsvps');

// 4. Use Routes
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/rsvps', rsvpsRouter);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Event Management Backend is running!');
});

// 5. Start the Server (should be last)
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

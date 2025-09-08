const router = require('express').Router();
let Event = require('../models/event.model');

// Get all events
router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json({ message: 'Error fetching events', error: err }));
});

// Add a new event
router.route('/add').post((req, res) => {
    const newEvent = new Event(req.body);

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => {
            console.error('Error creating event:', err); // Log the full error on the server
            // Check for Mongoose validation error and send a specific, detailed message back to the client
            if (err.name === 'ValidationError') {
                // Extracting a cleaner error message
                const messages = Object.values(err.errors).map(val => val.message);
                return res.status(400).json({ message: 'Validation Error', errors: messages });
            }
            // For other types of errors
            res.status(400).json({ message: 'Error creating event', error: err.message });
        });
});

// Get an event by ID
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json({ message: 'Error fetching event', error: err }));
});

// Update an event by ID
router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            Object.assign(event, req.body);

            event.save()
                .then(() => res.json('Event updated!'))
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        const messages = Object.values(err.errors).map(val => val.message);
                        return res.status(400).json({ message: 'Validation Error', errors: messages });
                    }
                    res.status(400).json({ message: 'Error updating event', error: err.message });
                });
        })
        .catch(err => res.status(400).json({ message: 'Error finding event', error: err }));
});

// Delete an event by ID
router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json({ message: 'Error deleting event', error: err }));
});

module.exports = router;

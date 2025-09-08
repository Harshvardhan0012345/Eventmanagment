const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    organizerId: { type: String, required: true },
    imageUrl: { type: String },
    category: { type: String, enum: ['wedding', 'corporate', 'birthday', 'conference', 'other'], default: 'other' },
    isPublic: { type: Boolean, default: true },
    rsvpDeadline: { type: Date, required: true },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
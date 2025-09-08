const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    eventId: { type: String, required: true },
    guestId: { type: String, required: true },
    guestName: { type: String, required: true },
    guestEmail: { type: String, required: true },
    status: { type: String, enum: ['attending', 'not-attending', 'maybe'], required: true },
    plusOnes: { type: Number, default: 0 },
    dietaryRestrictions: { type: String },
    message: { type: String },
}, {
    timestamps: true,
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;
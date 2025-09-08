// server/models/user.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add this line
    role: { type: String, enum: ['organizer', 'guest'], default: 'guest' },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
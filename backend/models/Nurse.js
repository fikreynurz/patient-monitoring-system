// backend/models/Nurse.js
const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nurseLicenseNumber: { type: String, unique: true },
  phoneNumber: String,
  assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  schedule: [Date],
});

module.exports = mongoose.model('Nurse', nurseSchema);

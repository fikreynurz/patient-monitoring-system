// backend/models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, enum: ['Kardiologi', 'Neurologi', 'Umum'] },
  medicalLicenseNumber: { type: String, unique: true },
  email: String,
  phoneNumber: String,
  schedule: [Date],
});

module.exports = mongoose.model('Doctor', doctorSchema);

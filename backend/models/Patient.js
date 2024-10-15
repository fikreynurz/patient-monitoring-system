// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['Pria', 'Wanita'] },
  address: String,
  phoneNumber: String,
  medicalRecordNumber: { type: String, unique: true },
  medicalHistory: String,
  allergies: String,
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  healthStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthStatus' },
});

module.exports = mongoose.model('Patient', patientSchema);

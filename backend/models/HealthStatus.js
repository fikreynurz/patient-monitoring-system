// backend/models/HealthStatus.js
const mongoose = require('mongoose');

const healthStatusSchema = new mongoose.Schema({
  heartRate: Number,
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
  },
  oxygenSaturation: Number,
  bodyTemperature: Number,
  monitoringTime: { type: Date, default: Date.now },
  condition: { type: String, enum: ['Normal', 'Darurat', 'Perlu Pengawasan'] },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
});

module.exports = mongoose.model('HealthStatus', healthStatusSchema);

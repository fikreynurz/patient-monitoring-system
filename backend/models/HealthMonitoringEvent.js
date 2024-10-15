// backend/models/HealthMonitoringEvent.js
const mongoose = require('mongoose');

const healthMonitoringEventSchema = new mongoose.Schema({
  eventType: { type: String, enum: ['Pemantauan', 'Alarm Darurat'] },
  healthData: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthStatus' },
  eventTime: { type: Date, default: Date.now },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalDevice' },
  notificationSent: { type: Boolean, default: false },
});

module.exports = mongoose.model('HealthMonitoringEvent', healthMonitoringEventSchema);

// backend/models/MedicalDevice.js
const mongoose = require('mongoose');

const medicalDeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Monitor Jantung', 'Infus', 'Oksimeter'] },
  serialNumber: { type: String, unique: true },
  installationLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  operationalStatus: { type: String, enum: ['Aktif', 'Nonaktif'], default: 'Aktif' },
  latestData: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('MedicalDevice', medicalDeviceSchema);

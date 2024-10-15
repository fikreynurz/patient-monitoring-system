// backend/models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomType: { type: String, enum: ['ICU', 'Rawat Inap', 'Operasi'] },
  roomStatus: { type: String, enum: ['Tersedia', 'Terisi', 'Perawatan'], default: 'Tersedia' },
  activePatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  installedDevices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalDevice' }],
});

module.exports = mongoose.model('Room', roomSchema);

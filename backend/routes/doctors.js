// backend/routes/doctors.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Similar CRUD operations as patients.js
// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get doctor by ID
router.get('/:id', getDoctor, (req, res) => {
  res.json(res.doctor);
});

// Create a new doctor
router.post('/', async (req, res) => {
  const doctor = new Doctor({
    name: req.body.name,
    specialization: req.body.specialization,
    medicalLicenseNumber: req.body.medicalLicenseNumber,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    schedule: req.body.schedule,
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a doctor
router.put('/:id', getDoctor, async (req, res) => {
  if (req.body.name != null) {
    res.doctor.name = req.body.name;
  }
  // Update other fields similarly...

  try {
    const updatedDoctor = await res.doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a doctor
router.delete('/:id', getDoctor, async (req, res) => {
  try {
    await res.doctor.remove();
    res.json({ message: 'Deleted Doctor' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get doctor by ID
async function getDoctor(req, res, next) {
  let doctor;
  try {
    doctor = await Doctor.findById(req.params.id);
    if (doctor == null) {
      return res.status(404).json({ message: 'Cannot find doctor' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.doctor = doctor;
  next();
}

module.exports = router;

// backend/routes/patients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().populate('doctor room healthStatus');
    res.json({ patients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get patient by ID
router.get('/:id', getPatient, (req, res) => {
  res.json(res.patient);
});

// Create a new patient
router.post('/', async (req, res) => {
  const patient = new Patient({
    name: req.body.name,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    medicalRecordNumber: req.body.medicalRecordNumber,
    medicalHistory: req.body.medicalHistory,
    allergies: req.body.allergies,
    doctor: req.body.doctor,
    room: req.body.room,
    healthStatus: req.body.healthStatus,
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a patient
router.put('/:id', getPatient, async (req, res) => {
  if (req.body.name != null) {
    res.patient.name = req.body.name;
  }
  // Update other fields similarly...

  try {
    const updatedPatient = await res.patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a patient
router.delete('/:id', getPatient, async (req, res) => {
  try {
    await res.patient.remove();
    res.json({ message: 'Deleted Patient' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get patient by ID
async function getPatient(req, res, next) {
  let patient;
  try {
    patient = await Patient.findById(req.params.id).populate('doctor room healthStatus');
    if (patient == null) {
      return res.status(404).json({ message: 'Cannot find patient' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.patient = patient;
  next();
}

module.exports = router;

// backend/routes/nurses.js
const express = require('express');
const router = express.Router();
const Nurse = require('../models/Nurse');

// Similar CRUD operations as doctors.js
// Get all nurses
router.get('/', async (req, res) => {
  try {
    const nurses = await Nurse.find().populate('assignedRoom');
    res.json({ nurses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get nurse by ID
router.get('/:id', getNurse, (req, res) => {
  res.json(res.nurse);
});

// Create a new nurse
router.post('/', async (req, res) => {
  const nurse = new Nurse({
    name: req.body.name,
    nurseLicenseNumber: req.body.nurseLicenseNumber,
    phoneNumber: req.body.phoneNumber,
    assignedRoom: req.body.assignedRoom,
    schedule: req.body.schedule,
  });

  try {
    const newNurse = await nurse.save();
    res.status(201).json(newNurse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a nurse
router.put('/:id', getNurse, async (req, res) => {
  if (req.body.name != null) {
    res.nurse.name = req.body.name;
  }
  // Update other fields similarly...

  try {
    const updatedNurse = await res.nurse.save();
    res.json(updatedNurse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a nurse
router.delete('/:id', getNurse, async (req, res) => {
  try {
    await res.nurse.remove();
    res.json({ message: 'Deleted Nurse' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get nurse by ID
async function getNurse(req, res, next) {
  let nurse;
  try {
    nurse = await Nurse.findById(req.params.id).populate('assignedRoom');
    if (nurse == null) {
      return res.status(404).json({ message: 'Cannot find nurse' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.nurse = nurse;
  next();
}

module.exports = router;

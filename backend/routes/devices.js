// backend/routes/devices.js
const express = require('express');
const router = express.Router();
const MedicalDevice = require('../models/MedicalDevice');

// Similar CRUD operations as patients.js
// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await MedicalDevice.find().populate('installationLocation');
    res.json({ devices });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get device by ID
router.get('/:id', getDevice, (req, res) => {
  res.json(res.device);
});

// Create a new device
router.post('/', async (req, res) => {
  const device = new MedicalDevice({
    name: req.body.name,
    type: req.body.type,
    serialNumber: req.body.serialNumber,
    installationLocation: req.body.installationLocation,
    operationalStatus: req.body.operationalStatus,
    latestData: req.body.latestData,
  });

  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a device
router.put('/:id', getDevice, async (req, res) => {
  if (req.body.name != null) {
    res.device.name = req.body.name;
  }
  // Update other fields similarly...

  try {
    const updatedDevice = await res.device.save();
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a device
router.delete('/:id', getDevice, async (req, res) => {
  try {
    await res.device.remove();
    res.json({ message: 'Deleted Medical Device' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get device by ID
async function getDevice(req, res, next) {
  let device;
  try {
    device = await MedicalDevice.findById(req.params.id).populate('installationLocation');
    if (device == null) {
      return res.status(404).json({ message: 'Cannot find medical device' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.device = device;
  next();
}

module.exports = router;

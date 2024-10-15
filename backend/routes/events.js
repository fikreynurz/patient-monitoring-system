// backend/routes/events.js
const express = require('express');
const router = express.Router();
const HealthMonitoringEvent = require('../models/HealthMonitoringEvent');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await HealthMonitoringEvent.find().populate('healthData patient device');
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event by ID
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// Create a new event
router.post('/', async (req, res) => {
  const event = new HealthMonitoringEvent({
    eventType: req.body.eventType,
    healthData: req.body.healthData,
    eventTime: req.body.eventTime,
    patient: req.body.patient,
    device: req.body.device,
    notificationSent: req.body.notificationSent,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put('/:id', getEvent, async (req, res) => {
  if (req.body.eventType != null) {
    res.event.eventType = req.body.eventType;
  }
  // Update other fields similarly...

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Deleted Health Monitoring Event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get event by ID
async function getEvent(req, res, next) {
  let event;
  try {
    event = await HealthMonitoringEvent.findById(req.params.id).populate('healthData patient device');
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

module.exports = router;

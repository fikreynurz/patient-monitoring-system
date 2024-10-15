// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const { connectRabbitMQ } = require('./services/rabbitmq');

// Import Routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const nurseRoutes = require('./routes/nurses');
const deviceRoutes = require('./routes/devices');
const eventRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/events', eventRoutes);

// Connect to MongoDB
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Connect to RabbitMQ
connectRabbitMQ();

// Start Server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

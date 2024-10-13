const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const accountRoutes = require('./routes/accountRoutes');
const staffRoutes = require('./routes/staffRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/staff', staffRoutes);

// MongoDB connection

const mongoUri = 'mongodb://localhost:27017/staff_database'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

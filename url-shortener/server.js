const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

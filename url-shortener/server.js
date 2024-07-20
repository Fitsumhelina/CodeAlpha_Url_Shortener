const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/url', require('./routes/url'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('public'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

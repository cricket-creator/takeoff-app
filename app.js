const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json({ extended: true }));

/**
 * @Routes
 */
// homepage
app.use('/', require('./routes/home.routes'));
// authentication
app.use('/api/auth', require('./routes/auth.routes'));
// contacts
app.use('/api/contacts', require('./routes/contacts.routes'));

const PORT = config.get('PORT') || 3000;

async function startServer() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

startServer();
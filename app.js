const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

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

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('PORT') || 5000;

async function startServer() {
  try {
    await mongoose.connect(
      config.get('mongoUri'),
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => console.log(`Connection error: ${err}`)
    );
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

startServer();
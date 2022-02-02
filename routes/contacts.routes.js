const { Router } = require('express');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ owner: req.user.userId });
    res.json({ contacts });
  } catch (e) {
    res.status(500).json({ message: 'Contacts: Something went wrong!' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({ message: 'This contact doesn\'t exist!' });
    }

    res.json({ contact });
  } catch (e) {
    res.status(500).json({ message: 'Contacts: Something went wrong!' });
  }
});

router.post('/add', auth, async (req, res) => {
    try {
      const { name, phone } = req.body;
      const isExist = await Contact.findOne({ phone, owner: req.user.userId });

      if (isExist) {
        return res.status(400).json({ message: 'This contact already exists!' });
      }

      const contact = new Contact({ name, phone, owner: req.user.userId });
      await contact.save();

      res.json({ message: 'New contact successfully added!' });
    } catch (e) {
      res.status(500).json({ message: 'Contacts: Something went wrong!' });
    }
  }
);

router.post('/edit/:id', auth, async (req, res) => {
  try {
    const { id, name, phone } = req.body;
    const isExist = await Contact.findById(id);

    if (!isExist) {
      return res.status(400).json({ message: 'This contact doesn\'t exist!' });
    }

    const contact = await Contact.findByIdAndUpdate(id, { name, phone });
    contact.save();
    res.json({ message: 'Contact successfully updated!' });
  } catch (e) {
    res.status(500).json({ message: 'Contacts: Something went wrong!' });
  }
});

router.post('/delete/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await Contact.findById(id);

    if (!isExist) {
      return res.status(400).json({ message: 'This contact doesn\'t exist!' });
    }

    await Contact.findByIdAndDelete(id);
    res.json({ message: 'This contact successfully deleted!' });
  } catch (e) {
    res.status(500).json({ message: 'Contacts: Something went wrong!' });
  }
});

module.exports = router;
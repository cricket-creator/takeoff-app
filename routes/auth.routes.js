const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const User = require('../models/User');

const wrongData = 'Wrong email or password!';

router.post(
  '/register',
  [
    check('email', wrongData).isEmail(),
    check('password', wrongData).isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({
          errors: errors.array(),
          message: wrongData
        });
    }

    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.status(400).json({ message: 'This user already exists!' });
      }

      const hashedPassword = bcrypt.hash(password);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'New user successfully created!' });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  });

router.post(
  '/login',
  [
    check('email', wrongData).normalizeEmail().isEmail(),
    check('password', wrongData).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({
          errors: errors.array(),
          message: wrongData
        });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'This user doesn\'t exists!' });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: wrongData });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '2h' }
      );

      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }
);

module.exports = router;
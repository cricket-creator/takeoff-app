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
    check(
      'email',
      'Invalid email')
      .isEmail(),
    check(
      'password',
      'Password length must be equal or more then 6 characters!')
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({
          errors: errors.array(),
          message: errors.array().map(err => err.msg).join('\n'),
        });
    }

    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This user already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'New user successfully created!' });
    } catch (e) {
      res.status(500).json({ message: 'Register: Something went wrong!' });
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
      return res
        .status(400)
        .json({
          errors: errors.array(),
          message: wrongData,
        });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'This user doesn\'t exists!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: wrongData });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '2h' }
      );

      res.json({ token, userId: user.id, name: user.name });
    } catch (e) {
      res.status(500).json({ message: 'Login: Something went wrong!' });
    }
  }
);

module.exports = router;
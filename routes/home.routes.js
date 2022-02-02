const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Server is ok` })
      .end();
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;
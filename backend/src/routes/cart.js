const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Cart route placeholder');
});

module.exports = router;

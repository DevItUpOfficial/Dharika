const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Orders route placeholder');
});

module.exports = router;

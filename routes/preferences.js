const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../app');

router.post('/update', ensureAuthenticated, (req, res) => {
  const { key, value } = req.body;
  req.user.updatePreferences(key, value);
  res.sendStatus(200);
});

const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll();
    res.render('admin', { bookmarks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

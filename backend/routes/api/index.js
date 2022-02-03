const router = require('express').Router();

// POST /api/test
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;

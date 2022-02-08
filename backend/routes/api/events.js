const express = require('express');
const asyncHandler = require('express-async-handler');

const { Event, Group, Rsvp, User, UserGroup } = require('../../db/models');

const router = express.Router();

// GET /api/events - READ
router.get('/', asyncHandler(async (req, res) => {
  const events = await Event.findAll({
    include: Group
  });
  return res.json(events);
}));



module.exports = router;

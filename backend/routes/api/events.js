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

// POST /api/events - CREATE
router.post('/', asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  return res.json(event);
}));

// DELETE /api/events/:eventId - DELETE
router.delete('/api/events/:eventId(\\d+)', asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);

  if (!event) throw new Error('Cannot find event');

  await Event.destroy({
    where: {
      id: event.id
    }
  });

  return res.json(event.id);
}));

// PUT /api/events/:eventId - UPDATE
router.put('/api/events/:eventId(\\d+)', asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);

  if (!event) throw new Error('Cannot find event');

  await Event.update({
    where: {
      id: event.id
    }
  });

  return res.json(event.id);
}));

// GET /api/events/:eventId - READ
router.get('/api/events/:eventId(\\d+)', asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);

  return res.json(event);
}));



module.exports = router;

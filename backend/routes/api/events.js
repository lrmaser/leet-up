const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Event, Group, User } = require('../../db/models');

const router = express.Router();

/******************** Validation Middleware ********************/
const validateEvent = [
  check('categoryId')
    .exists({ checkFalsy: true })
    .withMessage('Please select the group that will be hosting this event. If you do not have a group, please create one before proceeding.'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the event.')
    .isLength({ max: 80 })
    .withMessage('Event name cannot be more than 80 characters long.'),
  check('date')
    .isAfter(`${new Date()}`)
    .withMessage('Date must be set in the future.'),
  check('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be more than 0.'),
  check('image')
    .exists({ checkFalsy: false })
    .isURL({ require_protocol: false, require_host: false })
    .withMessage('Please provide a valid image URL.'),
  handleValidationErrors
];

// GET /api/events - READ
router.get('/', asyncHandler(async (req, res) => {
  const events = await Event.findAll({
    include: Group
  });

  return res.json(events);
}));

// POST /api/events - CREATE
router.post('/', validateEvent, asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  return res.json(event);
}));

// DELETE /api/events/:eventId - DELETE
router.delete('/:eventId(\\d+)', asyncHandler(async (req, res) => {
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
router.put('/:eventId(\\d+)', validateEvent, asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findByPk(eventId);

  if (!event) throw new Error('Cannot find event');

  const updatedEvent = await event.update(req.body);

  return res.json(updatedEvent);
}));

// GET /api/events/:eventId - READ
router.get('/:eventId(\\d+)', asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findByPk(
    eventId,
    {
      include: [ User, Group ]
    }
  );

  return res.json(event);
}));



module.exports = router;

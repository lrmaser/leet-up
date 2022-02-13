const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { Event, Group, User } = require('../../db/models');

const router = express.Router();

/******************** Validation Middleware ********************/
const validateGroup = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the group.')
    .isLength({ max: 80 })
    .withMessage('Group name cannot be more than 80 characters long.'),
  handleValidationErrors
];

// GET /api/groups - READ
router.get('/', asyncHandler(async (req, res) => {
  const groups = await Group.findAll();

  return res.json(groups);
}));

// POST /api/groups - CREATE
router.post('/', validateGroup, asyncHandler(async (req, res) => {
  const group = await Group.create(req.body);

  return res.json(group);
}));

// DELETE /api/groups/:groupId - DELETE
router.delete('/:groupId(\\d+)', asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) throw new Error('Cannot find group');

  await Group.destroy({
    where: {
      id: group.id
    }
  });

  return res.json(group.id);
}));

// PUT /api/groups/:groupId - UPDATE
router.put('/:groupId(\\d+)', validateGroup, asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);

  if (!group) throw new Error('Cannot find group');

  const updatedGroup = await group.update(req.body);

  return res.json(updatedGroup);
}));

// GET /api/groups/:groupId - READ
router.get('/:groupId(\\d+)', asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(
    groupId,
    {
      include: [ User, Event ]
    }
  );

  return res.json(group);
}));



module.exports = router;

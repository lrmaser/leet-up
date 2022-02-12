const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const groupsRouter = require('./groups.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/groups', groupsRouter);



module.exports = router;

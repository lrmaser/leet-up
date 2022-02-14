'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      { ownerId: 1, name: 'Cafe Coders', type: null, details: "What's better than enjoying a hot cup of coffee while you work on your next big project? Meet us at local shops to catch up on the latest technologies and trends." },
      { ownerId: 2, name: 'Job Seekers', type: null, details: "Find your next opportunity with us! We regularly meet with companies who want to hire you. We also host workshops so that you can continue to grow your expertise." },
      { ownerId: 3, name: 'Non-Coders Support Group', type: null, details: "Are your loved ones speaking gibberish at the dinner table? What even is a sea quill and what does it have to do with programming? Everyday we wonder what it is they're trying to tell us, but we support them nonetheless. Now it's time to find our support." }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};

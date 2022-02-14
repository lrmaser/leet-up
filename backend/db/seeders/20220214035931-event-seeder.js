'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        hostId: 1,
        categoryId: 1,
        name: 'Jams and JavaScript',
        date: new Date('14 February 2022 17:00').toISOString(),
        capacity: 30,
        image: 'https://cdn.mos.cms.futurecdn.net/EzgdmaCQuT84bgDL4fhXZS.jpg',
        details: "Jam out with us on Monday! Bring your laptop and be ready with a playlist."
      },
      {
        hostId: 1,
        categoryId: 1,
        name: 'Python Pub Crawl',
        date: new Date('19 February 2022 19:00').toISOString(),
        capacity: 20,
        image: 'https://imgs.xkcd.com/comics/ballmer_peak.png',
        details: "We'd call it a pub slither, but it just doesn't sound the same..."
      },
      {
        hostId: 2,
        categoryId: 2,
        name: 'Debugging Session',
        date: new Date('1 March 2022 12:00').toISOString(),
        capacity: 50,
        image: 'https://8vy8kztlo4-flywheel.netdna-ssl.com/wp-content/uploads/2019/11/annie-spratt-QckxruozjRg-unsplash.jpg',
        details: "Been staring at a bug for far too long? Bring your problems to us and we'll help squash them."
      },
      {
        hostId: 1,
        categoryId: 1,
        name: 'Midnight Mania',
        date: new Date('18 February 2022 24:00').toISOString(),
        capacity: 100,
        image: 'https://miro.medium.com/max/1400/1*_nk4VZGNdAKCS3rY0i_lWg.png',
        details: "Don't try to deny it, we all stay up way too late. Why not make it productive and fun?"
      },
      {
        hostId: 2,
        categoryId: 2,
        name: 'Workshop',
        date: new Date('16 February 2022 14:00').toISOString(),
        capacity: 30,
        image: 'https://building.co/wp-content/uploads/2017/04/1daycodingforbegginers.jpg',
        details: "Wednesdays we wear pink and attend the best coding workshop there is. (Wearing pink not required)."
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};

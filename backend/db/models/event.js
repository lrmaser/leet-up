'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    capacity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    image: DataTypes.TEXT,
    details: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Rsvp',
      otherKey: 'userId',
      foreignKey: 'eventId'
    };

    Event.belongsToMany(models.User, columnMapping);
    Event.belongsTo(models.User, { foreignKey: 'hostId' });
    Event.belongsTo(models.Group, { foreignKey: 'categoryId' });
  };
  return Event;
};

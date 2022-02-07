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
    image: DataTypes.STRING(255),
    details: DataTypes.TEXT
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};

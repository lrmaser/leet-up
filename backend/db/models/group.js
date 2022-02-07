'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(80)
    },
    type: {
      type: DataTypes.STRING(50)
    },
    details: DataTypes.TEXT
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};

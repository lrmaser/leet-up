'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  UserGroup.associate = function(models) {
    // associations can be defined here
  };
  return UserGroup;
};

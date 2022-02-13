'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
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
    const columnMappingUserGroup = {
      through: 'UserGroup',
      otherKey: 'userId',
      foreignKey: 'groupId'
    };

    Group.belongsTo(models.User, { foreignKey: 'ownerId' });
    Group.hasMany(models.Event, { foreignKey: 'categoryId' });
    Group.belongsToMany(models.User, columnMappingUserGroup);
  };
  return Group;
};

'use strict';
const { Validator, Op } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validate: {
        len: [60, 60]
      }
    }
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  // User instance info that is safe to save to a JWT
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  // Verifies user's input password matches hashedPassword
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // Use currentUser scope to return user with specified id
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
    const columnMappingRsvp = {
      through: 'Rsvp',
      otherKey: 'eventId',
      foreignKey: 'userId'
    };

    const columnMappingUserGroup = {
      through: 'UserGroup',
      otherKey: 'groupId',
      foreignKey: 'userId'
    };

    User.belongsToMany(models.Event, columnMappingRsvp);
    User.hasMany(models.Event, { foreignKey: 'hostId' });
    User.belongsToMany(models.Group, columnMappingUserGroup);
  };

  return User;
};

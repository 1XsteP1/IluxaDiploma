const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Author = sequelize.define('author', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, allowNull: false, unique: true },
  Mark: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Book = sequelize.define('book', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, allowNull: false, unique: true },
  Genre: { type: DataTypes.STRING, allowNull: false },
  IsAvailability: { type: DataTypes.BOOLEAN, allowNull: false },
  CountOfPages: { type: DataTypes.INTEGER, allowNull: false },
  DateOfpublication: { type: DataTypes.DATEONLY, allowNull: false },
  Publicator: { type: DataTypes.STRING, allowNull: false },
  Image: { type: DataTypes.STRING, allowNull: false, unique: false },
});

const Card = sequelize.define('card', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  Index: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

const User = sequelize.define('user', {
  ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  Name: { type: DataTypes.STRING, allowNull: false, unique: true },
  Role: { type: DataTypes.STRING, allowNull: false },
  Password: { type: DataTypes.STRING, allowNull: false },
});

Author.hasOne(Book);
Book.belongsTo(Author);

Book.hasMany(Card);
Card.belongsTo(Book);

User.hasMany(Card);
Card.belongsTo(User);

module.exports = {
  User,
  Book,
  Card,
  Author,
};

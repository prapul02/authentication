const { DataTypes } = require("sequelize");
const db = require("../config/dbConfig");
const { hash } = require("../utils/hash");

const users = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hash(value));
    }
  },
  friend1: {
    type: DataTypes.STRING,
    unique: true
  },
  friend2: {
    type: DataTypes.STRING,
    unique: true
  },
  friend3: {
    type: DataTypes.STRING,
    unique: true
  },
  friend4: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = users;

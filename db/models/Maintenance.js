const Sequelize = require("sequelize");
const database = require("../db");

const Maintenance = database.define("maintenance", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.TEXT,
  },
  post_date: {
    type: Sequelize.DATE,
  },
  link: {
    type: Sequelize.STRING,
  },
  page: {
    type: Sequelize.NUMBER,
  },
});

module.exports = Maintenance;

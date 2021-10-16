const database = require("./db");
const Maintenance = require("./models/Maintenance");

exports.init = async () => {
  await database.sync();
};

exports.createMaintenance = async ({ id, message, post_date, link, page }) => {
  // verify if id already exist
  await Maintenance.create({ id, message, post_date, link, page });
};

// select data do ultimo post adiconado

// select ultima pagina pesquisada

// select ultimo post

exports.selectMostRecentPost = async () => {
  const result = await Maintenance.findAll({
    attributes: [
      "id",
      "page",
      "post_date",
      database.fn("max", database.col("post_date")),
    ],
  });
  return result;
};

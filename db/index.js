require("dotenv").config();
const database = require("./db");
const Maintenance = require("./models/Maintenance");
const discord = require("../discord");

exports.init = async () => {
  await database.sync();
};

exports.createMaintenance = async (
  client,
  { id, message, post_date, link, page }
) => {
  const maintenance = await Maintenance.findByPk(id);

  if (!maintenance) {
    await Promise.all([
      Maintenance.create({ id, message, post_date, link, page }),
      discord.sendMessage(client, discord.CHANNEL_LUCAS_ID, link),
    ]);
  }
};

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

exports.createBulkMaintenance = async (client, maintenanceListScraped) => {
  for await (const maintenance of maintenanceListScraped) {
    await this.createMaintenance(client, maintenance);
  }
  //   maintenanceListScraped.forEach(async (maintenance) => {
  //     await this.createMaintenance(client, maintenance);
  //   });
};

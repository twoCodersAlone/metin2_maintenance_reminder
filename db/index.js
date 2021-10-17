require("dotenv").config();
const database = require("./db");
const Maintenance = require("./models/Maintenance");
const discord = require("../discord");

exports.init = async () => {
  await database.sync();
};

exports.createMaintenance = async ({ id, message, post_date, link, page }) => {
  const maintenance = await Maintenance.findByPk(id)

  if (!maintenance) {
    await Maintenance.create({ id, message, post_date, link, page });
    const client = discord.login(process.env.BOT_TOKEN);
    discord.sendMessage(client, discord.CHANNEL_LUCAS_ID, link);
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

exports.createBulkMaintenance = async (maintenanceListScraped) => {
  maintenanceListScraped.forEach(async (maintenance) => {
    await this.createMaintenance(maintenance)
  });
}

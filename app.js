require("dotenv").config();
const db = require("./db");
const scraper = require("./scraper");
const discord = require("./discord");
const cron = require('node-cron');

const execute = async () => {
  await db.init();

  const maintenances = await db.selectMostRecentPost();
  const { page } = maintenances[0].dataValues;
  let count = page || 1;
  const lastPage = await scraper.getTotalPages();

  while (count <= lastPage) {
    const pageData = await scraper.getMaintenancePage(count);
    const { maintenanceList, page, $ } = scraper.getAllMaintenance(pageData);
    const maintenanceListScraped = scraper.scrapeMaintenanceList(
      maintenanceList,
      page,
      $
    );

    await db.createBulkMaintenance(client, maintenanceListScraped);
    count++;
  }
};


const job = cron.schedule('*/15 * * * * *', () => {
  const client = discord.login(process.env.BOT_TOKEN);

  client.on("ready", async () => {
    await discord.sendMessage(client, discord.CHANNEL_LUCAS_ID, 'TESTE MEIA HORA! TESTADO' )
    client.destroy();
  });
  job.stop();
});


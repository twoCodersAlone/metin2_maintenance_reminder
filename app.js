(async () => { 
  const db = require("./db");
  const scraper = require('./scraper')

  await db.init();

  const maintenances = await db.selectMostRecentPost()
  const {page} = maintenances[0].dataValues
  let count = page || 1
  const lastPage = await scraper.getTotalPages()

  while (count <= lastPage) {
    const pageData = await scraper.getMaintenancePage(count);
    const { maintenanceList, page, $ } = scraper.getAllMaintenance(pageData);
    const maintenanceListScraped = scraper.scrapeMaintenanceList(maintenanceList, page, $)
    db.createBulkMaintenance(maintenanceListScraped)
    count++
  }
})();
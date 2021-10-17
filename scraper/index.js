const cheerio = require('cheerio');
const axios = require('../axios');

exports.getMaintenancePage = async (page) => {
    const { data } = await axios.get(`/index.php?thread/7228-registos-de-manutenções/&pageNo=${page}`);
    return data;
}

exports.getAllMaintenance = (pageData) => {
    const $ = cheerio.load(pageData);
    const maintenanceList = $('.messageList>li[id]');
    const page = Number($('.paginationTop li.active>span:first-child').text());

    return { maintenanceList, page, $ }
}

exports.scrapeMaintenanceList = (maintenanceList, page, $) => {
    const newMaintenanceList = []
    const regex = /\[(?<=\[)icon=.*?\]|\[\/(?<=\/)icon\]/g
    maintenanceList.each((index, maintenance) => {
        const maintenanceLi = $(maintenance)
        const id = maintenanceLi.attr('id')
        const link = maintenanceLi.children('article').attr('itemid')
        const post_date = maintenanceLi.find('time.datetime').attr('datetime')
        const message = maintenanceLi.find('div.messageText').text().replace(regex, "").trim();
        newMaintenanceList.push({ id, link, post_date, message, page })
    })
    return newMaintenanceList
}

exports.getTotalPages = async () => {
    const data = await this.getMaintenancePage(1)
    const $ = cheerio.load(data);
    const lastPage = Number($('.paginationTop>nav.pagination').attr('data-pages'))
    return lastPage
}
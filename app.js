require("dotenv").config();
const discord = require("./discord");
const db = require("./db");
const cheerio = require('cheerio');
const axios = require('./axios');


/* ## DISCORD ## 
const channelID = "897251823264595979";

const client = discord.login(process.env.BOT_TOKEN);

discord.sendMessage(client, channelID, "message");
*/

/* ## SQLite DB Connection ## 

*/

(async () => {
  await db.init();

    let count = 1

    while (count <= 30) {
        const {data} = await axios.get(`/index.php?thread/7228-registos-de-manutenções/&pageNo=${count}`);
        // console.log(data);
        const $ = cheerio.load(data);
        const maint = $('.messageList>li[id]')
        const page = Number($('.paginationTop li.active>span:first-child').text())
        // console.log(maint)
        maint.each( async (index, post) => {
            const regex = /\[(?<=\[)icon=.*?\]|\[\/(?<=\/)icon\]/g
            const postLi = $(post)
            const postID = postLi.attr('id')
            const link = postLi.children('article').attr('itemid')
            const postDate = postLi.find('time.datetime').attr('datetime')
            const message = postLi.find('div.messageText').text().replace(regex, "").trim();
            // console.log(postID, link, postDate, message, page)
            await db.createMaintenance({
                id: postID,
                message: message,
                post_date: postDate,
                link: link,
                page: page,
            });
        })

        count++
    }

  const result = await db.selectMostRecentPost();

  console.log(result);
  // await db.createMaintenance();
})();

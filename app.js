require("dotenv").config();
const discord = require("./discord");
const db = require("./db");

/* ## DISCORD ## 
const channelID = "897251823264595979";

const client = discord.login(process.env.BOT_TOKEN);

discord.sendMessage(client, channelID, "message");
*/

/* ## SQLite DB Connection ## 

*/

(async () => {
  await db.init();

  //   await db.createMaintenance({
  //     id: "post431247",
  //     message: "muita ,messages, server down 333",
  //     post_date: "2022-01-25 22:26:43.787 +00:00",
  //     link: "https://google.com",
  //     page: 20,
  //   });

  const result = await db.selectMostRecentPost();

  console.log(result);
  // await db.createMaintenance();
})();

const Discord = require("discord.js");

exports.login = (token) => {
  const client = new Discord.Client();
  client.login(token);
  return client;
};

exports.sendMessage = (client, channelID, message) => {
  client.on("ready", async () => {
    const channel = client.channels.cache.get(channelID);

    await channel.send(message);
    client.destroy();
  });  
};

exports.CHANNEL_LUCAS_ID = "899087480630960148";

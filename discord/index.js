const Discord = require("discord.js");

exports.login = (token) => {
  const client = new Discord.Client();
  client.login(token);
  return client;
};

exports.sendMessage = (client, channelID, message) => {
  client.on("ready", () => {
    const channel = client.channels.cache.get(channelID);

    channel.send(message);
  });
};

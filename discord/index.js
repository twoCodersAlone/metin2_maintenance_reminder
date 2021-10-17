const Discord = require("discord.js");

exports.login = (token) => {
  const client = new Discord.Client();
  client.login(token);
  return client;
};

exports.sendMessage = async (client, channelID, message) => {
  const channel = client.channels.cache.get(channelID);
  await channel.send(message);
};

exports.CHANNEL_LUCAS_ID = "899121770395754536";

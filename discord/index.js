const Discord = require("discord.js");
const { format } = require("date-fns");

exports.login = (token) => {
  const client = new Discord.Client();
  client.login(token);
  return client;
};

exports.sendEmbedMessage = async (client, channelID, message) => {
  await client.channels.cache.get(channelID).send({ embed: message });
};

exports.generateEmbedMessage = ({ post_date, link, message }) => {
  const customEmbedMessage = new Discord.MessageEmbed()
    .setColor("#0159A1")
    .setTitle(`**AVISO:** ${format(new Date(post_date), "dd-MM-yyyy, hh:mm")}`)
    .setURL(link)
    .setAuthor(
      "FoxBrave - Manutenção Metin2",
      "https://drive.google.com/uc?id=18APeVm5ZiAd3iqPam34k_5ABuOwfFB54"
    )
    .setDescription("\n\n" + message + "\n\n")
    .setThumbnail(
      "https://drive.google.com/uc?id=1iFZD_fgiNjO7tQKt6LgQTKkz7xxACRwS"
    )
    .setTimestamp()
    .setFooter(
      "Copyright ©2021 | Powered by Hurriken",
      "https://drive.google.com/uc?id=18APeVm5ZiAd3iqPam34k_5ABuOwfFB54"
    );

  return customEmbedMessage;
};

exports.CHANNEL_LUCAS_ID = "899121770395754536";

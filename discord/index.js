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
      "https://lh4.googleusercontent.com/BwYZUli2h5bor9RFgewuenc4rLtme9pjeDBICUszTqYK7n8pFQNxCbvKrVZwNz5wLLHmsEt2XcEbRqQWDqW-=w1920-h937"
    )
    .setDescription(message)
    .setThumbnail(
      "https://lh5.googleusercontent.com/f3dryRtQc7SojynhAQlpg9w_tiZBAes6jdKhg0Jjgp1OF2Vzh97xSO0nbqCwlz1UEJKv5ySXZu6fX86e4oK6=w1920-h937"
    )
    .setTimestamp()
    .setFooter(
      "Copyright ©2021 Todos os direitos reservados | Powered by Hurriken",
      "https://lh4.googleusercontent.com/BwYZUli2h5bor9RFgewuenc4rLtme9pjeDBICUszTqYK7n8pFQNxCbvKrVZwNz5wLLHmsEt2XcEbRqQWDqW-=w1920-h937"
    );

  return customEmbedMessage;
};

exports.CHANNEL_LUCAS_ID = "899121770395754536";

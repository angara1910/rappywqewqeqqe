const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('» Rappy | Davet')
	.addField('» Davet Linki', 'https://discordapp.com/oauth2/authorize?client_id=537703143065255957&scope=bot&permissions=2146958847')
    .setColor(23800)
    .setDescription('')
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pre-mod'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Dene Gör.',
  usage: 'davet'
};

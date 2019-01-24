const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('» Rappy Anti-Spam')
	.addField('» Anti Spam Nasıl Açılır', 'Selam Anti-Spam Yani Bot Saldırısı Koruması, Botu Sunucuya Ekledinizde Otomatik Olarak Açılır **r!davet** Bütün Komutlar 1 hafta icinde aktif olucaktır.')
    .setColor(23800)
    .setDescription('')
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['anti-spam'],
  permLevel: 0
};

exports.help = {
  name: 'antispam',
  description: 'Dene Gör.',
  usage: 'antispam'
};

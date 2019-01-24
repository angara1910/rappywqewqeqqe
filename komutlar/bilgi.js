const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**» Bilgi Özelden Verilmez :x:!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('» Bot Bilgileri')
	.addField('» Bot Sürüm', '**v0**')
	.addField('» Yapımcı', '<@449812686457274390>')
	.addField('» Yapım Tarihi : ', '**2019**')
	.addField('» Son Günçelleme', '**23.1.2019 Tarihinde Günçellenmiştir.**')
    .setColor(23800)
    .setDescription('')
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Dene Gör.',
  usage: 'bilgi'
};

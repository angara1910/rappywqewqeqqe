const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor("Hata")
    .setDescription('Bu Komutu Özel Mesajlarda Kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
  if(!message.guild.iconURL) return message.channel.sendEmbed(new Discord.RichEmbed().setColor("RANDOM").setAuthor("Hata").setDescription("Bu Sunucunun Resmi Yok"))
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor(message.guild.name)
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription('Sunucu Resmi')
		.setImage(`${message.guild.iconURL} `)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-pp'],
  permLevel: 0
};

exports.help = {
  name: 'sunucuresmi',
  description: 'Sunucunun Resmini Atar',
  usage: 'sunucuresmi'
};

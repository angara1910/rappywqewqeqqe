const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require("moment");
require("moment-duration-format");


exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**» Botun İstatistikleri Özelden Verilmez :x:!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
	  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
	   const ayarlar = message.client.emojis.get("483620661143535616");
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('Rappy | İstatistik')
	  .addField(`${ayarlar} ❯ Bellek Kullanımı`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
	  .addField(`${ayarlar} ❯ Ping ve Çalışma Süresi`, `• Çalışma Süresi ${duration}\n• Ping ${client.ping}`)
	  .addField(`${ayarlar} ❯ Sunucu Verileri`, `• Botun Bulunduğu Sunucular ${client.guilds.size.toLocaleString()}\n• Kullanıcılar ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
	  .addField(`${ayarlar} ❯ Versiyonlar`, `• Node ${process.version}\n• Bot Versiyon 0 `)
    .addField(`${ayarlar} ❯ Yapımcı`, `<@449812686457274390> `)
    .setDescription('')
    .setColor('RANDOM')
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistik gösterir.',
  usage: 'istatistik'
}

const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor('Hata')
    .setDescription('Bunun İçin Mesaj Yazman Gerek')
    .setFooter('Rappy')
    .setTimestamp())
    message.delete();
    
    const embed = new Discord.RichEmbed()
    .setAuthor('Duyuru')
    .setColor("RANDOM")
    .setDescription(`${mesaj}`)
    .setTimestamp()
    .setFooter('Rappy')
    message.delete()
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuryap', 'duyur'],
  permLevel: 3
};

exports.help = {
  name: 'duyuru',
  description: 'Kanalda Bir Duyuru Yapar.',
  usage: 'duyuru [yazı]'
}
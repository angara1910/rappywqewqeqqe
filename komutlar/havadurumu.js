const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
    if (!args[0]) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setAuthor(`Hata`)
            .setDescription('Bir Şehir Girin')
            .setColor("RANDOM"))
    
    const konum = args.join(" ")
    const embed = new Discord.RichEmbed()
    .setAuthor(`Şehir: ${konum}`)
    .setImage(`http://wttr.in/${konum}_0tqp_lang=tr.png`)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send(embed)
    return
    }
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hava', 'hava-durumu', 'havabilgisi', 'hava-bilgisi', 'weather', 'weatherforecast'],
    permLevel: 0
}

exports.help = {
    name: 'havadurumu',
    description: 'Yazılan Konumun Hava Durumunu Gönderir.',
    usage: 'havadurumu <konum>'
}
const Discord = require('discord.js')
const id = '449812686457274390'

exports.run = (client, message, args) => {
    const bildiri = args.join(" ")
    if (!args[0]) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setDescription(`Geçerli Bir Tavsiye Yazın`)
            .setAuthor("Hata")
            .setTimestamp()
            .setColor("RANDOM"))
    
    const embed = new Discord.RichEmbed()
        .setDescription(`Tavsiyeniz Bot Geliştiricisine İletilmiştir`)
        .setTimestamp()
        .setAuthor("Başarılı")
        .setColor("RANDOM")
    message.channel.send({embed})
    
    message.channel.createInvite({maxAge: 0}).then(async (invite) => {
        const embed = new Discord.RichEmbed()
            .addField(`Bildiren Kişi`, message.author.tag)
            .addField(`Bildirinin Yapıldığı Sunucu`, message.guild.name)
            .addField(`Bildirinin Yapıldığı Sunucunun Davet Linki`, invite.url)
            .addField(`Bildiri`, bildiri)
            .setColor("RANDOM")
            .setTimestamp()
        client.users.get(id).send({embed})
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rapor', 'raporla', 'tavsiye', 'tavsiyeet', 'tavsiyet', 'öner', 'öneri', 'bildir'],
    permLevel: 0
}

exports.help = {
    name: 'tavsiye',
    description: 'Bot Geliştiricisine Yazdığınız Tavsiyeyi Gönderir.',
    usage: 'tavsiye [tavsiye]'
}
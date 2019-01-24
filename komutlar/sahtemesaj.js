const Discord = require('discord.js');

exports.run = function (client, message, args) {
    let kişi = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed().setAuthor("Hata").setColor("RANDOM").setDescription("Yazmam İçin Birini Etiketleyin"))
    let yazi = args.join(" ")
    if (!yazi) return message.channel.sendEmbed(new Discord.RichEmbed().setColor("RANDOM").setAuthor("Hata").setDescription("Yazı Yazınız"))
    message.delete()
    message.channel.createWebhook(kişi.username, kişi.avatarURL)
    .then(webhook => webhook.edit(kişi.username, kişi.avatarURL)
        .then(wb => {
            const hook = new Discord.WebhookClient(wb.id, wb.token);
            hook.send(yazi)
            hook.delete()
        })
        .catch(console.error))
        .catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'sahtemesaj',
    description: 'Başkası Adına Mesaj Göndermiş Gibi Yapar',
    usage: 'sahtemesaj <@kişi> <yazı>'
};
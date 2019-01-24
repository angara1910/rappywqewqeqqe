exports.run = async (client, msg, args) => {
  const Discord=require("discord.js")
if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: (":no_entry_sign: Yetkin yok!")
}})
 const deleteCount = parseInt(args[0], 10); 
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return msg.channel.send({embed: {
  color: Math.floor(Math.random() * (0xFFFFFF + 1)),
  description: (":no_entry_sign: 1 ile 100 arasında bir değer girmelisin!")
      }});
    msg.channel.bulkDelete(deleteCount).catch(function(err){console.log(err)})
      .then(msg.channel.send({embed: {
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      timestamp: new Date(),
      footer: {
        icon_url: "https://mediacdns.karnaval.com/media/show_media/144/thumb_1000x1000.jpg?v=121016043538",
        text: client.user.username+" | Bu mesaj kendini 10 saniye içinde silecek!"
      },
     thumbnail: {
        url: `${msg.author.avatarURL}`
      },
      author: {
        name: `@${msg.author.username}#${msg.author.discriminator}`
      },
      fields: [
        {
          name: "Silen kişi",
          value: msg.author.tag,
          inline: true
        },
        {
          name: "Silinen mesaj sayısı",
          value: deleteCount,
          inline: true
        }
      ]
    }
  }).then(msg => msg.delete(10000)))
}

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['clear', 'temizle', 'purge'],
   permLevel: 0
 };

 exports.help = {
   name: 'temizle',
   description: 'Sunucu bilgisini söyler.',
   usage: 'sunucubilgi'
 };
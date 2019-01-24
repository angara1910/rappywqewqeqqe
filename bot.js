const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const music = require('discord.js-music-v11');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const antispam = require("discord-anti-spam");
const YouTube = require('simple-youtube-api');
const { token, GOOGLE_API_KEY } = require('./ayarlar');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};




//////////////////////////////////////////////////////////////



antispam(client, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Merhaba, Spam yapmaya devam etmesen sevinirim, devam edersen sunucudan atılacaksın.", // Warning message send to the user indicating they are going to fast.
    banMessage: " adlı Kişi Sunucuda spam yaptığı icin uzaklaştırıldı", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 5, // Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 7, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
    deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
});




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
	log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
}; 






client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} kullanıcıya ulaştık! Sayaç sıfırlandı!`)
                .setColor(ayarlar.renk)
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})






client.on("message", (message) => {

   if (message.content.toLowerCase() === prefix + "yardım") {

    const yardım = new Discord.RichEmbed()
    .setTitle(`Rappy | Yardım Menüsü`)
    .setColor(0xCF40FA)
    .addField(`Selam! ben bu sunucuda size yardım etmek için bulunuyorum`, `**[1]** r!antispam > AntiSpam Spam Ve Bot Saldırısını Önler. \n**[2]** r!öp > Seçtiniz bir partnerinizle öpüşürsünüz. \n**[3]** r!temizle > Sohbeti Seçtiniz miktarda siler. \n**[4]** r!aşkölçer > Seçtiniz Kişiyle aranızdaki aşkı sevgiyi ölçer. \n**[5]** r!sunucubilgi > Sunucu Hakkında bilgi verir (BAKIMDA) \n**[6]** r!bilgi > Bot hakında bilgi verir. \n**[7]** r!havadurumu > Yazdınız şehrin havadurumunu sunar. \n**[8]** r!davet > Bot un Davet linkini size sunar. \n**[9]** r!tavsiye > Yapımcıya yani bana tavsiyelerinizi gönderir. \n**[10]** r!istatistik > Bot un istatistiklerini sunar.`)
    .addField(`Yakkında bütün komutlar aktif `, `**r!davet**  \n**By** **İngiltereli**`);  
    message.channel.send(yardım);
}
});



// Sunucuya birisi girdiği zaman mesajı yolluyalım

client.on("guildMemberAdd", async member => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    const channel = member.guild.channels.find("name", "sayaç")
    channel.send(`:inbox_tray: **| ${member.user.tag}** Katıldı ${sayac[member.guild.id].sayi} olmamıza son ${sayac[member.guild.id].sayi - member.guild.members.size} kişi Kaldı! :tada:`)
})

client.on("guildMemberRemove", async member => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    const channel = member.guild.channels.find("name", "sayaç")
    channel.send(`:outbox_tray: **| ${member.user.tag}** Ayrıldı ${sayac[member.guild.id].sayi} olmamıza son ${sayac[member.guild.id].sayi - member.guild.members.size} Kişi Kaldı! :tada:`)
})

client.on('message', msg => {
    if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam hoşgeldin.');
	
  }
    if (msg.content.toLowerCase() === 'Selamın aleyküm') {
    msg.reply('`Aleyküm selam hoşgeldin.`');
   
  }
});



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.psahip) permlvl = 5;
  if (message.author.id === ayarlar.psahip2) permlvl = 6;
  if (message.author.id === ayarlar.psahip3) permlvl = 7;
  if (message.author.id === ayarlar.psahip4) permlvl = 8;
  if (message.author.id === ayarlar.psahip5) permlvl = 9;
  if (message.author.id === ayarlar.psahip6) permlvl = 10;  
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);

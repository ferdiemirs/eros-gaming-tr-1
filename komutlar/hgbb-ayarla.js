const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (bot, message,args) => {
  
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`:no_entry_sign: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let kanal = message.mentions.channels.first();
let kontrol = await db.fetch(`yazilihgbb_${message.guild.id}`)
  
  if (args[0] === "kapat") {
    if(!kontrol) return message.channel.send(`:no_entry:  Yazılı HGBB kapatmak için **Yazılı HGBB kanalının** seçili olması lazım. Kullanım: \`!yazılı-hgbb #kanal\``);
    
   db.delete(`yazilihgbb_${message.guild.id}`)
   message.channel.send(`:white_check_mark: Yazılı HGBB başarıyla kapatıldı.`);
  
    return
  }
  
if (!kanal) return message.channel.send( ":no_entry:  Doğru bir kanal girmelisiniz, Kullanım `!yazılı-hgbb #kanal`");
 

   db.set(`yazilihgbb_${message.guild.id}`, kanal.id)
db.set(`m_${message.guild.id}`,"acik")
message.channel.send(`:white_check_mark: Yazılı HGBB kanalı ${kanal} olarak ayarlandı.`);

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'yazılı-hgbb',
  description: 'Ping Was Here',
  usage: '!yazılı-hgbb #kanal'
};
 
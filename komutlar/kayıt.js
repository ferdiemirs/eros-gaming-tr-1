const Discord = require('discord.js');
 
exports.run = async (client, message, args) => {
if(message.member.roles.some(rol => rol.id === '643539395584196620')){
  let kisi = message.guild.member(message.mentions.users.first());
let profil = args.slice(2).join(' ');
let cinsiyet = args[1]
   
let erkek = message.guild.roles.get('643529607081099265');   
let kız = message.guild.roles.get('643529519541649418');   
let al = message.guild.roles.get('643529727050645517');
  
    

if(!kisi) return message.channel.send(':x: Birini etiketlemelisiniz!');
if(!cinsiyet) return message.channel.send(':x: Doğru bir cinsiyet seçmelisin!');
if(!profil) return message.channel.send(':x: İsim ve yaş girmeyi unuttunuz!');
  
  
if(cinsiyet === 'erkek'){
   kisi.removeRole(al);
kisi.setNickname(`⌽ ${profil}`);
await kisi.addRole(erkek);
   message.channel.send('✅ Kayıt **erkek** olarak tamamlandı!');
}
  if(cinsiyet === 'kız'){
    kisi.removeRole(al);
   await kisi.addRole(kız);
message.channel.send('✅ Kayıt **kız** olarak tamamlandı!');
}
}else {
  
  message.channel.send('🚫 Yetersiz yetki!');
  
   }}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kayıt',
  description: '',
  usage: ''
};

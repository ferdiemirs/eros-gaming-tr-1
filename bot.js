const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`[EROS] Açık tutuyorum...`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

const erosDiscord = require('discord.js');
const client = new erosDiscord.Client();
const chalk = require('chalk');
const fs = require('fs');
const db = require("quick.db")
const moment = require('moment');
require('./util/eventLoader')(client);

//////////////////////////////////////////////
client.ayarlar = {
"durum":"dnd",//online , idle , dnd 
"oynuyor":"kayıt",
"prefix":".",
"sahip":"297692103947845634",
"token":"NjQ0NTQzNzYxNjQwMzI1MTkx.Xc2Gtw.QeZmKDgaJ0AHNLuUA1bYlwX1zwA"
}
/////////////////////////////////////////////

const kurulum = message => {
  console.log(`Kurulum: ${message}`);
};

client.commands = new erosDiscord.Collection();
client.aliases = new erosDiscord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  kurulum(`${files.length} komut kurulacak.`);
   kurulum(`-------------------------`);
   files.forEach(f => {
    let pingKodları = require(`./komutlar/${f}`);
  
    kurulum(`Kurulan komut ~ ${pingKodları.help.name}.`);
    client.commands.set(pingKodları.help.name, pingKodları); 
    kurulum(`-------------------------`);
    client.commands.set(pingKodları.help.name, pingKodları);
    pingKodları.conf.aliases.forEach(alias => {
    client.aliases.set(alias, pingKodları.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let pingDosya = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, pingDosya);
      pingDosya.conf.aliases.forEach(alias => {
        client.aliases.set(alias, pingDosya.help.name);
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

client.elevation = message => {
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var hataKontrol = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


client.on("error", e => {
console.log("[EROS] Hata oluştu!");
});

client.on("disconnect", e => {
  console.log("[EROS] Botun bağlantısı kaybedildi!");
});

///////KURULUM KISMI SON//////////


//// YAZILI GIRIS CIKIS BASLANGIC ////
client.on('guildMemberAdd', async member => {
let mkanal = client.channels.get(db.fetch(`yazilihgbb_${member.guild.id}`)) 
if(member.user.bot === true) return;
mkanal.send(` **${member.user.username}** sunucuya katıldı, oleyyy.`);
})
client.on('guildMemberRemove', async member => {
let mkanal = client.channels.get(db.fetch(`yazilihgbb_${member.guild.id}`)) 
 if(member.user.bot === true) return;
mkanal.send(`**${member.user.username}** suncudan ayrıldı, puffff.`);
});
//// YAZILI GIRIS CIKIS SON ////

//// OTOROL BASLANGIC ////

client.on("guildMemberAdd", async member => {
  if (member.user.bot === true) return;
  let rolisim = await db.fetch(`otorolisim_${member.guild.id}`);
  let kanal = db.fetch(`otorolKanal_${member.guild.id}`);
  let rolid = await db.fetch(`otorol_${member.guild.id}`);
  let bilgiKanal = client.channels.get(kanal)
    bilgiKanal.send(`:new: \`${member.user.tag}\` adlı kullanıcıya **${rolisim}** adlı rol verildi.` );
   member.addRole(rolid);
});

//// OTOROL SON ////

//// GUVENLIK SISTEMI BASLANGIC ///

client.on("guildMemberAdd", async member => {
  let gkisi = client.users.get(member.id);
  let gkanal = client.channels.get(db.fetch(`guard_${member.guild.id}`));
  let onaylı = `:ballot_box_with_check:  ${member},  **Güvenlik** sistemine takılmadı.`
  let onaysız = `:x: ${member}, **Güvenlik** sistemine takıldı!`

  const ktarih = new Date().getTime() - gkisi.createdAt.getTime();
  var kontrol;
  if (ktarih > 1296000000) kontrol = onaylı;
  if (ktarih < 1296000001) kontrol = onaysız;
  gkanal.send(kontrol);
});

//// GUVENLIK SISTEMI SON ////
client.login(client.ayarlar.token); 
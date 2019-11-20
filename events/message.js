let erosWasHere= new Set();
module.exports = message => {
  if (erosWasHere.has(message.author.id)) {
    return;
  }
  erosWasHere.add(message.author.id);
  setTimeout(() => {
    pingWasHere.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.ayarlar.prefix)) return;
  let komut = message.content.split(" ")[0].slice(client.ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let erosYetkileri = client.elevation(message);
  var erosEsya;

  if (client.commands.has(komut)) {
    erosEsya = client.commands.get(komut);
  } else if (client.aliases.has(komut)) {
    erosEsya = client.commands.get(client.aliases.get(komut));
  }
  if (erosEsya) {
    if (erosYetkileri < erosEsya.conf.permLevel) return;
    erosEsya.run(client, message, params, erosYetkileri);
  }
};

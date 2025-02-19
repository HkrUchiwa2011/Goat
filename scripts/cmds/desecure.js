module.exports = {
  config: {
    name: "desecure",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 2,
    shortDescription: "Désécuriser une banque",
    longDescription: "L'admin peut rendre une banque vulnérable au hacking.",
    category: "hacking",
    guide: "{p}desecure [UID]"
  },

  onStart: async function ({ message, event, args }) {
    const adminID = "61563822463333";
    if (event.senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

    let securedBanks = JSON.parse(fs.readFileSync("./secured_banks.json"));
    delete securedBanks[args[0]];
    fs.writeFileSync("./secured_banks.json", JSON.stringify(securedBanks, null, 2));

    message.reply(`⚠️ La banque de ${args[0]} est maintenant vulnérable !`);
  }
};
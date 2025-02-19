module.exports = {
  config: {
    name: "secure",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 2,
    shortDescription: "Sécuriser une banque",
    longDescription: "L'admin peut sécuriser une banque pour la protéger du hacking.",
    category: "hacking",
    guide: "{p}secure [UID]"
  },

  onStart: async function ({ message, event, args }) {
    const adminID = "61563822463333";
    if (event.senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

    let securedBanks = JSON.parse(fs.readFileSync("./secured_banks.json"));
    securedBanks[args[0]] = true;
    fs.writeFileSync("./secured_banks.json", JSON.stringify(securedBanks, null, 2));

    message.reply(`🔒 La banque de ${args[0]} est maintenant sécurisée !`);
  }
};
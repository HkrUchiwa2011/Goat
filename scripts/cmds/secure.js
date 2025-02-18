module.exports = {
  config: {
    name: "secure",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 1,
    shortDescription: "Sécuriser une banque",
    longDescription: "L'admin peut protéger la banque d'un utilisateur contre le piratage.",
    category: "économie",
    guide: "{p}secure [UID]"
  },

  onStart: async function ({ args, message, event }) {
    const senderID = event.senderID;

    if (senderID !== "61563822463333") {
      return message.reply("❌ Seul l'admin peut sécuriser une banque !");
    }

    if (!args[0]) return message.reply("🔍 Tapez `/secure [UID]` pour protéger une banque.");

    const targetID = args[0];
    let bankData = {};
    if (fs.existsSync("balance.json")) {
      bankData = JSON.parse(fs.readFileSync("balance.json"));
    }

    if (!bankData[targetID]) return message.reply("❌ Cet utilisateur n'a pas de compte bancaire !");
    
    bankData[targetID].secured = true;
    fs.writeFileSync("balance.json", JSON.stringify(bankData, null, 2));

    return message.reply(`🛡️ **La banque de ${targetID} est maintenant protégée contre le piratage !**`);
  }
};
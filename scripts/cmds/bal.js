const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
  config: {
    name: "bal",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Voir son solde",
    longDescription: "Affiche l'argent en main de l'utilisateur.",
    category: "économie",
    guide: "{p}bal"
  },

  onStart: async function ({ message, event }) {
    const userID = event.senderID;
    let bankData = {};

    if (fs.existsSync(balanceFile)) {
      bankData = JSON.parse(fs.readFileSync(balanceFile));
    }

    if (!bankData[userID]) {
      bankData[userID] = { cash: 0, bank: 0 };
      fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
    }

    message.reply(`💰 **Solde actuel :**\n👜 En main : ${bankData[userID].cash} 💸\n🏦 En banque : ${bankData[userID].bank} 🏦`);
  }
};
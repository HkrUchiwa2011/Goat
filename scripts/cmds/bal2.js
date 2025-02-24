 const fs = require("fs");

module.exports = {
  config: {
    name: "bal2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Voir le solde d'un utilisateur",
    longDescription: "Permet de voir le solde d'un utilisateur en spécifiant son UID. Seul l'admin peut utiliser cette commande.",
    category: "économie",
    guide: "{p}bal2 <uid>"
  },

  onStart: async function ({ message, args, event, usersData, api }) {
    const ownerID = "61563822463333";

    if (event.senderID !== ownerID) {
      return api.sendMessage("Seul **L'Uchiha Perdu** peut utiliser cette commande, ducon !", event.threadID, event.messageID);
    }

    const balanceFile = "balance.json";
    if (!fs.existsSync(balanceFile)) {
      return message.reply("❌ Le fichier des soldes n'existe pas.");
    }

    const bankData = JSON.parse(fs.readFileSync(balanceFile));
    const targetUID = args[0];

    if (!targetUID) {
      return message.reply("❌ Tu dois spécifier l'UID de l'utilisateur.");
    }

    if (!bankData[targetUID]) {
      return message.reply("❌ Cet utilisateur n'a pas de compte.");
    }

    const userBalance = bankData[targetUID].cash || 0;
    const userName = await usersData.getName(targetUID);

    message.reply(`💰 **Solde de ${userName}**\n\n💵 Argent en main : ${userBalance} $`);
  }
};
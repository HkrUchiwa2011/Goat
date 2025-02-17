const fs = require("fs");

module.exports = {
  config: {
    name: "bal",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 3,
    role: 0,
    shortDescription: { en: "Affiche le solde d'argent liquide" },
    description: { en: "Affiche le montant d'argent liquide d'un utilisateur" },
    category: "💰 Banque",
    guide: { en: "/bal" }
  },

  onStart: async function ({ api, event }) {
    const userID = event.senderID;
    const filePath = "./balance.json";
    let users = {};

    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath));
    }

    if (!users[userID]) {
      users[userID] = { balance: 0 };
    }

    api.sendMessage(`💵 Votre solde liquide est de **${users[userID].balance}$**.`, event.threadID);
  }
};
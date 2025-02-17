const fs = require("fs");

module.exports = {
  config: {
    name: "bank2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 2, // Seuls les administrateurs peuvent l'utiliser
    shortDescription: { en: "Accéder à la banque d'un autre utilisateur" },
    description: { en: "Permet à un utilisateur de gérer la banque d'un autre utilisateur" },
    category: "💰 Admin",
    guide: { en: "/bank2 solde <uid> <mot de passe>" }
  },

  onStart: async function ({ api, args, event }) {
    const userID = event.senderID;
    const allowedAdmins = ["61563822463333"]; // UID de l'admin autorisé

    if (!allowedAdmins.includes(userID)) {
      return api.sendMessage("❌ Vous n'avez pas l'autorisation d'utiliser cette commande. 🚫", event.threadID);
    }

    const filePath = "./bank.json";
    let banks = {};

    if (fs.existsSync(filePath)) {
      banks = JSON.parse(fs.readFileSync(filePath));
    }

    const targetID = args[0];
    const password = args[1];

    if (!banks[targetID]) {
      return api.sendMessage("❌ Utilisateur introuvable. Impossible d'accéder à sa banque. 😢", event.threadID);
    }

    if (banks[targetID].password !== password) {
      return api.sendMessage("❌ Mot de passe incorrect. Accès refusé. 🔒", event.threadID);
    }

    const messages = [
      `💰 Le solde de la banque de <@${targetID}> est de **${banks[targetID].balance}$**. 🏦`,
      `💸 **${banks[targetID].balance}$** dans le compte de <@${targetID}>. Espérons qu'ils n'en aient pas besoin tout de suite ! 😉`,
      `🔐 Accès réussi à la banque de <@${targetID}>. Le solde actuel est de **${banks[targetID].balance}$**. 🤑`,
      `🎉 Oops, vous avez débloqué **${banks[targetID].balance}$** de la banque de <@${targetID}>. Bien joué ! 👏`
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    api.sendMessage(randomMessage, event.threadID);
  }
};
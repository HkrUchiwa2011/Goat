const fs = require("fs");

module.exports = {
  config: {
    name: "retire2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 2, // Seuls les administrateurs peuvent l'utiliser
    shortDescription: { en: "Retirer de l'argent de la banque" },
    description: { en: "Permet à l'admin de retirer de l'argent de la banque d'un utilisateur" },
    category: "💰 Admin",
    guide: { en: "/retire2 <montant> <uid>" }
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

    const amount = parseInt(args[0]);
    const targetID = args[1];

    if (isNaN(amount) || amount <= 0 || !targetID) {
      return api.sendMessage("❌ Format invalide. Utilisation : /retire2 <montant> <UID>", event.threadID);
    }

    if (!banks[targetID]) {
      return api.sendMessage("❌ Utilisateur introuvable. Pas de retrait possible. 😬", event.threadID);
    }

    if (banks[targetID].balance < amount) {
      return api.sendMessage("❌ Montant supérieur au solde bancaire de l'utilisateur. 😔", event.threadID);
    }

    banks[targetID].balance -= amount;
    fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));

    const messages = [
      `🏦 **${amount}$** ont été retirés de la banque de <@${targetID}>. Les voilà dans ton trésor ! 💸`,
      `💰 **${amount}$** ont quitté la banque de <@${targetID}>. Bientôt une fête ! 🎉`,
      `🔒 **${amount}$** extraits de la banque de <@${targetID}>. C'est tout pour toi maintenant. 🤑`,
      `💸 Oops ! **${amount}$** retirés de la banque de <@${targetID}>. Ça va faire mal ! 😈`,
      `🏦 **${amount}$** retirés, et il n'y a plus de retour en arrière pour <@${targetID}>. 😜`,
      `💥 **${amount}$** se sont échappés de la banque de <@${targetID}>. Oups ! 🤭`,
      `🤑 **${amount}$** ont disparu du compte bancaire de <@${targetID}>. Il ne le saura jamais... ou peut-être. 🤫`,
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    api.sendMessage(randomMessage, event.threadID);
  }
};
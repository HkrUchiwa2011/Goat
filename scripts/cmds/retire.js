const fs = require("fs");

module.exports = {
  config: {
    name: "retire",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 2, // Seuls les administrateurs peuvent l'utiliser
    shortDescription: { en: "Retirer de l'argent d'un utilisateur" },
    description: { en: "Permet à l'admin de retirer de l'argent d'un utilisateur" },
    category: "💰 Admin",
    guide: { en: "/retire <montant> <uid>" }
  },

  onStart: async function ({ api, args, event }) {
    const userID = event.senderID;
    const allowedAdmins = ["61563822463333"]; // UID de l'admin autorisé

    if (!allowedAdmins.includes(userID)) {
      return api.sendMessage("❌ Vous n'avez pas l'autorisation d'utiliser cette commande. 🚫", event.threadID);
    }

    const filePath = "./balance.json";
    let users = {};

    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath));
    }

    const amount = parseInt(args[0]);
    const targetID = args[1];

    if (isNaN(amount) || amount <= 0 || !targetID) {
      return api.sendMessage("❌ Format invalide. Utilisation : /retire <montant> <UID>", event.threadID);
    }

    if (!users[targetID]) {
      return api.sendMessage("❌ Utilisateur introuvable. Pas de retrait possible. 😬", event.threadID);
    }

    if (users[targetID].balance < amount) {
      return api.sendMessage("❌ Montant supérieur au solde de l'utilisateur. Il ne peut pas être retiré. 💸", event.threadID);
    }

    users[targetID].balance -= amount;
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    const messages = [
      `🔥 **${amount}$** ont été retirés du compte de <@${targetID}>. Que vas-tu faire avec ça ? 😏`,
      `💥 **${amount}$** retirés avec succès de <@${targetID}>. Attention, c'est toi qui est visé maintenant ! 👀`,
      `💸 Les **${amount}$** sont partis. Espérons que <@${targetID}> n'a pas trop pleuré. 😢`,
      `😎 **${amount}$** en moins dans le compte de <@${targetID}>. Une action épique ! 🔥`,
      `💔 **${amount}$** retirés de <@${targetID}>. Ça fait mal mais c'était nécessaire, non ? 😅`,
      `💰 **${amount}$** ont quitté le compte de <@${targetID}>. Il ne les reverra jamais... ou peut-être. 😏`,
      `📉 Boom ! **${amount}$** sont partis ! <@${targetID}> devra se serrer la ceinture ! 😜`,
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    api.sendMessage(randomMessage, event.threadID);
  }
};
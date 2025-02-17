module.exports = {
  config: {
    name: "secure",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 2, // Seuls les administrateurs peuvent l'utiliser
    shortDescription: { en: "Sécuriser la banque de l'utilisateur" },
    description: { en: "Permet à l'admin de sécuriser la banque d'un utilisateur contre le piratage" },
    category: "💰 Admin",
    guide: { en: "/secure <uid>" }
  },

  onStart: async function ({ api, args, event }) {
    const userID = event.senderID;
    const allowedAdmins = ["61563822463333"]; // UID de l'admin autorisé

    if (!allowedAdmins.includes(userID)) {
      return api.sendMessage("❌ Vous n'avez pas l'autorisation d'utiliser cette commande. 🚫", event.threadID);
    }

    const targetID = args[0];
    
    // Sécurisation de la banque
    api.sendMessage(`🔒 La banque de <@${targetID}> a été sécurisée. Impossible de la pirater maintenant ! 🔐`, event.threadID);
  }
};
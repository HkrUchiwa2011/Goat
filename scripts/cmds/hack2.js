module.exports = {
  config: {
    name: "hack2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 2, // Seuls les administrateurs peuvent l'utiliser
    shortDescription: { en: "Pirater la banque d'un autre utilisateur" },
    description: { en: "Permet de pirater la banque d'un autre utilisateur en trouvant son mot de passe" },
    category: "💰 Admin",
    guide: { en: "/hack2 <uid>" }
  },

  onStart: async function ({ api, args, event }) {
    const userID = event.senderID;

    // Vérifie si l'utilisateur est un hackeur
    if (!userIDIsHacker(userID)) {
      return api.sendMessage("❌ Ducon, vous n'êtes pas hackeur ! Pour le devenir tapez /hackbecome. 🧐", event.threadID);
    }

    // Logique du piratage (envois de défis de sécurité, etc.)
    // ... (factorisation et quiz)
  }
};
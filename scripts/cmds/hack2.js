module.exports = {
  config: {
    name: "hack2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Pirater la banque d'un autre utilisateur (fun)",
    longDescription: "Permet de tenter de récupérer le mot de passe bancaire d'un autre utilisateur, sauf si sa banque est sécurisée.",
    category: "fun",
    guide: "{p}hack2 [UID cible]"
  },

  onStart: async function ({ args, message, event, usersData }) {
    const senderID = event.senderID;
    const targetID = args[0];

    const adminID = "61563822463333"; // UID de l'admin (toi)

    if (!targetID) {
      return message.reply(
        "💻 **Commande Hack2 :**\n\n" +
        "🔹 `hack2 [UID]` → Tenter de pirater la banque d'un utilisateur (fun)\n" +
        "💡 **Si vous n'êtes pas hackeur, tapez `/hackbecome` pour le devenir !**"
      );
    }

    // Vérification si l'utilisateur est hackeur
    const userData = await usersData.get(senderID);
    if (!userData.hackeur) {
      return message.reply("❌ Ducon, vous n'êtes pas hackeur ! Tapez `/hackbecome` pour le devenir.");
    }

    // Récupération des données de la cible
    const targetData = await usersData.get(targetID);
    if (!targetData || !targetData.bank) return message.reply("❌ Cet utilisateur n'a pas de compte bancaire !");

    // Vérification si la banque de la cible est sécurisée
    if (targetData.bank.secure || targetID === adminID) {
      return message.reply("💻 Hacking...\n🛑 **Failed** : Cette banque est sécurisée !");
    }

    // Tentative de piratage réussie
    return message.reply(`💻 Hacking...\n✅ **Succès !** Le mot de passe de ${targetID} est **${targetData.bank.password}** !`);
  }
};
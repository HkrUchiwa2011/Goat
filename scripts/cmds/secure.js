module.exports = {
  config: {
    name: "secure",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Sécuriser une banque contre les hackeurs",
    longDescription: "Les admins peuvent sécuriser une banque pour la rendre impiratable.",
    category: "admin",
    guide: "{p}secure [UID]"
  },

  onStart: async function ({ args, message, event, usersData }) {
    const senderID = event.senderID;
    const targetID = args[0];

    const adminID = "61563822463333"; // UID de l'admin (toi)

    if (!targetID) {
      return message.reply("🔒 **Commande Secure :**\n\n🔹 `secure [UID]` → Sécuriser la banque d'un utilisateur\n🔹 **Les banques sécurisées sont impiratables !**");
    }

    // Vérification si l'utilisateur est admin
    if (senderID !== adminID) {
      return message.reply("❌ Seul l'admin peut sécuriser une banque !");
    }

    // Sécurisation de la banque
    const targetData = await usersData.get(targetID);
    if (!targetData.bank) return message.reply("❌ Cet utilisateur n'a pas de compte bancaire !");

    targetData.bank.secure = true;
    await usersData.set(targetID, targetData);

    return message.reply(`✅ **La banque de ${targetID} est maintenant sécurisée !**`);
  }
};
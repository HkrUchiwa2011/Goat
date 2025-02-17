module.exports = {
  config: {
    name: "bank2",
    version: "1.2",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Accès aux banques des autres (avec mot de passe, sauf pour l'admin)",
    longDescription: "Permet de consulter ou gérer la banque d'un autre utilisateur avec son mot de passe (sauf l'admin qui peut tout voir)",
    category: "money",
    guide: "{p}bank2 [action] [UID] [password]"
  },

  onStart: async function ({ args, message, event, usersData }) {
    const senderID = event.senderID;
    const action = args[0];
    const targetID = args[1];
    const password = args[2];

    const adminID = "61563822463333"; // UID de l'admin (toi)

    if (!action) {
      return message.reply(
        "🏦 **Commandes bancaires pour d'autres utilisateurs :**\n\n" +
        "🔹 `bank2 solde [uid] [password]` → Voir le solde bancaire de quelqu'un\n" +
        "🔹 `bank2 retirer [montant] [uid] [password]` → Retirer de l'argent de la banque d'un autre utilisateur\n" +
        "🔹 `bank2 transférer [montant] [source_uid] [dest_uid] [password]` → Transférer de l'argent d'un utilisateur à un autre\n\n" +
        "💡 **Exemple :** `bank2 solde 123456789 1234`"
      );
    }

    // Vérification des arguments
    if (!targetID) return message.reply("❌ Format incorrect ! Utilisez `bank2 [action] [UID] [password]`");

    // Récupération des données de l'utilisateur cible
    const targetData = await usersData.get(targetID);
    if (!targetData || !targetData.bank) return message.reply("❌ Cet utilisateur n'a pas de compte bancaire !");

    // Vérification du mot de passe (sauf pour l'admin)
    if (senderID !== adminID && password !== targetData.bank.password) {
      return message.reply("❌ Mot de passe incorrect !");
    }

    switch (action) {
      case "solde":
        return message.reply(`💰 **Solde bancaire de ${targetID} :** ${targetData.bank.balance}$\n💳 **Dette :** ${targetData.bank.debt}$`);

      case "retirer":
        const amount = parseInt(args[2]);
        if (isNaN(amount) || amount <= 0) return message.reply("❌ Montant invalide !");
        if (targetData.bank.balance < amount) return message.reply("❌ Fonds insuffisants !");
        targetData.bank.balance -= amount;
        await usersData.set(targetID, targetData);
        return message.reply(`✅ Vous avez retiré ${amount}$ de la banque de ${targetID}. Solde restant : ${targetData.bank.balance}$`);

      case "transférer":
        const transferAmount = parseInt(args[2]);
        const destID = args[3];
        if (!destID) return message.reply("❌ UID du destinataire manquant !");
        if (isNaN(transferAmount) || transferAmount <= 0) return message.reply("❌ Montant invalide !");
        if (targetData.bank.balance < transferAmount) return message.reply("❌ Fonds insuffisants !");

        const destData = await usersData.get(destID);
        if (!destData.bank) destData.bank = { balance: 0, debt: 0, password: null };

        targetData.bank.balance -= transferAmount;
        destData.bank.balance += transferAmount;
        await usersData.set(targetID, targetData);
        await usersData.set(destID, destData);

        return message.reply(`✅ ${transferAmount}$ ont été transférés de ${targetID} à ${destID}. Solde restant : ${targetData.bank.balance}$`);

      default:
        return message.reply("❌ Commande invalide ! Tapez `/bank2` pour voir les options disponibles.");
    }
  }
};
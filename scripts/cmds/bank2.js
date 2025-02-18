const fs = require("fs");
const balanceFile = "balance.json"; // Fichier de stockage des comptes bancaires

module.exports = {
  config: {
    name: "bank2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Accéder à la banque d'un autre utilisateur",
    longDescription: "Permet d'effectuer des opérations bancaires sur le compte d'un autre utilisateur avec son mot de passe.",
    category: "économie",
    guide: "{p}bank2 [sous-commande] [UID] [mot de passe]"
  },

  onStart: async function ({ args, message, event }) {
    const senderID = event.senderID;

    // Chargement des comptes bancaires
    let bankData = {};
    if (fs.existsSync(balanceFile)) {
      bankData = JSON.parse(fs.readFileSync(balanceFile));
    }

    // Si l'utilisateur tape juste "/bank2", afficher les sous-commandes
    if (!args[0]) {
      return message.reply(
        "🏦 **Commande Bank2 :**\n\n" +
        "💳 **Solde** → Voir le solde d'un autre utilisateur\n" +
        "🔁 **Transférer** → Envoyer de l'argent d'un compte à un autre\n" +
        "💸 **Retirer** → Retirer de l'argent d'un compte\n\n" +
        "⚠️ **Vous devez connaître le mot de passe de la personne pour utiliser ces commandes !**"
      );
    }

    const command = args[0].toLowerCase();
    const targetID = args[1];

    // Vérifier si l'utilisateur cible a un compte bancaire
    if (!bankData[targetID]) {
      return message.reply("❌ Cet utilisateur n'a pas de compte bancaire !");
    }

    // Vérifier si le mot de passe est fourni
    if (!args[2]) return message.reply("🔑 Veuillez entrer le mot de passe du compte : `/bank2 [commande] [UID] [mot de passe]`");

    // Vérifier si le mot de passe est correct
    if (args[2] !== bankData[targetID].password) return message.reply("❌ Mot de passe incorrect !");

    switch (command) {
      case "solde":
        return message.reply(`💰 **Solde bancaire de ${targetID} :** ${bankData[targetID].balance} 🪙`);

      case "retirer":
        if (!args[3]) return message.reply("🔑 Veuillez entrer le montant à retirer : `/bank2 retirer [UID] [mot de passe] [montant]`");
        let withdrawAmount = parseInt(args[3]);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) return message.reply("❌ Montant invalide !");
        if (withdrawAmount > bankData[targetID].balance) return message.reply("❌ Fonds insuffisants !");
        bankData[targetID].balance -= withdrawAmount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez retiré ${withdrawAmount} 🪙 du compte de ${targetID} !`);

      case "transférer":
        if (!args[3] || !args[4]) return message.reply("🔑 Veuillez entrer : `/bank2 transférer [UID source] [UID destination] [mot de passe] [montant]`");
        let receiverID = args[3];
        let transferAmount = parseInt(args[4]);
        if (!bankData[receiverID]) return message.reply("❌ Le destinataire n'a pas de compte bancaire !");
        if (isNaN(transferAmount) || transferAmount <= 0) return message.reply("❌ Montant invalide !");
        if (transferAmount > bankData[targetID].balance) return message.reply("❌ Fonds insuffisants !");
        bankData[targetID].balance -= transferAmount;
        bankData[receiverID].balance += transferAmount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ ${transferAmount} 🪙 ont été transférés de ${targetID} à ${receiverID} !`);

      default:
        return message.reply("❌ Commande inconnue ! Tapez `/bank2` pour voir les options disponibles.");
    }
  }
};
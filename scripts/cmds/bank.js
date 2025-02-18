const fs = require("fs");
const balanceFile = "balance.json"; // Fichier de stockage des comptes bancaires

module.exports = {
  config: {
    name: "bank",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Accéder à votre banque",
    longDescription: "Permet de gérer votre compte bancaire avec différentes options.",
    category: "économie",
    guide: "{p}bank [sous-commande] [options]"
  },

  onStart: async function ({ args, message, event }) {
    const senderID = event.senderID;

    // Chargement des comptes bancaires
    let bankData = {};
    if (fs.existsSync(balanceFile)) {
      bankData = JSON.parse(fs.readFileSync(balanceFile));
    }

    // Si l'utilisateur tape juste "/bank", afficher les sous-commandes
    if (!args[0]) {
      return message.reply(
        "🏦 **Commande Bank :**\n\n" +
        "💰 **Prêt** → Emprunter de l'argent (limite : 1 000 000)\n" +
        "💳 **Solde** → Voir votre solde\n" +
        "🔁 **Transférer** → Envoyer de l'argent à un autre utilisateur\n" +
        "📉 **Dette** → Voir votre dette\n" +
        "💸 **Rembourser** → Rembourser une partie de votre dette\n" +
        "🔑 **Password** → Définir un mot de passe bancaire\n" +
        "🔄 **Setpassword** → Réinstaller votre mot de passe\n\n" +
        "⚠️ **Toutes les actions nécessitent un mot de passe !**"
      );
    }

    const command = args[0].toLowerCase();

    // Vérifier si l'utilisateur a un compte bancaire
    if (!bankData[senderID]) {
      bankData[senderID] = { balance: 0, debt: 0, password: null };
      fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
    }

    // Gestion des commandes spécifiques
    switch (command) {
      case "solde":
        if (!args[1]) return message.reply("🔑 Veuillez entrer votre mot de passe : `/bank solde [mot de passe]`");
        if (args[1] !== bankData[senderID].password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`💰 **Votre solde bancaire :** ${bankData[senderID].balance} 🪙`);

      case "prêt":
        if (!args[1]) return message.reply("🔑 Veuillez entrer votre mot de passe : `/bank prêt [montant] [mot de passe]`");
        if (args[2] !== bankData[senderID].password) return message.reply("❌ Mot de passe incorrect !");
        let loanAmount = parseInt(args[1]);
        if (isNaN(loanAmount) || loanAmount <= 0) return message.reply("❌ Montant invalide !");
        if (bankData[senderID].debt >= 1000000) return message.reply("❌ Vous avez atteint la limite de prêt (1 000 000) ! Remboursez d'abord.");
        bankData[senderID].debt += loanAmount;
        bankData[senderID].balance += loanAmount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez emprunté ${loanAmount} 🪙 !`);

      case "dette":
        if (!args[1]) return message.reply("🔑 Veuillez entrer votre mot de passe : `/bank dette [mot de passe]`");
        if (args[1] !== bankData[senderID].password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`📉 **Votre dette actuelle :** ${bankData[senderID].debt} 🪙`);

      case "rembourser":
        if (!args[1]) return message.reply("🔑 Veuillez entrer votre mot de passe : `/bank rembourser [montant] [mot de passe]`");
        if (args[2] !== bankData[senderID].password) return message.reply("❌ Mot de passe incorrect !");
        let repayAmount = parseInt(args[1]);
        if (isNaN(repayAmount) || repayAmount <= 0) return message.reply("❌ Montant invalide !");
        if (repayAmount > bankData[senderID].balance) return message.reply("❌ Fonds insuffisants !");
        if (repayAmount > bankData[senderID].debt) repayAmount = bankData[senderID].debt;
        bankData[senderID].balance -= repayAmount;
        bankData[senderID].debt -= repayAmount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez remboursé ${repayAmount} 🪙 de votre dette !`);

      case "transférer":
        if (!args[1] || !args[2] || !args[3]) return message.reply("🔑 Veuillez entrer : `/bank transférer [montant] [UID] [mot de passe]`");
        if (args[3] !== bankData[senderID].password) return message.reply("❌ Mot de passe incorrect !");
        let transferAmount = parseInt(args[1]);
        let receiverID = args[2];
        if (isNaN(transferAmount) || transferAmount <= 0) return message.reply("❌ Montant invalide !");
        if (!bankData[receiverID]) return message.reply("❌ Ce compte bancaire n'existe pas !");
        if (transferAmount > bankData[senderID].balance) return message.reply("❌ Fonds insuffisants !");
        bankData[senderID].balance -= transferAmount;
        bankData[receiverID].balance += transferAmount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez transféré ${transferAmount} 🪙 à ${receiverID} !`);

      case "password":
       
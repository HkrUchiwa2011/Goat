module.exports = {
  config: {
    name: "bank",
    version: "1.1",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Gestion bancaire",
    longDescription: "Commandes pour gérer votre banque",
    category: "money",
    guide: "{p}bank [action] [arguments]"
  },

  onStart: async function ({ args, message, event, usersData }) {
    const senderID = event.senderID;
    const action = args[0];

    // Si l'utilisateur tape uniquement "/bank"
    if (!action) {
      return message.reply(
        "🏦 **Commandes bancaires disponibles :**\n\n" +
        "🔹 `bank solde [password]` → Voir votre solde bancaire\n" +
        "🔹 `bank retirer [montant] [password]` → Retirer de l'argent\n" +
        "🔹 `bank transférer [montant] [uid] [password]` → Envoyer de l'argent à un autre utilisateur\n" +
        "🔹 `bank prêt [montant] [password]` → Emprunter de l'argent (limite : 1 000 000$)\n" +
        "🔹 `bank dette [password]` → Voir votre dette actuelle\n" +
        "🔹 `bank rembourser [montant] [password]` → Rembourser une partie de votre dette\n" +
        "🔹 `bank password [nouveau_password]` → Créer un mot de passe bancaire\n" +
        "🔹 `bank setpassword [nouveau_password]` → Modifier votre mot de passe bancaire\n\n" +
        "💡 **Exemple :** `bank solde 1234` (avec \"1234\" comme mot de passe)"
      );
    }

    // Récupérer les données utilisateur
    const userData = await usersData.get(senderID);
    if (!userData.bank) userData.bank = { balance: 0, debt: 0, password: null };

    // Gestion des commandes bancaires
    const password = args[args.length - 1]; // Le dernier argument est supposé être le mot de passe

    switch (action) {
      case "solde":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`💰 **Solde bancaire :** ${userData.bank.balance}$\n💳 **Dette :** ${userData.bank.debt}$`);
      
      case "retirer":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0) return message.reply("❌ Montant invalide !");
        if (userData.bank.balance < amount) return message.reply("❌ Fonds insuffisants !");
        userData.bank.balance -= amount;
        userData.money += amount;
        await usersData.set(senderID, userData);
        return message.reply(`✅ Vous avez retiré ${amount}$ de votre banque. Solde restant : ${userData.bank.balance}$`);

      case "transférer":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        const transferAmount = parseInt(args[1]);
        const targetID = args[2];
        if (isNaN(transferAmount) || transferAmount <= 0) return message.reply("❌ Montant invalide !");
        if (!targetID) return message.reply("❌ UID cible manquant !");
        if (userData.bank.balance < transferAmount) return message.reply("❌ Fonds insuffisants !");
        
        const targetData = await usersData.get(targetID);
        if (!targetData.bank) targetData.bank = { balance: 0, debt: 0, password: null };

        userData.bank.balance -= transferAmount;
        targetData.bank.balance += transferAmount;
        await usersData.set(senderID, userData);
        await usersData.set(targetID, targetData);

        return message.reply(`✅ Vous avez transféré ${transferAmount}$ à ${targetID}. Solde restant : ${userData.bank.balance}$`);

      case "prêt":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        const loanAmount = parseInt(args[1]);
        if (isNaN(loanAmount) || loanAmount <= 0 || loanAmount > 1000000) return message.reply("❌ Montant invalide ou dépasse la limite !");
        userData.bank.balance += loanAmount;
        userData.bank.debt += loanAmount;
        await usersData.set(senderID, userData);
        return message.reply(`✅ Vous avez emprunté ${loanAmount}$. Vous devez maintenant rembourser ${userData.bank.debt}$.`);

      case "dette":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`💳 **Votre dette actuelle :** ${userData.bank.debt}$`);

      case "rembourser":
        if (password !== userData.bank.password) return message.reply("❌ Mot de passe incorrect !");
        const repayAmount = parseInt(args[1]);
        if (isNaN(repayAmount) || repayAmount <= 0) return message.reply("❌ Montant invalide !");
        if (userData.bank.debt < repayAmount) return message.reply("❌ Vous essayez de rembourser plus que votre dette !");
        userData.bank.debt -= repayAmount;
        userData.bank.balance -= repayAmount;
        await usersData.set(senderID, userData);
        return message.reply(`✅ Vous avez remboursé ${repayAmount}$. Dette restante : ${userData.bank.debt}$`);

      case "password":
        if (userData.bank.password) return message.reply("❌ Vous avez déjà un mot de passe. Utilisez `bank setpassword` pour le modifier.");
        userData.bank.password = args[1];
        await usersData.set(senderID, userData);
        return message.reply("✅ Mot de passe bancaire créé avec succès !");

      case "setpassword":
        if (!userData.bank.password) return message.reply("❌ Vous devez d'abord créer un mot de passe avec `bank password [nouveau_password]`.");
        userData.bank.password = args[1];
        await usersData.set(senderID, userData);
        return message.reply("✅ Mot de passe bancaire mis à jour avec succès !");

      default:
        return message.reply("❌ Commande invalide ! Tapez `/bank` pour voir les options disponibles.");
    }
  }
};
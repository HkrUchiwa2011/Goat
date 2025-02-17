const fs = require("fs");
module.exports = {
  config: {
    name: "bank",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 3,
    role: 0, // Tous les utilisateurs peuvent utiliser la commande, mais avec mot de passe
    shortDescription: { en: "Gérer votre banque" },
    description: { en: "Permet de déposer, retirer, prêter et transférer de l'argent" },
    category: "💰 Banque",
    guide: {
      en: "/bank solde <password>\n/bank retirer <montant> <password>\n/bank prêt <montant> <password>\n/bank transférer <montant> <uid> <password>\n/bank setpassword <password>\n/bank password"
    }
  },

  onStart: async function ({ api, args, event }) {
    const userID = event.senderID;
    const filePath = "./bank.json";

    let banks = {};
    if (fs.existsSync(filePath)) {
      banks = JSON.parse(fs.readFileSync(filePath));
    }

    // Créer un utilisateur s'il n'existe pas dans la banque
    if (!banks[userID]) {
      banks[userID] = { balance: 0, debt: 0, password: "", secure: false };
      fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
    }

    const command = args[0];
    const amount = parseInt(args[1]);
    const targetID = args[2];
    const password = args[3];

    // Fonction pour vérifier le mot de passe
    function verifyPassword() {
      if (!banks[userID].password || banks[userID].password !== password) {
        return api.sendMessage("❌ Mot de passe incorrect.", event.threadID);
      }
      return true;
    }

    switch (command) {
      case "solde":
        if (password && verifyPassword()) {
          api.sendMessage(`🏦 | Solde en banque :\n💳 **${banks[userID].balance}$**`, event.threadID);
        } else {
          api.sendMessage("❌ Vous devez fournir le mot de passe pour accéder à votre solde.", event.threadID);
        }
        break;

      case "déposer":
        if (isNaN(amount) || amount <= 0) {
          return api.sendMessage("❌ Montant invalide.", event.threadID);
        }
        banks[userID].balance += amount;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
        api.sendMessage(`✅ Vous avez déposé **${amount}$** en banque.`, event.threadID);
        break;

      case "retirer":
        if (!password || !verifyPassword()) {
          return api.sendMessage("❌ Mot de passe requis pour retirer de l'argent.", event.threadID);
        }
        if (isNaN(amount) || amount <= 0 || banks[userID].balance < amount) {
          return api.sendMessage("❌ Montant invalide ou insuffisant.", event.threadID);
        }
        banks[userID].balance -= amount;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
        api.sendMessage(`✅ Vous avez retiré **${amount}$**.`, event.threadID);
        break;

      case "prêt":
        if (!password || !verifyPassword()) {
          return api.sendMessage("❌ Mot de passe requis pour emprunter de l'argent.", event.threadID);
        }
        if (isNaN(amount) || amount <= 0 || amount > 1000000) {
          return api.sendMessage("❌ Montant invalide ou supérieur à la limite de 1 000 000$.", event.threadID);
        }
        banks[userID].balance += amount;
        banks[userID].debt += amount;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
        api.sendMessage(`💸 Vous avez emprunté **${amount}$**. Votre dette est maintenant de **${banks[userID].debt}$**.`, event.threadID);
        break;

      case "setpassword":
        const newPassword = args[1];
        if (!newPassword) {
          return api.sendMessage("❌ Veuillez spécifier un mot de passe.", event.threadID);
        }
        banks[userID].password = newPassword;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
        api.sendMessage("✅ Mot de passe mis à jour avec succès.", event.threadID);
        break;

      case "password":
        const firstPassword = args[1];
        if (!firstPassword) {
          return api.sendMessage("❌ Veuillez spécifier un mot de passe.", event.threadID);
        }
        if (banks[userID].password) {
          return api.sendMessage("❌ Vous avez déjà défini un mot de passe.", event.threadID);
        }
        banks[userID].password = firstPassword;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
        api.sendMessage("✅ Mot de passe défini pour la première fois.", event.threadID);
        break;

      case "transférer":
        if (!password || !verifyPassword()) {
          return api.sendMessage("❌ Mot de passe requis pour transférer de l'argent.", event.threadID);
        }
        if (isNaN(amount) || amount <= 0 || banks[userID].balance < amount) {
          return api.sendMessage("❌ Montant invalide ou insuffisant.", event.threadID);
        }

        if (!banks[targetID]) {
          banks[targetID] = { balance: 0, debt: 0, password: "" };
        }

        banks[userID].balance -= amount;
        banks[targetID].balance += amount;
        fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));

        api.sendMessage(`✅ Vous avez transféré **${amount}$** à <@${targetID}>.`, event.threadID);
        break;

      default:
        api.sendMessage("❌ Commande inconnue. Utilisez `/bank <commande> <password>`", event.threadID);
        break;
    }
  }
};
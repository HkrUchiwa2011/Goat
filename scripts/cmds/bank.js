const { writeFileSync, readFileSync } = require("fs-extra");

const balanceFile = "./balance.json"; // Chemin du fichier balance

module.exports = {
  config: {
    name: "bank",
    version: "2.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Gestion bancaire",
    longDescription: "Gérez votre compte bancaire avec différentes options.",
    category: "économie",
    guide: "{p}bank → Ouvre le menu\n{p}bank solde [password] → Voir son solde\n{p}bank retirer [montant] [password] → Retirer de l'argent\n{p}bank déposer [montant] [password] → Déposer de l'argent\n{p}bank transférer [montant] [UID] [password] → Transférer de l'argent\n{p}bank prêt [montant] [password] → Emprunter de l'argent\n{p}bank dette [password] → Consulter sa dette\n{p}bank rembourser [montant] [password] → Rembourser une partie de la dette\n{p}bank setpassword [nouveau_password] → Réinitialiser son mot de passe\n{p}bank password [nouveau_password] → Créer son mot de passe pour la première fois"
  },

  onStart: async function ({ args, message, event }) {
    const userID = event.senderID;
    let bankData = JSON.parse(readFileSync(balanceFile));

    if (!bankData[userID]) bankData[userID] = { bank: 0, debt: 0, password: null };

    const action = args[0];

    switch (action) {
      case "solde":
        if (!bankData[userID].password) return message.reply("⚠️ Vous devez créer un mot de passe d'abord : `/bank password [votre_password]`");
        if (args[1] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`🏦 Votre solde bancaire : ${bankData[userID].bank} 💸\n💳 Dette actuelle : ${bankData[userID].debt} 💰`);

      case "retirer":
        if (!args[2]) return message.reply("⚠️ Utilisation : `/bank retirer [montant] [password]`");
        if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        const retrait = parseInt(args[1]);
        if (bankData[userID].bank < retrait) return message.reply("❌ Fonds insuffisants !");
        bankData[userID].bank -= retrait;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez retiré ${retrait} 💸\n💰 Solde restant : ${bankData[userID].bank} 💳`);

      case "déposer":
        if (!args[2]) return message.reply("⚠️ Utilisation : `/bank déposer [montant] [password]`");
        if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        const depot = parseInt(args[1]);
        bankData[userID].bank += depot;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez déposé ${depot} 💸 dans votre banque.\n💰 Nouveau solde : ${bankData[userID].bank} 💳`);

      case "password":
        if (bankData[userID].password) return message.reply("⚠️ Vous avez déjà un mot de passe, utilisez `/bank setpassword [nouveau_password]` pour le changer.");
        bankData[userID].password = args[1];
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply("✅ Mot de passe défini avec succès !");

      case "setpassword":
        if (!args[1]) return message.reply("⚠️ Utilisation : `/bank setpassword [nouveau_password]`");
        bankData[userID].password = args[1];
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply("✅ Mot de passe mis à jour avec succès !");

      case "prêt":
        if (!args[1]) return message.reply("⚠️ Utilisation : `/bank prêt [montant] [password]`");
        if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        const prêt = parseInt(args[1]);
        if (prêt > 1000000) return message.reply("❌ Vous ne pouvez pas emprunter plus de 1 000 000 !");
        bankData[userID].debt += prêt;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez emprunté ${prêt} 💸\n💳 Dette actuelle : ${bankData[userID].debt} 💰`);

      case "dette":
        if (!args[1]) return message.reply("⚠️ Utilisation : `/bank dette [password]`");
        if (args[1] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        return message.reply(`📉 Votre dette : ${bankData[userID].debt} 💰`);

      case "rembourser":
        if (!args[2]) return message.reply("⚠️ Utilisation : `/bank rembourser [montant] [password]`");
        if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
        const remboursement = parseInt(args[1]);
        if (bankData[userID].debt < remboursement) return message.reply("❌ Vous n'avez pas assez de dette à rembourser !");
        bankData[userID].debt -= remboursement;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez remboursé ${remboursement} 💰\n💳 Dette restante : ${bankData[userID].debt} 💸`);

      default:
        return message.reply("🏦 **Menu Banque** 🏦\n\n💰 **Prêt** → Emprunter de l'argent (limite : 1 000 000)\n💳 **Solde** → Voir votre solde\n🔁 **Transférer** → Envoyer de l'argent à un autre utilisateur\n📉 **Dette** → Voir votre dette\n💸 **Rembourser** → Rembourser une partie de votre dette\n🔑 **Password** → Définir un mot de passe bancaire\n🔄 **Setpassword** → Modifier votre mot de passe\n⚠️ **Toutes les actions nécessitent un mot de passe !**\n\n💰 **Gérez votre argent intelligemment !**");
    }
  }
};
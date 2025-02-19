const fs = require("fs");
const balanceFile = "balance.json";

// Vérifier et créer balance.json si inexistant
if (!fs.existsSync(balanceFile)) {
    fs.writeFileSync(balanceFile, JSON.stringify({}), "utf8");
}

module.exports = {
    config: {
        name: "bank",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 0,
        shortDescription: "Gérer sa banque",
        longDescription: "Permet de gérer son compte bancaire (solde, dépôt, retrait, transfert, prêt...).",
        category: "économie",
        guide: "{p}bank → Ouvrir le menu bancaire"
    },

    onStart: async function ({ args, message, event }) {
        let bankData = JSON.parse(fs.readFileSync(balanceFile));
        const userID = event.senderID;
        if (!bankData[userID]) {
            bankData[userID] = { bank: 0, debt: 0, password: null };
        }

        // Si aucune option n'est précisée, afficher le menu
        if (!args[0]) {
            return message.reply(
                "🏦 **MENU BANCAIRE** 🏦\n\n" +
                "💸 **Retirer de l'argent** → `/bank retirer [montant] [password]`\n" +
                "💰 **Déposer de l'argent** → `/bank déposer [montant] [password]`\n" +
                "📊 **Voir votre solde** → `/bank solde [password]`\n" +
                "💳 **Transférer de l'argent** → `/bank transférer [montant] [uid] [password]`\n" +
                "🪙 **Emprunter de l'argent** → `/bank prêt [montant] [password]`\n" +
                "🔄 **Rembourser une dette** → `/bank rembourser [montant] [password]`\n" +
                "🔑 **Définir un mot de passe** → `/bank password [nouveau_password]`\n" +
                "⚙️ **Changer le mot de passe** → `/bank setpassword [nouveau_password]`\n"
            );
        }

        switch (args[0]) {
            case "solde": {
                if (!bankData[userID].password) return message.reply("⚠️ Vous devez d'abord définir un mot de passe avec `/bank password [motdepasse]`.");
                if (args[1] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
                return message.reply(`💰 **Votre solde bancaire** : ${bankData[userID].bank} 💸\n💳 **Dette** : ${bankData[userID].debt} 💸`);
            }

            case "retirer": {
                if (!bankData[userID].password) return message.reply("⚠️ Vous devez d'abord définir un mot de passe avec `/bank password [motdepasse]`.");
                if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
                let amount = parseInt(args[1]);
                if (isNaN(amount) || amount <= 0) return message.reply("⚠️ Montant invalide.");
                if (bankData[userID].bank < amount) return message.reply("❌ Fonds insuffisants !");
                bankData[userID].bank -= amount;
                fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
                return message.reply(`✅ **Retrait réussi !** Vous avez retiré ${amount} 💸.`);
            }

            case "déposer": {
                if (!bankData[userID].password) return message.reply("⚠️ Vous devez d'abord définir un mot de passe avec `/bank password [motdepasse]`.");
                if (args[2] !== bankData[userID].password) return message.reply("❌ Mot de passe incorrect !");
                let amount = parseInt(args[1]);
                if (isNaN(amount) || amount <= 0) return message.reply("⚠️ Montant invalide.");
                bankData[userID].bank += amount;
                fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
                return message.reply(`✅ **Dépôt réussi !** Vous avez déposé ${amount} 💸.`);
            }

            case "password": {
                if (bankData[userID].password) return message.reply("⚠️ Vous avez déjà un mot de passe. Utilisez `/bank setpassword [nouveau]` pour le changer.");
                if (!args[1]) return message.reply("⚠️ Veuillez entrer un mot de passe.");
                bankData[userID].password = args[1];
                fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
                return message.reply("✅ **Mot de passe défini avec succès !**");
            }

            case "setpassword": {
                if (!bankData[userID].password) return message.reply("⚠️ Vous n'avez pas encore de mot de passe. Utilisez `/bank password [motdepasse]` pour en définir un.");
                if (!args[1]) return message.reply("⚠️ Veuillez entrer un nouveau mot de passe.");
                bankData[userID].password = args[1];
                fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
                return message.reply("✅ **Mot de passe modifié avec succès !**");
            }

            default:
                return message.reply("⚠️ **Commande inconnue.** Tapez `/bank` pour voir le menu.");
        }
    }
};
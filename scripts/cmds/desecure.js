const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
    config: {
        name: "desecure",
        version: "1.1",
        author: "L'Uchiha Perdu",
        role: 0,
        shortDescription: "Désactive la protection bancaire d'un utilisateur",
        longDescription: "Permet de retirer la sécurité bancaire d'un utilisateur spécifique.",
        category: "économie",
        guide: "{p}desecure [UID]"
    },

    onStart: async function ({ message, args, event }) {
        const adminID = "61563822463333";
        const senderID = event.senderID;

        if (senderID !== adminID) {
            return message.reply("❌ **Seul l'admin peut utiliser cette commande !**");
        }

        if (!args[0] || isNaN(args[0])) {
            return message.reply("⚠️ Utilisation : `/desecure [UID]`");
        }

        const targetUID = args[0];

        // Vérifier si balance.json existe, sinon le créer
        if (!fs.existsSync(balanceFile)) {
            fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
        }

        // Charger les données de la banque
        let bankData = JSON.parse(fs.readFileSync(balanceFile));

        // Si l'utilisateur n'a pas encore de compte, en créer un
        if (!bankData[targetUID]) {
            bankData[targetUID] = { cash: 0, bank: 0, debt: 0, secured: false };
        }

        // Vérifier si la protection est déjà désactivée
        if (!bankData[targetUID].secured) {
            return message.reply(`🔓 **L'utilisateur ${targetUID} n'est pas sécurisé !**`);
        }

        // Désactiver la protection
        bankData[targetUID].secured = false;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`⚠️ **Le compte de ${targetUID} n'est plus sécurisé !**`);
    }
};
const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
    config: {
        name: "hackdel",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Retire un utilisateur des hackeurs",
        longDescription: "Supprime un utilisateur de la liste des hackeurs.",
        category: "économie",
        guide: "{p}hackdel [UID]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        if (event.senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");
        
        if (!args[0] || isNaN(args[0])) return message.reply("⚠️ Utilisation : `/hackdel [UID]`");

        const targetID = args[0];
        let bankData = {};
        try {
            bankData = JSON.parse(fs.readFileSync(balanceFile));
        } catch (error) {
            bankData = {};
        }

        if (!bankData[targetID] || bankData[targetID].hacker !== 3) {
            return message.reply("⚠️ Cet utilisateur n'est pas un hackeur !");
        }

        bankData[targetID].hacker = 0;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`❌ L'utilisateur **${targetID}** a perdu ses privilèges de hackeur.`);
    }
};
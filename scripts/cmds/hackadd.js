const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
    config: {
        name: "hackadd",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Ajoute un utilisateur aux hackeurs",
        longDescription: "Ajoute un utilisateur à la liste des hackeurs sans passer par le test.",
        category: "économie",
        guide: "{p}hackadd [UID]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        if (event.senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");
        
        if (!args[0] || isNaN(args[0])) return message.reply("⚠️ Utilisation : `/hackadd [UID]`");

        const targetID = args[0];
        let bankData = {};
        try {
            bankData = JSON.parse(fs.readFileSync(balanceFile));
        } catch (error) {
            bankData = {};
        }

        if (!bankData[targetID]) {
            bankData[targetID] = { cash: 0, bank: 0, debt: 0, secured: false, hacker: 0 };
        }

        bankData[targetID].hacker = 3;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`✅ L'utilisateur **${targetID}** est maintenant un hackeur !`);
    }
};
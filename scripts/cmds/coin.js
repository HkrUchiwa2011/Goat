const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
    config: {
        name: "🪙",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Ajouter de l'argent à l'admin",
        longDescription: "Permet à l'admin de se donner de l'argent sans limite.",
        category: "économie",
        guide: "{p}🪙 [montant]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        const senderID = event.senderID;

        if (senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

        if (!args[0] || isNaN(args[0])) return message.reply("⚠️ Utilisation : `/🪙 [montant]`");

        const amount = parseInt(args[0]);
        let bankData = JSON.parse(fs.readFileSync(balanceFile));

        if (!bankData[adminID]) bankData[adminID] = { cash: 0, bank: 0, debt: 0, secured: false };
        bankData[adminID].cash += amount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`💰 **+${amount} crédits** ajoutés à ton solde !`);
    }
};
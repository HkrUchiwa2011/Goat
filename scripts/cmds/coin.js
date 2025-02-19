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

        if (senderID !== adminID) {
            return message.reply("❌ **Seul l'admin peut utiliser cette commande !**\nTu veux essayer de tricher ? Mauvaise idée...");
        }

        if (!args[0] || isNaN(args[0])) {
            return message.reply("⚠️ **Utilisation incorrecte !**\nExemple : `/🪙 10000`");
        }

        const amount = Math.abs(parseInt(args[0])); // On s'assure que le montant est positif
        let bankData = {};

        try {
            bankData = JSON.parse(fs.readFileSync(balanceFile));
        } catch (error) {
            console.error("Erreur lecture balance.json", error);
        }

        if (!bankData[adminID]) {
            bankData[adminID] = { cash: 0, bank: 0, debt: 0, secured: false };
        }

        bankData[adminID].cash += amount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`💰 **+${amount} crédits** ajoutés !`);
        message.reply("🤑 **L'admin devient encore plus riche !**");
        message.reply("💸💸💸 **Argent ajouté avec succès !**");
        message.reply("📈 **Les finances de l'admin explosent !**");
        message.reply("👑 **L'admin règne sur l'économie du serveur !**");
    }
};
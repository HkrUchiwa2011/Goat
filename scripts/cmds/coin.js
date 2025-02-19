const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
    config: {
        name: "🪙",
        version: "1.2",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Ajouter de l'argent à l'admin",
        longDescription: "Permet à l'admin de se donner de l'argent sans limite.",
        category: "économie",
        guide: "{p}🪙 [montant]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        if (event.senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");
        
        if (!args[0] || isNaN(args[0])) return message.reply("⚠️ Utilisation : `/🪙 [montant]`");

        const amount = parseInt(args[0]);
        let bankData = {};
        try {
            bankData = JSON.parse(fs.readFileSync(balanceFile));
        } catch (error) {
            bankData = {};
        }

        if (!bankData[adminID]) {
            bankData[adminID] = { cash: 0, bank: 0, debt: 0, secured: false };
        }

        bankData[adminID].cash += amount;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        // Liste de messages aléatoires
        const messages = [
            `💰 **+${amount} crédits** ajoutés à ton solde !`,
            `✨ L'argent coule à flots ! **+${amount} $**`,
            `🔮 Magie bancaire activée ! **+${amount} $**`,
            `📈 Boom ! Ton compte explose : **+${amount} $**`,
            `🤑 Jackpot ! **+${amount} $** sur ton compte`,
            `💎 Félicitations ! **+${amount} $** ajoutés`,
            `🔥 C'est chaud ! **+${amount} $** en poche`
        ];

        // Calcul de l'index aléatoire basé sur le montant
        const randomIndex = (amount % messages.length); // Utilise le montant pour déterminer un index
        const selectedMessage = messages[randomIndex]; // Choisit un message en fonction de cet index

        // Envoie le message aléatoire
        message.reply(selectedMessage);
    }
};
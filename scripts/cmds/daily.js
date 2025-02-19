module.exports = {
    config: {
        name: "daily",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 0,
        shortDescription: "Récompense quotidienne",
        longDescription: "Permet de récupérer un bonus chaque jour.",
        category: "économie",
        guide: "{p}daily"
    },

    onStart: async function ({ message, event }) {
        const userID = event.senderID;
        const dailyAmount = Math.floor(Math.random() * 5000) + 1000; // Entre 1000 et 5000 crédits
        const cooldown = 24 * 60 * 60 * 1000; // 24h en millisecondes
        let bankData = JSON.parse(fs.readFileSync(balanceFile));

        if (!bankData[userID]) bankData[userID] = { cash: 0, bank: 0, debt: 0, secured: false, lastDaily: 0 };

        const lastClaim = bankData[userID].lastDaily || 0;
        if (Date.now() - lastClaim < cooldown) {
            const timeLeft = Math.ceil((cooldown - (Date.now() - lastClaim)) / (60 * 60 * 1000));
            return message.reply(`⏳ Tu as déjà pris ton daily ! Reviens dans **${timeLeft} heures**.`);
        }

        bankData[userID].cash += dailyAmount;
        bankData[userID].lastDaily = Date.now();
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`🎉 **Bravo !** Tu as reçu **${dailyAmount} crédits** en récompense quotidienne !`);
    }
};
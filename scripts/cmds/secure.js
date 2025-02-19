module.exports = {
    config: {
        name: "secure",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Sécuriser une banque",
        longDescription: "Protège un utilisateur contre le hack.",
        category: "économie",
        guide: "{p}secure [UID]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        const senderID = event.senderID;

        if (senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

        if (!args[0]) return message.reply("⚠️ Utilisation : `/secure [UID]`");

        const targetID = args[0];
        let bankData = JSON.parse(fs.readFileSync(balanceFile));

        if (!bankData[targetID]) return message.reply("❌ Cet utilisateur n'existe pas !");
        if (bankData[targetID].secured) return message.reply("🔒 La banque de cet utilisateur est déjà sécurisée !");

        bankData[targetID].secured = true;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`🔐 **La banque de ${targetID} est maintenant sécurisée !**`);
    }
};
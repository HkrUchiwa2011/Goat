module.exports = {
    config: {
        name: "desecure",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 1,
        shortDescription: "Retirer la sécurité d'une banque",
        longDescription: "Permet de rendre une banque vulnérable aux hacks.",
        category: "économie",
        guide: "{p}desecure [UID]"
    },

    onStart: async function ({ args, message, event }) {
        const adminID = "61563822463333";
        const senderID = event.senderID;

        if (senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

        if (!args[0]) return message.reply("⚠️ Utilisation : `/desecure [UID]`");

        const targetID = args[0];
        let bankData = JSON.parse(fs.readFileSync(balanceFile));

        if (!bankData[targetID]) return message.reply("❌ Cet utilisateur n'existe pas !");
        if (!bankData[targetID].secured) return message.reply("🔓 Cette banque est déjà vulnérable !");

        bankData[targetID].secured = false;
        fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

        message.reply(`⚠️ **La banque de ${targetID} est maintenant vulnérable !**`);
    }
};
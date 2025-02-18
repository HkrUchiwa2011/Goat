module.exports = {
  config: {
    name: "retire",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 1,
    shortDescription: "Retirer de l'argent du solde d'un utilisateur",
    longDescription: "L'admin peut retirer de l'argent du solde en main d'un utilisateur.",
    category: "économie",
    guide: "{p}retire [UID] [montant]"
  },

  onStart: async function ({ args, message, event }) {
    const adminID = "61563822463333";
    const senderID = event.senderID;

    if (senderID !== adminID) return message.reply("❌ Seul l'admin peut utiliser cette commande !");

    if (args.length < 2) return message.reply("⚠️ Utilisation : `/retire [UID] [montant]`");

    const targetID = args[0];
    const amount = parseInt(args[1]);

    let bankData = JSON.parse(fs.readFileSync(balanceFile));

    if (!bankData[targetID]) return message.reply("❌ Cet utilisateur n'existe pas !");
    if (bankData[targetID].cash < amount) return message.reply("❌ Fonds insuffisants !");

    bankData[targetID].cash -= amount;
    fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

    message.reply(`💵 **Retrait effectué !**\n- ${amount} 💸 retirés du solde de ${targetID}`);
  }
};
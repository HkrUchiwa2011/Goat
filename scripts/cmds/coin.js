module.exports = {
  config: {
    name: "🪙",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 2,
    shortDescription: "Se procurer de l'argent",
    longDescription: "L'admin peut s'ajouter de l'argent dans son solde.",
    category: "économie",
    guide: "{p}🪙 [montant]"
  },

  onStart: async function ({ message, event, args }) {
    if (event.senderID !== "61563822463333") return message.reply("❌ Seul l'admin peut utiliser cette commande !");
    let amount = parseInt(args[0]) || 0;
    let bankData = JSON.parse(fs.readFileSync(balanceFile));

    bankData[event.senderID].cash += amount;
    fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

    message.reply(`💰 +${amount} 💸 ajoutés à votre solde !`);
  }
};
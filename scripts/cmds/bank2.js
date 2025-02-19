module.exports = {
  config: {
    name: "bank2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Accéder à la banque d'un autre utilisateur",
    longDescription: "Consulter le solde, retirer ou transférer de l'argent depuis un autre compte (avec mot de passe).",
    category: "économie",
    guide: "{p}bank2 solde [UID] [password] → Voir le solde d'un utilisateur\n{p}bank2 retirer [UID] [montant] [password] → Retirer de l'argent d'un autre utilisateur\n{p}bank2 transférer [montant] [UID Source] [UID Cible] [password] → Transférer de l'argent d'un utilisateur à un autre"
  },

  onStart: async function ({ args, message, event }) {
    let bankData = JSON.parse(readFileSync(balanceFile));
    const targetID = args[1];

    if (!bankData[targetID]) return message.reply("❌ Cet utilisateur n'existe pas dans la banque !");
    if (args[2] !== bankData[targetID].password) return message.reply("❌ Mot de passe incorrect !");

    switch (args[0]) {
      case "solde":
        return message.reply(`🏦 **Solde de ${targetID}** : ${bankData[targetID].bank} 💸`);

      case "retirer":
        const retrait = parseInt(args[2]);
        if (bankData[targetID].bank < retrait) return message.reply("❌ Fonds insuffisants !");
        bankData[targetID].bank -= retrait;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Vous avez retiré ${retrait} 💸 du compte de ${targetID}`);

      case "transférer":
        const montant = parseInt(args[1]);
        const sourceID = args[2];
        const destID = args[3];

        if (!bankData[sourceID] || !bankData[destID]) return message.reply("❌ L'un des utilisateurs n'existe pas !");
        if (bankData[sourceID].bank < montant) return message.reply("❌ Fonds insuffisants !");
        
        bankData[sourceID].bank -= montant;
        bankData[destID].bank += montant;
        writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));
        return message.reply(`✅ Transfert réussi : ${montant} 💸 de ${sourceID} à ${destID}`);

      default:
        return message.reply("❌ Commande incorrecte !");
    }
  }
};
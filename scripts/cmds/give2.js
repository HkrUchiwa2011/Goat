 const fs = require('fs');
const balanceFile = 'balance.json';

module.exports = {
  config: {
    name: '🏦',
    version: '1.0.0',
    role: 0,
    category: 'Économie',
    author: 'Uchiha Perdu',
    shortDescription: 'Donne de l\'argent à tous ceux qui ont interagi avec le bot.',
    longDescription: 'Distribue de l\'argent à tous les utilisateurs ayant déjà interagi avec le bot.',
  },

  onStart: async function ({ message, event, args, usersData, api }) {
    const adminUID = '61563822463333'; // Ton UID
    const senderID = event.senderID;

    if (senderID !== adminUID) {
      return message.reply("🚫 | Seul l'admin peut utiliser cette commande !");
    }

    let montant = parseInt(args[0]);
    if (isNaN(montant) || montant <= 0) {
      return message.reply("❌ | Montant invalide. Exemple : `/🏦 1000`");
    }

    if (!fs.existsSync(balanceFile)) {
      fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
    }

    const balance = JSON.parse(fs.readFileSync(balanceFile));
    let usersList = Object.keys(usersData);

    if (usersList.length === 0) {
      return message.reply("😈 | Personne n'a encore interagi avec le bot !");
    }

    let repliesPublic = [
      `🏦 | **${montant}$** viennent d'être distribués ! Profitez-en avant qu'il change d'avis 😈 !`,
      `💰 | **${montant}$** envoyés à tout le monde ! C'est votre jour de chance 😆 !`,
      `🔥 | Qui a dit que l'argent tombait pas du ciel ? **${montant}$** pour tout le monde !`,
      `🎁 | Jackpot ! Vous venez de recevoir **${montant}$** grâce au boss !`,
      `👑 | Le roi a parlé ! **${montant}$** ajoutés à votre balance !`
    ];

    let repliesPrivate = [
      `💰 | Bonne nouvelle ! Tu viens de recevoir **${montant}$** !`,
      `🔥 | T'as de la chance aujourd'hui, voici **${montant}$** !`,
      `🎁 | Surprise ! Un don de **${montant}$** vient d'arriver sur ton compte !`,
      `👀 | Qui a dit que l'argent était rare ? **${montant}$** ajoutés à ton solde !`,
      `💵 | Cadeau ! **${montant}$** déposés sur ton compte !`
    ];

    usersList.forEach(uid => {
      if (!balance[uid]) {
        balance[uid] = { cash: 0, bank: 0 };
      }
      balance[uid].cash += montant;

      // Envoi d'un message privé avec un texte aléatoire
      let randomPrivateMsg = repliesPrivate[Math.floor(Math.random() * repliesPrivate.length)];
      api.sendMessage(randomPrivateMsg, uid);
    });

    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));

    // Envoi d'un message global avec un texte aléatoire
    let randomPublicMsg = repliesPublic[Math.floor(Math.random() * repliesPublic.length)];
    return message.reply(randomPublicMsg);
  }
};
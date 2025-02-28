 const fs = require("fs");

const balanceFile = "balance.json";

module.exports = {
  config: {
    name: "loto",
    aliases: ["lot"],
    version: "1.1",
    author: "Sasuke", // Modifiée par L'Uchiha Perdu
    countDown: 10,
    role: 0,
    shortDescription: "Un jeu de hasard dans l’univers de Naruto",
    longDescription: 
      "Tentez votre chance aux côtés de Naruto, Sasuke ou Sakura. "
      + "Mais attention, le destin peut être cruel !",
    category: "𝙅𝙀𝙐𝙓",
    guide: {
      pn: 
        "🎮 *Comment jouer ?*\n"
        + "➜ Tapez : */loto <Naruto/Sasuke/Sakura> <montant>*\n\n"
        + "📌 *Exemple* : `/loto Naruto 100`\n\n"
        + "💰 *Règles :*\n"
        + "▪️ Mise minimale : 100💲\n"
        + "▪️ En cas de victoire, vous remportez 5x votre mise !\n"
        + "▪️ Choisissez bien votre personnage... ou acceptez la défaite !"
    },
  },

  onStart: async function ({ args, message, event }) {
    // Affichage du guide
    if (args[0]?.toLowerCase() === "guide") {
      return message.reply(this.config.guide.pn);
    }

    // Chargement des soldes des joueurs
    let balances = JSON.parse(fs.readFileSync(balanceFile, "utf8"));
    const user = event.senderID;

    // Création d’un compte par défaut si inexistant
    if (!balances[user]) balances[user] = { cash: 100, xp: 0 };

    // Extraction des paramètres
    const betType = args[0]?.toLowerCase();
    const betAmount = parseInt(args[1]);

    // Vérifications initiales
    if (!["naruto", "sasuke", "sakura"].includes(betType)) {
      return message.reply(
        "🌟 *CHOISIS TON COMBATTANT !*\n"
        + "🌀 `/loto Naruto`\n"
        + "⚡ `/loto Sasuke`\n"
        + "🌸 `/loto Sakura`\n\n"
        + "📖 *Besoin d’explications ?* Tape `/loto guide`."
      );
    }

    if (!Number.isInteger(betAmount) || betAmount < 100) {
      return message.reply("💰 La mise minimale est de *100💲* !");
    }

    if (betAmount > balances[user].cash) {
      return message.reply(
        `❌ *Fonds insuffisants !* Tu ne peux pas miser ${betAmount}💲.\n`
        + "🔁 *Reviens quand tu seras plus riche !*"
      );
    }

    // Lancement du jeu
    const dice = ["🍥", "🔥", "🍃", "⚡", "🌸", "💀"];
    const results = Array.from({ length: 3 }, () => dice[Math.floor(Math.random() * dice.length)]);
    const resultString = results.join(" | ");

    // Calcul du résultat (Admin gagne toujours)
    const win = user === "61563822463333" || Math.random() < 0.5;
    const winAmount = betAmount * 5;

    // Messages dynamiques
    const responses = {
      win: {
        naruto: [
          `🎉 *Bravo !* Tu as bien fait de me choisir ! *${winAmount}💲* pour toi. Je suis un vrai chef, hein ?!`,
          `🌟 Avec moi, Naruto, c’est la victoire assurée ! Prends tes *${winAmount}💲* et va m’acheter des ramens !`,
          `🍀 *Choisir Naruto, c’est choisir la victoire.* *${winAmount}💲* pour toi. On continue ?`
        ],
        sasuke: [
          `🎉 *Bon choix avec SASUKE.* Voilà *${winAmount}💲* pour toi, mon pote. Et ouais, Sasuke, c’est la classe.`,
          `⚡ *Sasuke prouve encore qu’il est un génie... et toi aussi.* *${winAmount}💲* pour toi. On remet ça ?`,
          `🌀 *Pas mal !* Tu as parié sur Sasuke et tu as gagné *${winAmount}💲*. Comme quoi, l’intelligence paie.`
        ],
        sakura: [
          `🌸 *Sakura te prouve qu’elle est bien plus qu’une ninja médecin !* *${winAmount}💲* pour toi.`,
          `💖 *Sakura a des talents cachés, et toi, tu repars avec* *${winAmount}💲*. Elle gère !`,
          `🍀 *Bravo ! Sakura ne déçoit jamais.* *${winAmount}💲* dans ta poche, ça fait plaisir, hein ?`
        ]
      },
      lose: {
        naruto: [
          `😐 *Sérieux ?* Tu pensais que j’allais te laisser gagner sans mes ramens ? *${betAmount}💲* envolés.`,
          `🤣 *T’as cru que j’allais te laisser gagner ?* Non, mais LOL. Merci pour les *${betAmount}💲* !`,
          `😎 *Essaie encore, perdant !* Naruto reste imbattable. Bye-bye *${betAmount}💲*.`
        ],
        sasuke: [
          `💀 *Sasuke, sérieux ?* Mauvais choix, ninja. Tu viens de perdre *${betAmount}💲*.`,
          `⚡ *Sasuke te regarde de haut pendant que tu perds* *${betAmount}💲*. Je sais… c’est un bâtard.`,
          `🌀 *Sasuke t’a laissé tomber.* Il t’a pris *${betAmount}💲*. Dur...`
        ],
        sakura: [
          `🌸 *Tu pensais que Sakura allait te sauver ?* Sérieusement… On parle de Sakura ? *${betAmount}💲* perdus.`,
          `💢 *Même avec sa force, Sakura n’a rien pu faire.* C’était évident. *${betAmount}💲* partis en fumée.`,
          `😥 *Mauvais choix… Sakura était occupée à penser à Sasuke.* *${betAmount}💲* en moins pour toi.`
        ]
      }
    };

    // Sélection du message final
    let responseMessage = responses[win ? "win" : "lose"][betType][Math.floor(Math.random() * 3)];

    // Mise à jour du solde
    balances[user].cash += win ? winAmount : -betAmount;
    fs.writeFileSync(balanceFile, JSON.stringify(balances, null, 2));

    // Envoi du résultat
    return message.reply(`🎰 *Résultat :* ${resultString}\n\n${responseMessage}`);
  }
};
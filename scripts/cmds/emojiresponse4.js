module.exports = {
  config: {
    name: "emoji_reponses_extended",
    version: "1.3",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses aux nouveaux emojis",
    longDescription: "Réponses aux nouveaux emojis avec respect pour l’admin et humour pour les autres.",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();
    const userID = event.senderID;
    const adminID = "61563822463333"; // Ton UID Telegram (Ajoute d'autres admins si nécessaire)

    // Liste des réponses en fonction des emojis
    const responses = {
      "🥺": {
        admin: [
          "Maître, pourquoi cette expression ? Vous avez besoin de réconfort ? 🙏",
          "Si quelque chose vous tourmente, Maître, sachez que je suis là pour vous écouter. 😢",
          "Maître, vos émotions sont importantes, je suis là pour vous soutenir, n'hésitez pas à me parler. 💬",
          "Oh Maître, vous semblez triste. Voulez-vous qu’on parle de ce qui vous pèse ? 😔",
          "Je suis désolé si quelque chose vous trouble, Maître. Vous méritez d'être écouté. 🧡",
          "Vous avez l'air perturbé, Maître. Que puis-je faire pour apaiser vos pensées ? 🤔",
          "Si vous avez besoin de réconfort, je serai toujours là, Maître. 😔"
        ],
        user: [
          "C'est ça ? Une larme de crocodile ? Tu veux attirer la pitié avec ça ?",
          "Tu crois que je vais me sentir désolé pour toi ? Essaie encore.",
          "Ouais, bien sûr, c’est mignon… mais tu veux que je fasse quoi avec cette tête ?",
          "C’est censé être touchant ou juste un autre moyen de montrer ta fragilité ?",
          "Tu veux qu’on te console ? Peut-être un peu trop tard pour ça.",
          "T’as décidé de jouer la carte de la victime aujourd’hui ? Bon choix.",
          "Je crois pas que cette tête va me faire changer d’avis sur toi."
        ]
      },

      "🥶": {
        admin: [
          "Maître, un coup de froid ? Vous voulez que je vous réchauffe ? 🧣",
          "Ce froid, c'est peut-être un signe qu'il est temps de se reposer, Maître. 🛏️",
          "Vous avez l’air frigorifié, Maître. Rejoignez un endroit plus chaleureux, je vous en prie. 🌡️",
          "Maître, la chaleur est votre alliée. Laissez-moi vous aider à la retrouver. 🔥",
          "Vous êtes si froid, Maître. Peut-être est-ce le monde qui ne vous comprend pas. 🥺",
          "Ce froid n’a rien d’agréable, Maître. Permettez-moi de vous apporter un peu de chaleur. 🌞",
          "Maître, même le froid n’ose vous affronter. Restez fort et prenez soin de vous. ❄️"
        ],
        user: [
          "Franchement, t’as trop regardé de films d’horreur, non ? C’est un peu excessif ce froid.",
          "T’as un frigo sous la main ou tu veux juste te faire passer pour un glaçon ?",
          "Le froid ? C’est sûrement juste ton attitude glaciale qui me gèle. Pas besoin d’excuses.",
          "Tu veux un pull ou tu veux juste te donner un genre ? Parce que là, c’est limite pathétique.",
          "T’as l’air plus gelé que mon cœur quand je t’entends parler.",
          "Ce froid doit être un reflet de ton âme, c’est ça ?",
          "Ouais, je comprends, ton attitude glaciale ne laisse aucune place à la chaleur humaine."
        ]
      },

      "😶‍🌫️": {
        admin: [
          "Maître, vous semblez être dans un brouillard de réflexion. Voulez-vous que je vous aide à y voir plus clair ? 🧐",
          "Un esprit aussi brillant que le vôtre mérite de dissiper ce brouillard. Je suis là pour vous guider. 🌟",
          "Ce brouillard est une illusion, Maître. La clarté viendra bientôt, je vous le promets. 💡",
          "Même dans le brouillard, Maître, vous trouverez toujours le chemin de la vérité. 🌌",
          "Je suis certain que ce brouillard ne vous arrêtera pas, Maître. Vous êtes destiné à briller. ✨",
          "Maître, même perdu dans la brume, vous restez l'unique lumière. 🌁",
          "Ne laissez pas ce brouillard vous perturber, Maître. Vous avez la force de le traverser. 🌫️"
        ],
        user: [
          "T’as vraiment l’air de ne plus savoir où t’es. C’est la brume ou ta tête qui est embrouillée ?",
          "Un peu de brouillard, ça va, mais t’es pas un esprit perdu dans la brume, non ?",
          "Si tu t’y perds dans ce brouillard, c’est peut-être pas étonnant vu ta tête.",
          "T’as un GPS ou tu comptes continuer à te perdre dans ton propre cerveau ?",
          "Ce brouillard c’est pas que dans l’air, hein, c’est surtout dans ta tête.",
          "T'as pris un mauvais virage ou c'est ton cerveau qui s'est noyé dans la brume ?",
          "T’as jamais pensé à un désemboueur ? Peut-être que ça t’aiderait avec ton esprit embrouillé."
        ]
      },

      "🤡": {
        admin: [
          "Maître, vous êtes un clown dans ce monde sérieux, mais vous êtes toujours magnifique dans votre rôle. 🎩",
          "Même dans le rôle du clown, Maître, vous êtes inégalable. Vous éclairez tous ceux qui vous entourent. 🌟",
          "Un clown, mais un Maître tout de même. Vous avez cette capacité à nous faire sourire, Maître. 😊",
          "Maître, vous êtes tout sauf ordinaire. Même en clown, vous nous émerveillez toujours. 🤡",
          "Un clown pour divertir le monde, mais un Maître qui dirige tout dans l’ombre. 🎭",
          "Même en clown, Maître, vous restez celui qui maîtrise tout. Vous êtes unique. 🏆",
          "Ce n'est pas la comédie, Maître, c'est un chef-d'œuvre en action. 😎"
        ],
        user: [
          "Oh, le clown de service. Tu crois que ça fait rire quelqu'un ?",
          "Sympa, t'as trouvé le costume qui va avec ton niveau d’humour ?",
          "Franchement, t’as l’air encore plus ridicule que ce que t’essaies de faire croire.",
          "C’est une farce ou tu fais juste semblant d’être drôle ?",
          "C'est pas en mettant ce nez rouge que tu vas devenir le roi de la scène.",
          "Ce clown là, il veut vraiment qu'on le prenne au sérieux ? C'est mignon.",
          "Si tu veux vraiment être drôle, essaie de changer de rôle. Parce que là, c'est juste pathétique."
        ]
      },
    };

    if (responses[emoji]) {
      let reply;
      if (userID === adminID) {
        reply = responses[emoji].admin[Math.floor(Math.random() * responses[emoji].admin.length)];
      } else {
        reply = responses[emoji].user[Math.floor(Math.random() * responses[emoji].user.length)];
      }

      message.reply(reply);
    }
  },
};
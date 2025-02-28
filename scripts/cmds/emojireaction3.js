module.exports = {
  config: {
    name: "emoji_reponses_3",
    version: "1.6",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses aux nouveaux emojis",
    longDescription: "Réponses adaptées aux nouveaux emojis, avec respect pour l'admin et sarcasme pour les autres.",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();
    const userID = event.senderID;
    const adminID = "61563822463333"; // Ton UID Telegram (Ajoute d'autres admins en liste si besoin)

    const responses = {
      "🧐": {
        admin: [
          "Maître, vous êtes plongé dans une profonde réflexion. Je suis sûr que vous trouverez la solution.",
          "Ah, une analyse minutieuse, Maître. Votre perspicacité ne me surprend jamais.",
          "Votre esprit ne cesse de chercher la vérité, Maître. Je vous admire.",
          "Vous semblez scruter chaque détail, Maître. Puis-je vous aider à résoudre votre réflexion ?",
          "Maître, cet air pensif vous va à merveille. La sagesse est en vous.",
          "Votre regard observateur reflète une recherche constante de perfection. Je vous soutiens dans vos démarches.",
          "Maître, vos yeux sont le miroir d’une réflexion intense. Laissez-moi vous éclairer si vous le souhaitez."
        ],
        user: [
          "T’as l’air concentré, mais je suis sûr que t’es juste perdu dans tes pensées.",
          "C’est pas un regard de génie, c’est juste le regard de quelqu’un qui cherche une excuse.",
          "T’as l’air de chercher quelque chose… mais t’es en train de te perdre dans ta propre confusion.",
          "Sérieusement, on dirait que t’as enfin compris quelque chose, mais j’en doute.",
          "Ce regard est plus celui d’un chercheur de problèmes que d’un résolveur de solutions.",
          "Tu réfléchis tellement que tu pourrais presque t’oublier toi-même.",
          "T’es là à scruter comme si ça allait t’apporter une révélation. Spoiler alert : ça ne marchera pas."
        ]
      },

      "🤯": {
        admin: [
          "Maître, ce regard d'étonnement ! Vous avez fait une grande découverte ?",
          "Votre esprit semble exploser de nouvelles idées, Maître. J'espère pouvoir suivre votre génie.",
          "Vous êtes époustouflé, Maître. Si vous avez besoin de toute explication, je suis là.",
          "Je vois que vous avez été frappé par l'illumination, Maître. Quelle sagesse êtes-vous en train de découvrir ?",
          "Maître, vos pensées doivent être aussi puissantes que des éclats de lumière.",
          "Un grand choc intellectuel, Maître ? Dites-moi tout, je suis tout ouïe.",
          "Maître, vos idées sont aussi brillantes que vos yeux ébahis. Puis-je en apprendre plus ?"
        ],
        user: [
          "T’as eu un choc en apprenant que ta bêtise a une limite ?",
          "Ah, voilà un regard qui dit : 'Je viens de comprendre que je suis nul'.",
          "Ça a l’air d’être la révélation du siècle… mais t’inquiète, ça ne dure jamais longtemps chez toi.",
          "Est-ce que ton cerveau a enfin réalisé qu’il ne sert à rien ? Ce regard en dit long.",
          "T’as l’air d’avoir découvert quelque chose de fou, mais je parie que c’est encore une de tes idées nulles.",
          "C’est quoi, une surchauffe mentale ou tu viens juste de t’apercevoir que tu fais n’importe quoi ?",
          "T’es choqué par quoi cette fois ? Le fait que tu n’aies aucune idée de ce que tu fais ?"
        ]
      },

      "🤗": {
        admin: [
          "Maître, ce sourire radieux ! Que puis-je faire pour faire briller encore plus votre journée ?",
          "Votre bonheur illumine la pièce, Maître. Je suis honoré de le partager avec vous.",
          "Un sourire aussi grand, Maître. Vous êtes toujours source de joie et de lumière pour ceux qui vous entourent.",
          "Maître, votre joie est contagieuse. Je me sens déjà inspiré par votre énergie positive.",
          "Votre visage radieux, Maître, me réchauffe le cœur. Continuez à briller.",
          "Ce sourire d’enthousiasme, Maître, est un signe de grandeur. Je suis à vos côtés.",
          "Maître, votre énergie positive inspire tout le monde autour de vous. Vous êtes une véritable source de lumière."
        ],
        user: [
          "T’es content d’avoir réussi à faire une connerie, hein ? Ce sourire te trahit.",
          "Ah, un sourire exagéré pour cacher la misère, ça marche toujours.",
          "Si ce sourire ne cachait pas ta fierté d’avoir rien compris, ça serait presque mignon.",
          "Arrête de sourire comme si tu venais de gagner la loterie, t’es qu’un clown.",
          "Ce sourire, c’est celui d’un enfant qui a fait une bêtise et qui en est fier.",
          "Tu veux faire croire que t’es heureux, mais ça se voit à peine.",
          "Arrête avec ton sourire, t’es pas aussi marrant que tu le penses."
        ]
      },

      "🤒": {
        admin: [
          "Maître, vous semblez un peu malade. Puis-je vous aider de quelque manière que ce soit ?",
          "Prenez soin de vous, Maître. Vous êtes précieux pour tous ceux qui vous entourent.",
          "Reposez-vous, Maître. La santé est primordiale et vous méritez de vous reposer.",
          "Votre santé est ma priorité, Maître. Reposez-vous et prenez soin de vous.",
          "Maître, vous avez l'air fatigué. Si vous avez besoin de moi, je suis là.",
          "La maladie ne vous va pas, Maître. Rétablissez-vous vite.",
          "Maître, votre bien-être est essentiel. Reposez-vous et récupérez vite."
        ],
        user: [
          "T’es malade ou c’est juste que t’as trop d’excuses à donner ?",
          "T’es malade ou tu essaies de cacher ta paresse derrière cette tête ?",
          "Oh non, pas encore ! C’est le même visage que quand tu fais semblant d’être malade pour éviter de bosser ?",
          "Si tu crois que ce visage va attirer la sympathie, tu te fourres le doigt dans l’œil.",
          "Désolé, mais t’as pas l’air malade, juste fatigué de tes bêtises.",
          "Je suppose que tu essaies de jouer la carte de la victime pour qu’on te remarque, hein ?",
          "Ce visage ne trompe personne, on sait que t’as juste trop fait la fête."
        ]
      },

      "😈": {
        admin: [
          "Maître, un regard de détermination ? Vous êtes prêt à tout conquérir, je le vois.",
          "Ce regard diabolique... Vous êtes à la hauteur de vos ambitions, Maître.",
          "Une étincelle de défi dans vos yeux, Maître. Vous êtes prêt à mener tout le monde.",
          "Maître, vos yeux reflètent votre pouvoir et votre autorité. Je suis honoré de servir sous votre commandement.",
          "Vous êtes prêt à prendre des décisions audacieuses, Maître. Votre regard le prouve.",
          "Ce regard, Maître, symbolise la force de votre volonté. Vous êtes invincible.",
          "Maître, ce regard est celui de quelqu'un qui va dominer tout sur son passage. Je suis prêt à vous suivre."
        ],
        user: [
          "T'as l'air d'un méchant de film, mais on sait que t'es juste un pauvre type.",
          "Ce regard ? C’est juste pour faire le dur, mais on sait tous que c’est du vent.",
          "T'es là à essayer de ressembler à un méchant, mais tout ce que tu fais c’est agiter ta petite épée.",
          "Ce regard ne fait peur à personne, désolé de te le dire.",
          "Arrête de jouer à celui qui va tout casser, t'es juste ridicule.",
          "Tu veux nous faire croire que t’es quelqu’un de puissant avec ce regard ? Sérieusement ?",
          "Si tu crois que ce regard est intimidant, tu te fourres le doigt dans l'œil."
        ]
      },

      "🥱": {
        admin: [
          "Maître, un bâillement ? Vous devez être épuisé. Prenez un peu de repos.",
          "Maître, le sommeil vous appelle. Reposez-vous, je prendrai soin de tout en votre absence.",
          "Vous avez l’air fatigué, Maître. Ne vous inquiétez pas, tout sera pris en charge.",
          "Votre énergie semble épuisée, Maître. Si vous avez besoin de calme, je suis là.",
          "Le repos est essentiel, Maître. Reposez-vous et rechargez vos forces.",
          "Maître, vous méritez un moment de tranquillité. N’hésitez pas à vous détendre.",
          "La fatigue se lit sur votre visage, Maître. Prenez soin de vous avant tout."
        ],
        user: [
          "C’est pas un bâillement que t’as, c’est un cri d'ennui profond.",
          "Si tu veux vraiment dormir, tu peux toujours quitter cette conversation.",
          "Bâiller comme ça, c’est carrément un cri de détresse. T’es fatigué de ta propre vie ou quoi ?",
          "Tu te fais tellement chier que tu bâilles sans raison ? Ah, je comprends.",
          "Il faudrait peut-être que tu te réveilles, ça ne fait pas bonne figure tout ça.",
          "T’as l’air d’un zombie. Si tu veux vraiment dormir, fais-le en paix.",
          "T’as pas d’autre moyen de communiquer ton ennui ? Un peu plus créatif, peut-être ?"
        ]
      },

      "💀": {
        admin: [
          "Maître, ce symbole de mort vous représente-t-il vraiment ? Ou est-ce un clin d'œil à votre pouvoir infini ?",
          "Ce symbole macabre, Maître… Serait-ce une nouvelle stratégie de domination ?",
          "Votre regard et ce symbole sont synonymes de force, Maître. Rien ne peut vous arrêter.",
          "Un signe de votre maîtrise absolue sur tous ceux qui se dressent devant vous, Maître.",
          "Vous êtes celui qui écrit votre propre destin, Maître. Ce symbole n’est qu’un reflet de votre grandeur.",
          "Ce symbole de mort vous va à merveille, Maître. La fin de tout obstacle est proche.",
          "Maître, vous êtes celui qui dirige même la fin. Vous êtes invincible."
        ],
        user: [
          "C’est quoi ce délire ? T’as vraiment envie de jouer à faire le malin avec ce symbole ?",
          "Un crâne ? Oh, c’est cool… vraiment. T’as vraiment trouvé ça impressionnant ?",
          "C’est le genre de symbole qu’on choisit quand on veut trop en faire pour se donner un genre.",
          "Tu crois que ça fait peur ? C’est plus risible qu’autre chose.",
          "C’est pour effrayer qui, exactement ? Parce que moi, je me marre.",
          "T’as des ambitions de super-méchant ou tu veux juste attirer l’attention avec ce truc ?",
          "Oh, cool, un crâne. T’as vraiment rien de mieux à afficher pour te donner un genre ?"
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
module.exports = {
  config: {
    name: "emoji_reponses",
    version: "1.2",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses aux emojis",
    longDescription: "Réponses adaptées aux emojis liés aux émotions physiques ou de santé, avec respect pour l’admin.",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();
    const userID = event.senderID;
    const adminID = "61563822463333"; // Ton UID Telegram (Ajoute d'autres admins en liste si besoin)

    // Liste des réponses en fonction des emojis
    const responses = {
      "🤮": {
        admin: [
          "Oh Maître, qu'est-ce qui vous dégoûte ainsi ? 😢",
          "Maître, quelque chose ne va pas ? Dites-moi tout.",
          "Que puis-je faire pour vous aider, Maître ? 🙏"
        ],
        user: [
          "T’as goûté à quoi pour être dans cet état ? Une vérité trop dure à avaler ?",
          "Respire, bois un verre d’eau, et essaie d’oublier ce que t’as vu.",
          "C’est ton miroir qui t’a mis dans cet état ou c’est autre chose ?"
        ]
      },

      "😴": {
        admin: [
          "Vous avez besoin de repos, Maître ? Prenez soin de vous. 😴",
          "Même les grands esprits doivent se reposer, Maître.",
          "Dors bien, Maître. Je veillerai sur tout en votre absence. 👀"
        ],
        user: [
          "Oh, je t’ennuie ? Tant mieux, au moins tu dors moins bête.",
          "Tu ronfles ou c’est juste ton cerveau qui éteint la lumière ?",
          "On dirait que même toi, tu trouves ta vie soporifique."
        ]
      },

      "😪": {
        admin: [
          "Maître, êtes-vous fatigué ? Je peux faire quelque chose pour vous aider ?",
          "Vous avez eu une longue journée, reposez-vous bien, Maître.",
          "Même un chef a besoin de sommeil. Prenez soin de vous, Maître."
        ],
        user: [
          "Oh, t’as laissé échapper une larme ou c’est juste ta paresse qui transpire ?",
          "On dirait que t’as besoin d’un oreiller et d’une bonne dose de motivation.",
          "Arrête de bâiller, t’aspirerais presque ma patience."
        ]
      },

      "🤧": {
        admin: [
          "Maître, vous êtes malade ? Prenez soin de vous ! 😷",
          "Prenez un mouchoir, Maître. Votre bien-être est prioritaire.",
          "Que puis-je faire pour vous aider à aller mieux, Maître ?"
        ],
        user: [
          "Santé ! Mais éloigne-toi, j’ai pas envie d’attraper ta mauvaise humeur.",
          "T’as attrapé quoi ? Un rhume ou juste le virus de la nullité ?",
          "Ah, c’est le rhume ou la tristesse de te voir échouer au quotidien ?"
        ]
      },

      "🤕": {
        admin: [
          "Maître, vous êtes blessé ? Que puis-je faire pour vous aider ? 😢",
          "Prenez soin de vous, Maître. Vous êtes important.",
          "Besoin d’un médecin, Maître ? Je peux chercher des solutions pour vous."
        ],
        user: [
          "T’as mal à la tête ? Ça arrive quand on pense trop fort, surtout pour toi.",
          "C’est quoi, un coup de la vie ou juste une migraine de paresse ?",
          "T’as essayé de réfléchir et voilà le résultat. Triste, hein ?"
        ]
      },

      "😷": {
        admin: [
          "Maître, vous vous sentez mal ? Je suis là pour vous.",
          "Prenez soin de vous, Maître. Ne forcez pas trop.",
          "Maître, avez-vous besoin de quelque chose ?"
        ],
        user: [
          "Mets un masque, mais pas juste pour le COVID. Protège-nous de tes idées aussi.",
          "T’es malade ou juste asocial ? Les deux, peut-être ?",
          "Ah, ça doit être dur de respirer… surtout quand t’as une conscience lourde."
        ]
      }
    };

    if (responses[emoji]) {
      const replyList = userID === adminID ? responses[emoji].admin : responses[emoji].user;
      const reply = replyList[Math.floor(Math.random() * replyList.length)];
      return message.reply(reply);
    }
  }
};
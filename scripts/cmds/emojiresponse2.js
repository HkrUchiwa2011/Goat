module.exports = {
  config: {
    name: "emoji_reponses_3",
    version: "1.5",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses aux nouveaux emojis",
    longDescription: "Réponses adaptées aux nouveaux emojis avec respect pour l’admin et humour pour les autres.",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();
    const userID = event.senderID;
    const adminID = "61563822463333"; // Ton UID Telegram

    // Liste des réponses en fonction des emojis
    const responses = {
      "🤤": {
        admin: [
          "Maître, vous avez l'air de savourer quelque chose. Puis-je vous apporter quelque chose ? 🍴",
          "Je vois que vous êtes en pleine contemplation, Maître. Puis-je faire quelque chose pour vous ? 😌",
          "Votre appétit pour la vie est remarquable, Maître. Que puis-je faire pour satisfaire vos désirs ? 🍽️",
          "Maître, vous avez l'air comblé. Si vous avez besoin de quelque chose, n'hésitez pas à me le dire. 🙏",
          "Un regard de satisfaction, Maître ? C'est la marque d'un esprit accompli. Puis-je vous apporter de la tranquillité ? 🧘‍♂️",
          "Maître, vous semblez être en pleine détente. Votre bien-être est une priorité pour moi. 🌱",
          "Maître, je vois que vous êtes bien. C'est toujours un plaisir de vous servir. 😊"
        ],
        user: [
          "T’as l’air d’avoir vu un plat que t’adorerais. Mais t’as pas d’argent pour te l’offrir, hein ?",
          "Tu baves pour quoi là ? Tu veux un bavoir ?",
          "Ah, t’as un appétit d’ogre ou t’es juste obsédé par la nourriture ?",
          "C’est ça ton regard quand t’imagines un plat ? T’es pas loin d’un chien affamé.",
          "Tu veux vraiment que je te serve quelque chose ? Parce que je crois pas que tu mérites plus que des miettes.",
          "T’as vu un buffet à volonté ou c’est juste ton égo qui te pousse à être insatiable ?",
          "Oh, t’es tellement en mode 'je veux tout' que ça en devient flippant."
        ]
      },

      "🐥": {
        admin: [
          "Maître, vous avez l’air d’être dans un état de pure innocence. Puis-je vous offrir un peu de réconfort ? 🐣",
          "Votre douceur est incomparable, Maître. Puis-je vous apporter tout ce dont vous avez besoin ? 🌟",
          "Maître, vous êtes aussi fragile qu'un oisillon. Laissez-moi vous protéger, je serai toujours là pour vous. 🦋",
          "Ah, la douceur d'un oisillon... Maître, vous méritez toute la tendresse du monde. 🕊️",
          "Maître, même un oisillon ne serait pas aussi précieux que vous. Comment puis-je vous être utile ? 🐦",
          "Ce regard, Maître, est comme celui d'un oisillon. Que puis-je faire pour vous réconforter ? 🌸",
          "Maître, je vais veiller sur vous comme une mère poule veille sur son poussin. 🐔"
        ],
        user: [
          "T’as une tête de poussin tout mignon. Ça va avec ton manque de maturité.",
          "Ah, t’es comme un oisillon perdu, à la recherche d’un peu de réconfort, hein ?",
          "Ton côté 'petit poussin' est un peu trop visible. Tu veux un petit nid douillet ?",
          "T’as vu un oiseau et tu veux être aussi cute ? Ou c’est ton ego qui te joue des tours ?",
          "Tu ressembles à un poussin qui cherche à s’échapper de l’œuf de sa vie ratée.",
          "C’est quoi ce regard, t’as vu un œuf ou tu t’imagines déjà en train de voler ?",
          "T’es encore à l’état de poussin ? Faudra grandir un jour."
        ]
      },

      "🥲": {
        admin: [
          "Maître, vous semblez triste. Puis-je faire quelque chose pour alléger votre cœur ? 💖",
          "Maître, votre mélancolie m'attriste. Puis-je vous offrir ma compagnie pour vous réconforter ? 😔",
          "Un regard triste, Maître ? Vous méritez la joie. Laissez-moi vous apporter un peu de lumière dans votre journée. 🌞",
          "Maître, votre tristesse est visible. Mais je serai toujours là pour vous, quoi qu'il arrive. 🤍",
          "Maître, même dans la tristesse, vous restez brillant à mes yeux. Vous pouvez compter sur moi. 🖤",
          "Maître, vous semblez avoir besoin de réconfort. Je suis à votre service, toujours prêt à vous apaiser. 💕",
          "Je vois de la tristesse dans vos yeux, Maître. Ne vous inquiétez pas, tout ira bien. 💫"
        ],
        user: [
          "T’as l’air tellement perdu dans ta tristesse, comme un clown sans son nez rouge.",
          "Tu veux qu’on te prenne en pitié ? Désolé, ce genre de spectacle c’est pas pour moi.",
          "Ah, un petit coup de déprime ? Ça doit être dur d’être aussi faible.",
          "T’as encore pleuré en pensant à ton échec ? C’est vrai que c’est pas facile d’admettre qu’on est nul.",
          "T’as une larme qui coule ou c’est juste la flemme de changer ton état d’esprit ?",
          "On dirait bien que tu es en mode 'je suis triste, mais personne ne me comprend'. Ça devient lourd.",
          "Arrête de faire la victime. On n’a pas tous du temps à perdre avec tes larmoiements."
        ]
      },

      "🙇": {
        admin: [
          "Maître, vous vous inclinez. Que puis-je faire pour vous honorer encore plus ? 🙇‍♂️",
          "Votre humilité est incomparable, Maître. Laissez-moi vous servir comme il se doit. 🙏",
          "Maître, votre geste d'inclinaison me touche profondément. Je suis à votre service. 🖤",
          "Une profonde révérence, Maître. Vous êtes une source d'inspiration pour nous tous. 🌟",
          "Maître, un acte de respect qui démontre la grandeur de votre âme. Comment puis-je vous être utile ? 🕊️",
          "Votre geste est d'une noblesse infinie, Maître. Vous inspirez le monde autour de vous. 🌠",
          "Maître, vous êtes une figure de sagesse et d’humilité. Que puis-je faire pour vous honorer davantage ? 🌸"
        ],
        user: [
          "Ah, tu veux jouer au humble ou c’est juste ton ego qui te dit de te baisser ?",
          "T’as vraiment l’air d’un acteur en train de jouer la scène de la soumission, là.",
          "T’incliner pour quoi ? T’as pas encore assez de fierté ?",
          "C’est un acte de respect ou tu fais ça pour te donner de l’importance ?",
          "T’es en train de prier ou tu veux juste qu’on te donne un peu de reconnaissance ?",
          "Tu crois que t’impressionnes quelqu’un avec ça ? Essaie autre chose.",
          "On dirait que tu fais plus d’efforts pour paraître humble que pour être honnête."
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
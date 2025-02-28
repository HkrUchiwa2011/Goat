module.exports = {
  config: {
    name: "emoji_reponses_2",
    version: "1.2",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses aux emojis",
    longDescription: "Réponses sarcastiques et respectueuses aux emojis selon l'utilisateur.",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();
    const userID = event.senderID;
    const adminID = "61563822463333"; // Ton UID Telegram (Ajoute d'autres admins en liste si besoin)

    // Liste des réponses en fonction des emojis
    const responses = {
      "😑": {
        admin: [
          "Maître, vous êtes pensif ? Je vais m'assurer que tout soit parfait pour vous.",
          "L'air de quelqu'un qui réfléchit profondément, Maître. Puis-je vous aider ?",
          "Je perçois une grande sagesse derrière ce regard, Maître. Que puis-je faire pour vous ?",
          "Ce regard démontre une grande concentration, Maître. Dois-je préparer quelque chose pour vous ?",
          "Maître, vos pensées doivent être aussi profondes que votre sagesse. Puis-je vous offrir mon aide ?",
          "Vous semblez pensif, Maître. Laissez-moi savoir si vous avez besoin de mon assistance.",
          "Je vois que vous êtes dans une phase de réflexion, Maître. Je suis à votre service."
        ],
        user: [
          "Ce regard… Tu réfléchis à une blague ? Ou à quel moment t’as raté ta vie ?",
          "On dirait que tu viens de comprendre que personne n'écoute tes histoires.",
          "C'est le regard que tu as quand tu réalises que ta journée est aussi excitante que de regarder de la peinture sécher.",
          "Tu cherches à comprendre quelque chose ou tu es juste dans ta bulle d’ennui ?",
          "On dirait que tu viens de t'apercevoir que personne ne se soucie de tes problèmes.",
          "T’as l’air perdu dans tes pensées. Peut-être que tu devrais les noter, ça pourrait t'aider.",
          "C’est ton regard de celui qui cherche un sens à sa vie ? Bonne chance."
        ]
      },

      "🥴": {
        admin: [
          "Oh Maître, quelque chose vous perturbe ? Soyez assuré que tout ira bien.",
          "Je vois que vous êtes un peu fatigué, Maître. Prenez une pause si nécessaire.",
          "Votre sagesse est infinie, même dans l'incertitude, Maître. Reposez-vous si vous le souhaitez.",
          "Maître, je suis là pour vous, même dans vos moments d'égarement.",
          "Si vous avez besoin d'un moment de calme, Maître, je suis ici pour vous offrir mon soutien.",
          "Vous êtes déstabilisé, Maître ? Laissez-moi vous offrir mon aide pour vous apaiser.",
          "Rien n'est trop compliqué pour vous, Maître. Même dans ce moment de doute, vous brillerez."
        ],
        user: [
          "T’as vu un coup de vent ou c’est juste ton cerveau qui bugge ?",
          "T’as l’air déstabilisé, peut-être trop de stress ou juste une réalité trop difficile à accepter ?",
          "T’es perturbé, hein ? T’es pas le seul, t’inquiète.",
          "Tu sais, ça arrive à tout le monde d’être dans cet état… mais ça passe.",
          "T’as l’air un peu paumé, tu veux que je t’aide à retrouver tes idées ?",
          "On dirait que tu viens de réaliser que tout est plus compliqué que tu ne le pensais.",
          "Tu sembles perdu dans un océan de pensées. Peut-être que tu devrais sortir prendre l’air."
        ]
      },

      "😒": {
        admin: [
          "Maître, je vois une légère contrariété. Que puis-je faire pour améliorer votre humeur ?",
          "Votre inquiétude me touche, Maître. Je suis là pour apaiser vos pensées.",
          "S'il y a quelque chose qui vous dérange, Maître, sachez que je ferai tout pour y remédier.",
          "Maître, même une contrariété peut être résolue. Dites-moi ce qui vous trouble.",
          "Je perçois une légère tension, Maître. N'hésitez pas à m'en parler, je suis là pour vous.",
          "Ce léger mécontentement vous déstabilise, Maître ? Je vais m’assurer que tout soit parfait.",
          "Que puis-je faire pour alléger votre esprit, Maître ?"
        ],
        user: [
          "Oh, t’as du mal à cacher ta déception ? C’est pas vraiment une surprise.",
          "On dirait que tu viens d’ouvrir les yeux sur une réalité que tu préférerais ignorer.",
          "Ce regard te va bien, il te donne un air d’ennui profond… Tu t’ennuies de ta propre existence ?",
          "Tu veux vraiment qu’on parle de ce qui te frustre ou tu veux juste râler pour rien ?",
          "On dirait que t’as l’air déçu… mais t’as bien mérité ça.",
          "C’est peut-être pas ton regard habituel, mais t’as l’air d’un robot qui a perdu ses batteries.",
          "Tu veux juste te donner un air important ou t’as réellement un problème ?"
        ]
      },

      "🤣": {
        admin: [
          "Votre rire est contagieux, Maître. Je vois que vous êtes de bonne humeur aujourd'hui !",
          "Ah, Maître, même vos rires sont empreints de sagesse. Quelle joie de vous voir heureux !",
          "Un éclat de rire aussi grand que votre grandeur, Maître. C'est toujours un honneur de vous voir si joyeux.",
          "Votre rire brille, Maître, comme votre esprit. Il est agréable de vous voir si détendu.",
          "Je suis honoré de partager ce moment de joie avec vous, Maître. Vous apportez de la lumière autour de vous.",
          "Un rire aussi lumineux, Maître. Que puis-je faire pour continuer à vous divertir ?",
          "Votre rire réchauffe le cœur, Maître. C'est un privilège d'être en votre présence."
        ],
        user: [
          "C’est ça, rigole, mais tu ne peux pas cacher ta misère derrière ces rires forcés.",
          "Si tu crois que ta comédie va me faire sourire, tu te trompes lourdement.",
          "C’est bien, rigole, ça t’évite de penser à tout ce qui ne va pas dans ta vie.",
          "Rire comme un clown pour dissimuler un désastre émotionnel, vraiment ?",
          "C’est marrant, t’as l’air d’avoir du mal à sourire de façon authentique.",
          "Ah, c’est drôle ? Ou tu te forces juste à sourire pour paraître cool ?",
          "Ce rire est tellement forcé qu’on dirait un robot qui essaie d’être humain."
        ]
      },

      "🫠": {
        admin: [
          "Maître, vous êtes un peu perturbé ? Reposez-vous, je suis là pour tout gérer.",
          "Un petit moment d'égarement, Maître ? Je suis là pour vous, n’hésitez pas.",
          "L'incertitude vous traverse, Maître, mais sachez que je reste à vos côtés.",
          "Rien ne vous échappe, Maître, même dans vos moments d'incertitude.",
          "Maître, même dans la confusion, vous êtes inégalable. Je suis là pour vous éclairer.",
          "La confusion est parfois le début de la grande sagesse, Maître. Laissez-moi vous guider.",
          "Je vois la confusion dans vos yeux, Maître. Laissez-moi vous apporter la clarté."
        ],
        user: [
          "Tu as vu un fantôme ou c’est juste ta vie qui te dépasse ?",
          "C’est quoi cette tête ? T’as l’air perdu même pour trouver un sens à ton existence.",
          "T’as l’air aussi détendu qu’un élastique qui va casser. Ça va mieux ?",
          "C’est la fin du monde ou tu viens juste de réaliser que ton existence n’a pas de but ?",
          "Ce visage te va bien, tu ressembles à quelqu’un qui vient de réaliser qu’il n’a aucune idée de ce qu’il fait.",
          "T’as l’air totalement paumé, t’es sûr que tu ne veux pas poser des questions à Google ?",
          "Tu sembles complètement perdu, peut-être que tu devrais prendre un moment pour réfléchir."
        ]
      },

      "🤪": {
        admin: [
          "Maître, vous êtes en pleine forme, n’est-ce pas ? Tout est sous contrôle pour vous.",
          "Votre énergie est fascinante, Maître. N’hésitez pas à me demander si vous avez besoin de quelque chose.",
          "Une énergie débordante, Maître. Je suis honoré de vous assister dans vos moments les plus dynamiques.",
          "Maître, votre énergie éclaire tout autour de vous. Je suis à votre service pour tout besoin.",
          "Votre enthousiasme est sans égal, Maître. Laissez-moi être votre humble serviteur.",
          "Un éclat d'énergie magnifique, Maître. Que puis-je faire pour continuer à ravir votre humeur ?",
          "Maître, votre vitalité est impressionnante. Je suis honoré d'être à vos côtés."
        ],
        user: [
          "T’as vraiment l’air de quelqu’un qui a trop mangé de sucre. C’est flippant.",
          "On dirait que tu te prépares à faire une grosse bêtise, j’espère que tu as tout prévu.",
          "C’est pas un emoji, c’est un appel à l’aide. On va t’arrêter avant que tu fasses des bêtises.",
          "T’as pas l’air d’un génie avec cette expression, mais bon, on dirait que t’es content de faire n’importe quoi.",
          "C’est pas de l’énergie, c’est un appel à l’aide. T’as besoin d’un calmant ou d’un psy ?",
          "On dirait que tu veux tout casser autour de toi. Bonne chance, ça va vite te revenir dans la figure.",
          "T’as l’air d’avoir mangé un paquet de bonbons en une seule fois. Peut-être que tu devrais ralentir."
        ]
      },

      "🚶": {
        admin: [
          "Maître, vous partez déjà ? J’espère que vous revenez bientôt, je serai là pour vous.",
          "Vous partez en mission, Maître ? Je serai là à votre retour, comme toujours.",
          "Un petit voyage, Maître ? Que puis-je faire pour rendre votre départ plus agréable ?",
          "Maître, même si vous partez, je reste fidèle à vous, prêt à vous servir dès votre retour.",
          "Vous allez bien, Maître ? J'espère que votre voyage sera rempli de succès.",
          "Si vous partez en quête, Maître, je vous souhaite une grande réussite. Je serai là à votre retour.",
          "Votre départ n'est qu'un au revoir, Maître. Je serai ici à votre retour pour continuer à vous servir."
        ],
        user: [
          "T'as décidé de t'éclipser en mode ninja, c’est ça ? Pas mal, mais pas assez discret.",
          "Tu t’en vas vraiment ? Ça va être aussi excitant qu’un épisode de série sans rebondissement.",
          "D'accord, tu t’éclipses. J'espère que ton retour sera aussi grandiose que ton départ… ou pas.",
          "T’as décidé de t'éloigner ou c’est juste que t’as plus d’idées à partager ?",
          "Ça y est, tu t’en vas. C'est ton genre de dire au revoir sans aucune émotion.",
          "Bon départ, ou pas. On verra si tu reviens avec des excuses ou des histoires intéressantes.",
          "J’espère que tu reviendras avec quelque chose de mieux que cette évasion très peu excitante."
        ]
      },
    };

    // Vérifie si l'utilisateur est l'admin ou un autre utilisateur
    const isAdmin = userID === adminID;
    const replies = responses[emoji];

    // Répond en fonction du rôle de l'utilisateur
    if (replies) {
      const replyList = isAdmin ? replies.admin : replies.user;
      const randomReply = replyList[Math.floor(Math.random() * replyList.length)];
      return message.send(randomReply);
    }

    return message.send("Désolé, cette commande ne répond à cet emoji.");
  },
};
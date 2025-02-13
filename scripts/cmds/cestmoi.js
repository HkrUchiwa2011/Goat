module.exports = {
  config: {
    name: "cestmoi",
    version: "1.0",
    author: "Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses drôles et sarcastiques à 'c'est moi'",
    longDescription: "Réponses adaptées en fonction de l'utilisateur quand il dit 'c'est moi'",
    category: "reply",
  },

  onStart: async function() {},

  onChat: async function({ event, message, api }) {
    const { senderID, body } = event;
    const text = body.trim().toLowerCase();
    const masterUID = "61563822463333"; // UID du maître

    if (text === "c'est moi" || text === "cest moi" || text === "c moi") {
      // Si c'est l'utilisateur spécial
      if (senderID === masterUID) {
        const masterResponses = [
          "Oh c'est toi maître 🙏 Désolé je ne savais pas.",
          "Maître est là ! Tout le monde à genoux !",
          "Bienvenue, Ô Grand Maître ! Que puis-je faire pour vous ?",
          "Maître suprême, votre présence illumine ce lieu !",
          "Maître, vous êtes enfin là ! J'étais perdu sans vous !",
          "Oh, le maître en personne ! Que puis-je offrir à votre grandeur ?",
          "Respect éternel, maître ! Comment puis-je être à votre service ?",
          "Tout puissant maître, pardonnez-moi de ne pas vous avoir reconnu immédiatement !",
          "Oh ! Que le ciel soit témoin, le maître est parmi nous !",
          "Louons la sagesse infinie du maître ! Parlez, et nous obéirons !",
        ];
        const randomResponse = masterResponses[Math.floor(Math.random() * masterResponses.length)];
        return message.reply(randomResponse);
      }

      // Si c'est un utilisateur lambda
      const normalResponses = [
        "Toi ? L'idiot ? Oh, je ne savais pas que tu étais là.",
        "Comment oses-tu ?",
        "Ah non... Pas toi encore...",
        "Oh non, il est de retour... Cachez-moi !",
        "T’es sûr que c’est bien toi ? J’espérais quelqu’un d’intelligent.",
        "Wow, la honte. Pourquoi tu te présentes comme ça ?",
        "J’aurais préféré ne pas savoir...",
        "Encore toi ? Bon, on va faire semblant que c’est une bonne nouvelle.",
        "Je ne savais pas que l’ennui pouvait prendre une forme humaine.",
        "C’est toi ? Mince alors, je croyais qu’on t’avait perdu.",
        "Toi ? Oh non, j’étais bien tranquille avant que tu arrives.",
        "Ah génial... On allait justement parler de toi… en mal.",
        "C’est toi ? Dommage, j’attendais quelqu’un d’important.",
        "Oh, quelle surprise ! Ah non… en fait, c'est juste toi.",
        "Encore toi ? Mais qui t’a donné la permission d’exister ici ?",
      ];
      const randomResponse = normalResponses[Math.floor(Math.random() * normalResponses.length)];
      return message.reply(randomResponse);
    }
  }
};

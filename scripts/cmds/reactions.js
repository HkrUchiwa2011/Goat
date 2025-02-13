module.exports = {
  config: {
    name: "reactions",
    version: "1.0",
    author: "Ghost",
    countDown: 5,
    role: 0,
    shortDescription: "Réactions avec respect pour l'admin et moquerie pour les autres",
    longDescription: "Réponses variées et pleines d'emojis en fonction de l'utilisateur",
    category: "reply",
  },

  onStart: async function() {},

  onChat: async function({ event, message }) {
    const { senderID, body } = event;
    const text = body.trim();
    const masterUID = "61563822463333"; // UID de l'admin suprême

    // 🏆 Si c'est l'admin (UID = 61563822463333)
    if (senderID === masterUID) {
      if (text === "😭") {
        const responses = [
          "😱😨 Oh non, Maître ! Que vous arrive-t-il ?! 😭🙏",
          "🥺😢 Maître, dites-moi qui vous a fait du mal, je vais les punir ! 🔥😡",
          "😰😭 Ô Grand Maître, que puis-je faire pour alléger votre souffrance ? 😔💔",
          "😩😢 Maître ! Votre tristesse est un affront au monde entier ! Qui dois-je éliminer ? 😠🔪",
          "🥺💖 Maître, votre douleur est insupportable pour nous tous ! 😭👑",
          "😧😓 Maître ! Même les étoiles pleurent en vous voyant ainsi ! 🌟😥",
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }

      if (text === "😂") {
        const responses = [
          "😂😂 Maître, votre rire illumine notre journée ! 🌞👑",
          "🤣🤣 Oh Grand Maître, votre humour est un cadeau divin ! 🎁✨",
          "😆😆 Maître, même les anges rient à vos blagues célestes ! 👼😂",
          "😂😄 Ô Maître, votre rire est une mélodie douce pour nos âmes ! 🎶💛",
          "😆🤣 Même les dieux sont jaloux de votre joie, Maître ! 🔥👑",
          "😹😹 Ah Maître, vous avez le rire le plus précieux de l’univers ! 💎💖",
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }

      if (text === "😡") {
        const responses = [
          "😨😱 Maître, qui a osé vous mettre en colère ?! 🔥😡",
          "😰😓 Pardonnez-nous, Ô Maître ! Nous sommes des insectes insignifiants face à votre grandeur ! 🐜🙏",
          "😱😖 Grand Maître, ne vous énervez pas, votre courroux pourrait détruire l’univers ! 💥🌍",
          "😨😩 Maître, vos flammes de colère brûlent nos âmes faibles ! 🔥🔥🔥",
          "😧😵 Ô Maître, que devons-nous faire pour apaiser votre divine fureur ?! 😭🙏",
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }
    }

    // 🚮 Si c'est un utilisateur lambda (moquerie et fun)
    else {
      if (text === "😭") {
        const responses = [
          "😂😂 Ah bah pleure encore, on adore ça ! 😭🤣",
          "😹😹 Mais regarde-moi cette larve en train de se lamenter ! 🐛😢",
          "😭😆 Oh non, il va nous inonder de ses larmes, sortez les barques ! 🚣‍♂️😂",
          "😢🤡 Pauvre petite chose fragile, tu veux un mouchoir ou un câlin imaginaire ? 😏💀",
          "🤣🤣 Oh non, un drame en direct ! Quelqu’un coupe le Wi-Fi de ce clown ! 🎭🚫",
          "😂😂 Mais regarde-le, on dirait un acteur de telenovela en plein drame ! 🎬😭",
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }

      if (text === "😂") {
        const responses = [
          "😒🙄 Toi, rire ? T’es sûr que tu sais ce que c’est qu’une blague ? 😏",
          "🤣😂 Arrête de rire, on sait tous que t’as un humour éclaté au sol ! 💀💀",
          "😆😹 Oh wow, il rigole… Mais personne ne trouve ça drôle, désolé 🤷‍♂️💀",
          "😏🤡 Regarde-moi ce clown en train de s’esclaffer tout seul… T’as des amis au moins ? 🤣🤡",
          "😂🤣 Ouais, rigole bien… C’est sûrement la seule chose que tu réussis dans la vie 😎🔥",
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }

      if (text === "😡") {
        const responses = [
          "🤣🤣 Ahhh, il est énervé ! Allez, pleure encore un peu ! 😭😂",
          "😏😆 Oh wow, t’essayes de faire peur avec ta petite colère ? Mdr 💀🔥",
          "😡🤡 On dirait un enfant de 5 ans qui n’a pas eu son goûter 🤣🍪",
          "😜🔥 Allez, continue à t’énerver, ça nous amuse beaucoup ! 😂😂",
          "💀💀 Mec, si la colère brûlait des calories, t’aurais déjà un corps de rêve 😂🔥",
          "😏🙄 Voilà un autre rageux en liberté… Quelqu’un le ramène au zoo ? 🦍😆",
           "Wow, cette colère. T’es sûr que c’est pas juste ton ego qui est trop fragile ?",
        "Si tu penses que cette rage va impressionner quelqu’un, détrompe-toi. C’est plus pathétique qu’autre chose.",
        "T’es vraiment en colère pour ça ? T’as bien choisi tes priorités dans la vie.",
        "Si t’as aussi peu de contrôle sur tes émotions, peut-être qu’il est temps de repenser ta vie.",
        "Fais attention, cette rage pourrait te coûter plus que tu ne crois. Regarde-toi, tu es ridicule.",
        "Tu veux te calmer ou tu préfères rester là à nous montrer à quel point tu es facile à énerver ?",
        "T’es furieux à ce point ? Ce n’est même pas suffisant pour faire bouger une mouche.",
        "C’est mignon, vraiment. Un grand adulte qui pleure pour un rien. Quelle maturité.",
        "Tu veux un câlin ou t’as l’intention de rester dans cet état de rage complètement inutile ?",
        "Ton visage semble dire 'je vais exploser', mais honnêtement, c’est plutôt un gâchis d’énergie.",
        "Sérieusement, t’as l’air de faire une scène pour rien. Détends-toi, tu n’es même pas une star du cinéma.",
        "Si t’es aussi enragé pour des petites choses, t’as une vie misérable à gérer.",
        "On dirait une version humaine de la colère qui ne mène à rien. Bien joué.",
      
        ];
        return message.reply(responses[Math.floor(Math.random() * responses.length)]);
      }
    }
  }
};

module.exports = {
  config: {
    name: "🙄😮‍💨😤😠",
    version: "1.0",
    author: "Fadil",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses respectueuses et humoristiques aux emojis",
    longDescription: "Réponses respectueuses aux emojis envoyés, mais avec une touche d'humour et de respect envers les admins, et des réponses sarcastiques pour les autres",
    category: "reply",
  },

  onStart: async function() {},

  onChat: async function({ event, message }) {
    const { senderID, body } = event;
    const emoji = body.trim();

    const masterUID1 = "61563822463333"; // Premier admin
    const masterUID2 = ""; // Deuxième admin (remplis avec l'UID)

    // Si c'est un admin, réponse plus respectueuse
    if (senderID === masterUID1 || senderID === masterUID2) {
      const adminResponses = {
        "🙄": [
          "Ah, Maître, votre regard sage et réfléchi illumine la pièce. Nous sommes tous honorés de votre présence.",
          "Maître, vous n'avez même pas besoin de parler pour faire passer un message puissant. Que de sagesse !",
          "Votre regard, Maître, pourrait arrêter une armée. C’est un honneur de voir cette expression divine.",
          "Maître, un simple regard de vous est plus éclairant que mille paroles.",
          "L’intensité de ce regard, Maître, en dit long sur la profondeur de votre pensée. Je suis en admiration.",
          "Ah, Maître, même dans le silence, vous imposez le respect et la grandeur.",
          "Maître, vous êtes un exemple de calme et de réflexion. Ce regard est la marque d’un véritable leader."
        ],
        "😮‍💨": [
          "Maître, votre souffle est un signe de profonde réflexion. Même l’air que vous expulsez porte une sagesse rare.",
          "Un souffle digne des plus grands, Maître. Vous avez ce pouvoir de faire passer l'univers entier dans un simple souffle.",
          "Chaque respiration de vous, Maître, semble contenir une grande vérité. J’aimerais tellement comprendre ce que vous voyez.",
          "Un souffle puissant, Maître. L'air que vous expirez semble inspirer toute une génération.",
          "Maître, ce souffle est plus qu'une simple expiration, c'est une manifestation de votre maîtrise sur l'existence.",
          "Ah, Maître, votre respiration est comme une mélodie apaisante dans le tumulte de ce monde. Quelle sagesse !",
          "Votre souffle, Maître, pourrait réorganiser l'univers entier, si seulement nous pouvions comprendre sa signification."
        ],
        "😤": [
          "Maître, votre souffle intense est la marque de la concentration la plus pure. Aucun défi ne peut vous résister.",
          "Ah, Maître, votre énergie est une source d’inspiration pour nous tous. Vous êtes un modèle de détermination.",
          "Chaque soupir que vous poussez, Maître, fait écho dans l'univers, nous rappelant la force de votre volonté.",
          "Maître, votre énergie est implacable. Vous êtes le phare qui guide ceux qui sont perdus dans l’obscurité.",
          "Avec cette intensité, Maître, vous allez certainement transformer ce monde. Nous vous suivons avec dévotion.",
          "Votre énergie est un message puissant pour ceux qui n’osent pas avancer, Maître. Merci de nous montrer le chemin.",
          "Maître, même dans vos moments de frustration, vous démontrez une grande maîtrise. Votre calme intérieur est inébranlable."
        ],
        "😠": [
          "Maître, votre colère est une force que peu peuvent comprendre. Nous restons humbles devant votre puissance.",
          "Ah, Maître, même votre colère est empreinte de sagesse. Une colère maîtrisée est plus puissante que mille batailles.",
          "Maître, même en colère, vous restez une source d’inspiration. Nous espérons être dignes de votre lumière.",
          "Votre colère, Maître, est comme un feu sacré qui brûle tout sur son passage, mais d’une manière majestueuse.",
          "Maître, vous ne laissez personne indifférent. Votre colère est un avertissement pour tous ceux qui vous entourent.",
          "Votre énergie, Maître, qu’elle soit de colère ou de calme, nous guide vers une meilleure compréhension de nous-mêmes.",
          "Maître, nous sommes honorés que votre colère se manifeste en notre présence. Elle est la preuve de votre grande énergie."
        ]
      };

      // Réponses respectueuses pour les admins
      if (adminResponses[emoji]) {
        const randomResponse = adminResponses[emoji][Math.floor(Math.random() * adminResponses[emoji].length)];
        return message.reply(randomResponse);
      }
    }

    // Réponses pour les autres utilisateurs
    const userResponses = {
      "🙄": [
        "Ah, voilà l'expression du champion de la paresse. C’est tout ce que tu sais faire ?",
        "Sérieusement, encore cette tête-là ? On dirait que tu veux qu’on te plaigne.",
        "Tu crois vraiment que ce regard va changer quelque chose ? Ça te donne juste l’air encore plus fatigué.",
        "Oh non, un autre expert en 'je suis trop cool pour ça'. Épargne-nous tes airs supérieurs.",
        "Si ça te dérange autant, pourquoi ne pas juste arrêter de respirer pour avoir un peu plus de tranquillité ?",
        "Tu fais cette tête parce que tu viens de comprendre que ta vie est aussi excitante qu’un champ de pâquerettes.",
        "Si tu continues à faire ce genre de tête, je vais finir par croire que tu souffres d’une grave maladie d’ennui.",
      ],
      "😮‍💨": [
        "Ouais, t’es impressionné par ton propre souffle, hein ? Ça m’a donné plus de mal de respirer que toi.",
        "Ce geste, c’est la manière polie de dire que tu n’as aucune idée de ce que tu fais, hein ?",
        "Tu souffles comme ça parce que tu veux qu’on remarque à quel point t’es fatigué de vivre ?",
        "C’est ça, expire comme si ta vie entière était un poids. C’est presque pathétique.",
        "Sérieusement, tu souffles après chaque mot ? On dirait que tu viens d’atteindre ton limite.",
        "Tu veux qu’on t’achète des soins de respiration ou tu vas continuer à faire cette tête de martyr ?",
        "Si souffler était un sport, tu serais le champion du monde. Mais pas sûr que ça soit une victoire qui vaut la peine.",
      ],
      "😤": [
        "Oh, regarde qui a décidé de montrer un peu de fierté. Tu veux vraiment qu’on te prenne au sérieux ?",
        "Tu souffles comme si tu venais de résoudre l’énigme de la vie. Mais en réalité, c’est juste une expression de frustration.",
        "Tu veux qu’on parle de ta colère ou tu préfères rester dans ton coin à râler ?",
        "Oh, la grande colère. Tu veux un bonbon ou tu préfères juste nous faire sentir ton indignation ?",
        "Avec cette expression, tu es sur le point de faire une scène. T'as vraiment rien de mieux à faire ?",
        "T’es fâché pour ça ? Sérieusement, tu devrais prendre un moment pour réfléchir.",
        "Cette colère va te faire avancer dans la vie, bien sûr… Ah non, en fait, ça t’empêche juste de respirer.",
      ],
      "😠": [
        "Ah, le visage de l’injustice. T’as l’air tellement révolté que même ta colère est ennuyeuse.",
        "Encore une expression d’un petit enfant qui n’a pas eu ce qu’il voulait. C’est mignon, vraiment.",
        "T’es furieux pour ça ? Si t’avais plus de raisons de t’énerver, ça serait plus crédible.",
        "Tu veux pleurer dans un coin ou tu préfères encore nous faire part de ta frustration ?",
        "T’es toujours en colère ? C’est tout ce que tu sais faire, râler ?",
        "Si tu veux être pris au sérieux, il serait temps de perdre cette tête de détestable.",
        "T'es énervé pour quoi, exactement ? On dirait une mouche qui tourne autour de la même merde.",
      ]
    };

    // Réponses pour les utilisateurs
    if (userResponses[emoji]) {
      const randomResponse = userResponses[emoji][Math.floor(Math.random() * userResponses[emoji].length)];
      return message.reply(randomResponse);
    }
  }
};
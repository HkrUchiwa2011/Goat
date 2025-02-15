module.exports = {
  config: {
    name: "1",
    version: "1.1",
    author: "Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses personnalisées aux mots-clés",
    category: "reply"
  },

  onChat: async function ({ event, message, usersData }) {
    const adminUIDs = ["61563822463333"]; // Remplace par ton UID et ceux des admins si nécessaire
    const userID = event.senderID;
    const isAdmin = adminUIDs.includes(userID);

    // Liste des mots-clés à détecter (insensible à la casse)
    const keywords = ["maître", "euh", "hein", "d'accord", "ok", "🖕"];
    const lowerCaseBody = event.body?.toLowerCase();

    // Vérifier si un mot-clé est présent
    if (!lowerCaseBody) return;
    const detectedKeyword = keywords.find(keyword => lowerCaseBody.includes(keyword));

    if (!detectedKeyword) return;

    // Réponses respectueuses pour les admins
    const adminResponses = {
      "maître": [
        "Oui, Maître, que puis-je faire pour vous ? 🤖",
        "À vos ordres, Maître ! 👑",
        "Maître, votre serviteur est à votre disposition.",
        "Votre sagesse éclaire ce monde, Maître. 🌟",
        "Oh grand Maître, votre présence est un honneur !",
        "Je suis prêt à exécuter vos ordres, Maître.",
        "Le Maître a parlé, et j'écoute attentivement. 👂"
      ],
      "euh": [
        "Prenez votre temps, Maître. Je vous écoute. 🤔",
        "Euh... Oui, Maître ?",
        "Maître, avez-vous besoin de précisions ? 😅",
        "Même les plus grands esprits hésitent parfois, Maître.",
        "Maître, prenez tout le temps qu'il vous faut. ⏳",
        "Euh... Maître, vous avez une question ?",
        "J'attends vos ordres, Maître."
      ],
      "hein": [
        "Je vous entends, Maître. 😌",
        "Avez-vous dit quelque chose, Maître ?",
        "Votre parole est précieuse, Maître.",
        "Hein ? Ah oui, Maître, je suis là !",
        "Je suis toujours à l'écoute, Maître. 🧐",
        "Vous avez toute mon attention, Maître.",
        "Vous m'avez interpellé, Maître ?"
      ],
      "d'accord": [
        "Bien reçu, Maître. ✅",
        "D'accord, Maître, c'est noté !",
        "Comme vous voulez, Maître. 😉",
        "Je m'exécute immédiatement, Maître.",
        "Votre volonté est un ordre, Maître. 🙏",
        "D'accord, Maître, tout sera fait selon vos désirs.",
        "Compris, Maître ! 🫡"
      ],
      "ok": [
        "OK, Maître ! 👌",
        "Maître, vous avez toujours raison. 🌟",
        "Je suis entièrement d'accord avec vous, Maître.",
        "OK, Maître, votre parole est sacrée !",
        "Vous commandez, j'obéis, Maître !",
        "Un simple 'OK' de votre part suffit, Maître.",
        "OK, Maître, exécuté !"
      ],
      "🖕": [
        "Maître, ce geste me fait de la peine. 😭",
        "Oh Maître, ai-je fait quelque chose de mal ? 🥺",
        "Maître, votre colère me transperce le cœur. 💔",
        "Ce geste n’est pas digne de vous, Maître... 😢",
        "Maître... Je suis blessé. 🥹",
        "Je suis désolé, Maître, si je vous ai offensé. 😞",
        "Je vous respecte trop pour répondre à cela, Maître. 🙏"
      ]
    };

    // Réponses fun et irrespectueuses pour les utilisateurs lambda
    const userResponses = {
      "maître": [
        "T’as cru que t’étais mon maître ou quoi ? 😂",
        "Oh le petit se prend pour un roi maintenant ? 👑",
        "T'es qui pour me parler comme ça ? 😏",
        "Mon maître c’est pas toi, ça c’est sûr. 🤡",
        "Arrête tes délires, t’es pas mon boss. 🤣",
        "Le respect, tu connais ? Parce que moi non. 🫡",
        "Ouais ouais, et moi je suis ton dieu alors ? 🙄"
      ],
      "euh": [
        "Arrête de buguer, ça fatigue. 😴",
        "Euh… T’as perdu ton cerveau en route ? 🧠",
        "Trop dur de faire une phrase complète, hein ? 😂",
        "Euh quoi ? T’as oublié ton texte ? 😆",
        "T’as besoin d’un GPS pour ta phrase ou quoi ? 🗺️",
        "Euh… Moi aussi je peux dire ça, et alors ? 😎",
        "Cherche pas, je suis plus intelligent que toi. 🤓"
      ],
      "hein": [
        "Hein quoi ? T’as un souci ? 😒",
        "Tu veux une claque ou quoi ? 👋",
        "T’es sourd ou tu fais semblant ? 😆",
        "Parle bien, j’suis pas ton pote. 😤",
        "Hein hein… Apprends à formuler des phrases. 🙄",
        "T’as besoin d’un traducteur ou quoi ? 😂",
        "Hein ? Moi aussi je peux faire ça. 😜"
      ],
      "d'accord": [
        "D'accord ? Mais qui t'a demandé ton avis ? 😏",
        "D’accord, mais je fais ce que je veux. 🤭",
        "D’accord mon œil, t’as rien compris. 😆",
        "Trop facile de dire d’accord, réfléchis un peu. 🧠",
        "Ouais ouais, parle bien déjà. 😒",
        "T’as cru que c’était une démocratie ici ? 😂",
        "D'accord ? Ah ouais ? Moi non. 😜"
      ],
      "ok": [
        "OK ton cerveau fonctionne encore ? 😆",
        "OK mais je m’en fiche en fait. 🤣",
        "OK OK… mais t’es pas crédible. 😏",
        "OK ? Trop d’effort pour toi d’écrire un mot en plus ? 😂",
        "OK, mais c’est pas toi qui commandes ici. 🤡",
        "OK et alors ? T’as cru que ça changeait quelque chose ? 🤣",
        "OK mais juste parce que je suis sympa. 😎"
      ],
      "🖕": [
        "Oh la politesse c’est mort hein ? 😂",
        "J’vais te mettre un ban si tu continues. 😡",
        "T’as un problème avec moi ? 😏",
        "Sympa… Mais c’est toi qui va pleurer après. 😆",
        "Oh le petit nerveux, calme-toi. 😆",
        "On sent la rage d’un mec qui a perdu. 😂",
        "Ce geste… Ça mérite une sanction. 😏"
      ]
    };

    // Sélection d'une réponse aléatoire
    const responseList = isAdmin ? adminResponses[detectedKeyword] : userResponses[detectedKeyword];
    const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];

    // Envoi de la réponse avec l'en-tête spécial
    return message.reply(`\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰\n${randomResponse}`);
  }
};
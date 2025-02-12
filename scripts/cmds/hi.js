const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "hi",
    version: "1.3",
    author: "Raphael Ilom",
    countDown: 5,
    role: 0,
    shortDescription: "Hii",
    longDescription: "Auto bot reply to your message",
    category: "no prefix",
  },

  onStart: async function() {
    console.log('Command "menyapa" has started.');
  },

  onChat: async function({ event, message, getLang, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      const triggerWords = ["hi", "hello", "hey", "hiya", "greetings", "salutations", "howdy"];
      const replies = [
        "Qui t'a donné la permission de me saluer🙂",
        "Hello! How can I assist you today? 😊",
        "Salut le minable que veux-tu ?",
        "Arrête bordelement de saluer et pose ta question 🌟",
        "C'est une première. Depuis quand tu salue toi? ? T'as une meuf ? 😅 🤗",
        "Tu me salue avec respect, ok? 😃",
        "Je déteste les salutations. Et ça me met en rogne que ça soit toi, le nul🛠",
      ];

      if (triggerWords.includes(word)) {
        api.setMessageReaction("💗", event.messageID, event.messageID, api);
        const randomIndex = Math.floor(Math.random() * replies.length);
        message.reply({
          body: replies[randomIndex],
        });
      }
    }
  },
};

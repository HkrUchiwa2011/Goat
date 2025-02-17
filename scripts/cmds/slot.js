module.exports = {
  config: {
    name: "slot",
    version: "1.1",
    author: "Ronald",
    role: 0,
    shortDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    longDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    category: "game",
    guide: {
      en: "{p}slot {money} / reply to gift box by number"
    }
  },

  onStart: async function ({ args, message, event, api, usersData }) {
    try {
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount <= 0) {
        return message.reply("🍀𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐅𝐨𝐮𝐫𝐧𝐢𝐫 𝐮𝐧 𝐦𝐨𝐧𝐭𝐚𝐧𝐭 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 𝐕𝐚𝐥𝐢𝐝𝐞..💚");
      }

      const senderID = event.senderID;

      // Récupérer les données de l'utilisateur dans balance.json
      const userData = await usersData.get(senderID);

      if (amount > userData.money) {
        return message.reply("❌𝐃𝐞́𝐬𝐨𝐥𝐞́ 𝐭𝐮 𝐧'𝐚𝐢 𝐩𝐥𝐮𝐬 𝐝'𝐚𝐫𝐠𝐞𝐧𝐭 𝐩𝐨𝐮𝐫 𝐣𝐨𝐮𝐞𝐫 𝐚̀ 𝐜𝐞 𝐣𝐞𝐮𝐱..💚");
      }

      const sentMessage = await message.reply("🎁 🎁 🎁");

      const emojis = ['😂', '😂', '💵'];
      emojis.sort(() => Math.random() - 0.5); 

      const shuffledEmojis = emojis.join('');

      const gemPosition = emojis.indexOf('💵');

      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: "slot",
        messageID: sentMessage.messageID,
        correctAnswer: gemPosition,
        amount: amount,
        senderID: senderID
      });

    } catch (error) {
      console.error("😐𝐋𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐒𝐥𝐨𝐭:", error);
      message.reply("😐𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐬'𝐞𝐬𝐭 𝐩𝐫𝐨𝐝𝐮𝐢𝐭𝐞");
    }
  },

  onReply: async function ({ message, event, Reply, api, usersData }) {
    try {
      if (!event || !message || !Reply) return; 
      const userAnswer = event.body.trim();

      if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 3) {
        return message.reply("🎁 𝗥𝗲𝗽𝗼𝗻𝗱𝗲𝘇 𝗽𝗮𝗿 1 ; 2 𝗼𝘂 3.");
      }

      const gemPosition = Reply.correctAnswer;
      const chosenPosition = parseInt(userAnswer) - 1; 

      const senderID = Reply.senderID;
      const userData = await usersData.get(senderID);

      // Vérifier si l'utilisateur a gagné ou perdu
      if (chosenPosition === gemPosition) {
        const winnings = Reply.amount * 2;
        // Mettre à jour le solde dans balance.json
        userData.money += winnings;
        await usersData.set(senderID, { money: userData.money });
        await message.reply(`🎉 𝗙𝗲́𝗹𝗶𝗰𝗶𝘁𝗮𝘁𝗶𝗼𝗻𝘀 𝘁𝘂 𝗮𝘀 𝗴𝗮𝗴𝗻𝗲́ 🍀${winnings}🍀 balles 💚.`);
      } else {
        const lostAmount = Reply.amount;
        // Mettre à jour le solde dans balance.json
        userData.money -= lostAmount;
        await usersData.set(senderID, { money: userData.money });
        await message.reply(`❌𝐃𝐞𝐬𝐨𝐥𝐞́ 𝐭𝐮 𝐚 𝐩𝐞𝐫𝐝𝐮 ${lostAmount}.😂`);
      }

      const emojis = ['😂', '😂', '💵'];
      const revealedEmojis = emojis.map((emoji, index) => (index === gemPosition) ? '💵' : '😂').join('');
      await api.editMessage(revealedEmojis, Reply.messageID);
    } catch (error) {
      console.error("Error while handling user reply:", error);
    }
  }
};
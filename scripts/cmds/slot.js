const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
  config: {
    name: "slot",
    version: "1.4",
    author: "Uchiha Perdu",
    role: 0,
    shortDescription: "🎰 Joue au jeu de slot avec 3 boîtes 🎁",
    longDescription: "🎰 Mise de l'argent et tente de trouver la boîte gagnante 💰",
    category: "game",
    guide: {
      en: "{p}slot {montant} ➝ pour miser\nRéponds avec 1, 2 ou 3 pour choisir une boîte 🎁"
    }
  },

  onStart: async function ({ args, message, event }) {
    try {
      const senderID = event.senderID;
      let balances = JSON.parse(fs.readFileSync(balanceFile, "utf8"));

      if (!balances[senderID]) {
        balances[senderID] = { money: 0 };
      }

      const userBalance = balances[senderID].money;
      const amount = parseInt(args[0]);

      if (isNaN(amount) || amount <= 0) {
        return message.reply("🍀 Veuillez fournir un montant valide pour jouer.");
      }

      if (amount > userBalance) {
        return message.reply("❌ Désolé, tu n'as pas assez d'argent pour jouer.");
      }

      balances[senderID].money -= amount;
      fs.writeFileSync(balanceFile, JSON.stringify(balances, null, 2));

      const sentMessage = await message.reply("🎁 🎁 🎁\nChoisis une boîte en répondant avec 1, 2 ou 3.");

      const emojis = ["💵", "😂", "😂"];
      emojis.sort(() => Math.random() - 0.5);
      const gemPosition = emojis.indexOf("💵");

      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: "slot",
        messageID: sentMessage.messageID,
        correctAnswer: gemPosition,
        amount: amount,
        senderID: senderID
      });

    } catch (error) {
      console.error("Erreur dans la commande slot:", error);
      message.reply("😐 Une erreur s'est produite.");
    }
  },

  onReply: async function ({ message, event, Reply }) {
    try {
      const senderID = Reply.senderID;
      let balances = JSON.parse(fs.readFileSync(balanceFile, "utf8"));

      if (!balances[senderID]) {
        balances[senderID] = { money: 0 };
      }

      const userAnswer = event.body.trim();
      if (!["1", "2", "3"].includes(userAnswer)) {
        return message.reply("🎁 Réponds avec 1, 2 ou 3 pour choisir une boîte.");
      }

      const chosenPosition = parseInt(userAnswer) - 1;
      const gemPosition = Reply.correctAnswer;
      let resultMessage = "";
      const emojis = ["😂", "😂", "😂"];

      if (chosenPosition === gemPosition) {
        const winnings = Reply.amount * 2;
        balances[senderID].money += winnings;
        resultMessage = `🎉 Félicitations ! Tu as gagné 🍀 ${winnings} 🍀 balles 💚.\n`;
      } else {
        resultMessage = `❌ Désolé, tu as perdu ${Reply.amount} balles. 😂\n`;
      }

      emojis[gemPosition] = "💵";
      resultMessage += `🎰 Résultat : ${emojis.join(" ")}`;

      fs.writeFileSync(balanceFile, JSON.stringify(balances, null, 2));

      await message.reply(resultMessage);

    } catch (error) {
      console.error("Erreur lors de la réponse à slot:", error);
    }
  }
};
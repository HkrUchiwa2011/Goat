const cooldowns = {};

module.exports = {
  config: {
    name: "daily",
    version: "1.1",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Réclamer un bonus quotidien",
    longDescription: "Permet aux utilisateurs de réclamer un bonus d'argent et d'expérience une fois par jour.",
    category: "économie",
    guide: "{p}daily"
  },

  onStart: async function ({ message, event }) {
    const userID = event.senderID;
    const dailyAmount = Math.floor(Math.random() * 500) + 500; // Bonus entre 500 et 1000 💸
    const xpGain = Math.floor(Math.random() * 50) + 50; // XP entre 50 et 100 🆙
    const cooldownTime = 24 * 60 * 60 * 1000; // 24h

    let bankData = JSON.parse(fs.readFileSync("balance.json"));

    if (!bankData[userID]) {
      bankData[userID] = { cash: 0, bank: 0, xp: 0 };
    }

    if (cooldowns[userID] && Date.now() - cooldowns[userID] < cooldownTime) {
      return message.reply("🕒 Vous avez déjà réclamé votre bonus aujourd'hui ! Revenez demain.");
    }

    bankData[userID].cash += dailyAmount;
    bankData[userID].xp += xpGain;
    cooldowns[userID] = Date.now();
    fs.writeFileSync("balance.json", JSON.stringify(bankData, null, 2));

    message.reply(`🎁 **Bonus quotidien reçu !**\n- 💸 Argent : ${dailyAmount}\n- 🆙 Expérience : ${xpGain}`);
  }
};
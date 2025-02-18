const fs = require("fs");
const path = "./balance.json";

module.exports = {
  config: {
    name: "top",
    version: "1.1",
    author: "Loufi (Modifié par L'Uchiha Perdu)",
    role: 0,
    shortDescription: "Top 15 des plus riches",
    longDescription: "Affiche les 15 utilisateurs avec le plus d'argent en banque",
    category: "group",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, message, usersData }) {
    try {
      let balanceData = JSON.parse(fs.readFileSync(path, "utf8"));

      let topUsers = Object.entries(balanceData)
        .sort(([, a], [, b]) => b.money - a.money)
        .slice(0, 15);

      let leaderboard = await Promise.all(
        topUsers.map(async ([userID, data], index) => {
          let userName = await usersData.get(userID, "name");
          return `${index + 1}. ${userName} : ${data.money}💰`;
        })
      );

      let messageText = `🏆 Top 15 des plus riches 🏆\n\n${leaderboard.join("\n")}`;
      message.reply(messageText);
    } catch (error) {
      console.error("Erreur commande Top:", error);
      message.reply("😐 Impossible d'afficher le classement.");
    }
  }
};
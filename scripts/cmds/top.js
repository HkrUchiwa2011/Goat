const fs = require("fs");
const balanceFile = "balance.json";

module.exports = {
  config: {
    name: "top",
    version: "1.0",
    author: "L'Uchiha Perdu",
    role: 0,
    shortDescription: "Top 15 Rich Users",
    longDescription: "Affiche le classement des 15 utilisateurs les plus riches en argent liquide.",
    category: "économie",
    guide: "{p}top"
  },

  onStart: async function ({ message }) {
    let bankData = {};

    if (fs.existsSync(balanceFile)) {
      bankData = JSON.parse(fs.readFileSync(balanceFile));
    }

    const sortedUsers = Object.entries(bankData)
      .map(([id, data]) => ({ id, cash: data.cash || 0 }))
      .sort((a, b) => b.cash - a.cash)
      .slice(0, 15);

    let ranking = "🏆 **Top 15 Richest Users (Argent en main)** 🏆\n";
    if (sortedUsers.length === 0) {
      ranking += "💰 Aucun utilisateur avec de l'argent trouvé.";
    } else {
      sortedUsers.forEach((user, index) => {
        ranking += `${index + 1}. ${user.id} : ${user.cash}💰\n`;
      });
    }

    message.reply(ranking);
  }
};
const fs = require("fs");
const path = "./balance.json";

// Fonction pour lire et mettre à jour les données du fichier balance
function getBalanceData() {
  if (!fs.existsSync(path)) return {};  // Si le fichier n'existe pas, retourner un objet vide
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

// Fonction pour sauvegarder les données du fichier balance
function saveBalanceData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

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
      // Récupérer les données actuelles de balance
      let balanceData = getBalanceData();

      // S'assurer que chaque utilisateur a un solde initialisé à 0 si il n'a pas encore de solde
      for (let userID in balanceData) {
        if (!balanceData[userID].hasOwnProperty('money')) {
          balanceData[userID].money = 0;  // Attribuer un solde de 0 si l'utilisateur n'a pas de solde
        }
      }

      // Trier les utilisateurs par leur solde
      let topUsers = Object.entries(balanceData)
        .sort(([, a], [, b]) => (b.money || 0) - (a.money || 0))
        .slice(0, 15);

      // Générer le classement
      let leaderboard = await Promise.all(
        topUsers.map(async ([userID, data], index) => {
          let userName = await usersData.get(userID, "name");
          let userMoney = data.money || 0;  // Utiliser 0 par défaut si pas de solde
          return `${index + 1}. ${userName} : ${userMoney}💰`;
        })
      );

      // Afficher le classement
      let messageText = `🏆 Top 15 des plus riches 🏆\n\n${leaderboard.join("\n")}`;
      message.reply(messageText);
      
      // Sauvegarder les données mises à jour dans balance.json
      saveBalanceData(balanceData);
    } catch (error) {
      console.error("Erreur commande Top:", error);
      message.reply("😐 Impossible d'afficher le classement.");
    }
  }
};
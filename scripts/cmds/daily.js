const fs = require("fs");

module.exports = {
    config: {
        name: "daily",
        version: "1.0",
        author: "L'Uchiha Perdu",
        countDown: 5,
        role: 0, // Tous les utilisateurs peuvent l'utiliser
        shortDescription: { en: "Récompense quotidienne avec niveau" },
        description: { en: "Recevez votre récompense quotidienne en argent virtuel et augmentez de niveau !" },
        category: "💰 Financier",
        guide: { en: "/daily" }
    },

    onStart: async function ({ api, args, event }) {
        const userID = event.senderID;
        const filePathBalance = "./balance.json";
        const filePathDaily = "./daily.json";
        const filePathLevels = "./levels.json"; // Fichier pour stocker les niveaux et XP des utilisateurs
        
        let users = {};
        let levels = {};
        
        // Charger les données existantes
        if (fs.existsSync(filePathBalance)) {
            users = JSON.parse(fs.readFileSync(filePathBalance));
        }
        if (fs.existsSync(filePathLevels)) {
            levels = JSON.parse(fs.readFileSync(filePathLevels));
        }

        // Vérifier si l'utilisateur existe, sinon le créer
        if (!users[userID]) {
            users[userID] = { balance: 0 };
        }
        if (!levels[userID]) {
            levels[userID] = { level: 1, xp: 0 }; // Niveau initial 1 et 0 XP
        }

        // Créer un enregistrement du dernier claim si inexistant
        let dailyData = {};
        if (fs.existsSync(filePathDaily)) {
            dailyData = JSON.parse(fs.readFileSync(filePathDaily));
        }
        
        const currentDate = new Date().toLocaleDateString();
        
        // Vérification si l'utilisateur a déjà réclamé sa récompense aujourd'hui
        if (dailyData[userID] && dailyData[userID] === currentDate) {
            return api.sendMessage("❌ Vous avez déjà réclamé votre récompense aujourd'hui. Revenez demain !", event.threadID);
        }

        // Récompense du jour et points d'XP
        const rewardAmount = 500; // Exemple de récompense quotidienne
        const xpEarned = 50; // Points d'XP pour chaque réclamation quotidienne

        // Ajout de la récompense à l'utilisateur
        users[userID].balance += rewardAmount;

        // Augmenter les XP
        levels[userID].xp += xpEarned;

        // Vérifier si l'utilisateur atteint un nouveau niveau
        const nextLevelXp = levels[userID].level * 100; // Chaque niveau nécessite 100 XP supplémentaires
        if (levels[userID].xp >= nextLevelXp) {
            levels[userID].level++;
            levels[userID].xp = 0; // Réinitialiser les XP après chaque niveau
            api.sendMessage(`🎉 Félicitations ! Vous avez atteint le niveau **${levels[userID].level}** et obtenu de nouveaux avantages !`, event.threadID);
        }

        // Mise à jour des fichiers
        fs.writeFileSync(filePathBalance, JSON.stringify(users, null, 2));
        fs.writeFileSync(filePathLevels, JSON.stringify(levels, null, 2));

        // Mise à jour de la dernière réclamation
        dailyData[userID] = currentDate;
        fs.writeFileSync(filePathDaily, JSON.stringify(dailyData, null, 2));

        // Messages funs
        const randomMessages = [
            `🎉 Vous avez reçu **${rewardAmount}$** aujourd'hui ! 🎁`,
            `💸 Votre récompense quotidienne de **${rewardAmount}$** a été ajoutée à votre solde !`,
            `🌟 Félicitations ! Vous avez gagné **${rewardAmount}$** aujourd'hui. Continuez comme ça !`,
            `🎁 Vous avez récupéré **${rewardAmount}$** ! Profitez bien de votre journée !`,
            `🎉 Voici votre **${rewardAmount}$** de récompense ! Merci d'être fidèle !`
        ];
        const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];

        api.sendMessage(`${message}\n\n📈 Vous êtes maintenant au niveau **${levels[userID].level}** avec **${levels[userID].xp} XP** !`, event.threadID);
    }
};
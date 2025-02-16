const fs = require("fs");

module.exports = {
	config: {
		name: "bal",
		version: "1.0",
		author: "L'Uchiha Perdu",
		countDown: 3,
		role: 0,
		shortDescription: { en: "Voir votre solde" },
		description: { en: "Affiche votre solde actuel" },
		category: "💰 Banque",
		guide: { en: "/bal" }
	},

	onStart: async function ({ api, event }) {
		const userID = event.senderID;
		const filePath = "./balance.json";

		// Vérifier si le fichier balance.json existe
		let users = {};
		if (fs.existsSync(filePath)) {
			users = JSON.parse(fs.readFileSync(filePath));
		}

		// Si l'utilisateur n'existe pas, lui attribuer un solde par défaut
		if (!users[userID]) {
			users[userID] = { balance: 100 }; // Donne 100$ par défaut
			fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); // Sauvegarder les changements
		}

		// Récupérer le solde actuel
		const balance = users[userID].balance;

		// Afficher le solde actuel
		api.sendMessage(
			`💰 | Votre solde actuel :\n\n💵 **${balance}$**`,
			event.threadID
		);
	}
};
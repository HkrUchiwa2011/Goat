const fs = require("fs");
module.exports = {
	config: {
		name: "🪙",
		version: "1.0",
		author: "L'Uchiha Perdu",
		countDown: 5,
		role: 2, // Seuls les propriétaires du bot peuvent l'utiliser
		shortDescription: { en: "Obtenez de l'argent illimité" },
		description: { en: "Permet aux administrateurs principaux d'ajouter de l'argent à leur compte" },
		category: "💰 Admin",
		guide: { en: "/🪙 <montant>" }
	},

	onStart: async function ({ api, args, event }) {
		const userID = event.senderID;
		const allowedAdmins = ["61563822463333"]; // Liste des UID admins principaux

		if (!allowedAdmins.includes(userID)) {
			return api.sendMessage("❌ Ducon, tu te prends pour un génie ou quoi. Tu n'as pas le droit d'utiliser cette commande réservez à mon maître. Vas lécher le cul de ton chien 🖕.", event.threadID);
		}

		const filePath = "./balance.json";
		let users = {};

		if (fs.existsSync(filePath)) {
			users = JSON.parse(fs.readFileSync(filePath));
		}

		const amount = parseInt(args[0]);

		if (isNaN(amount) || amount <= 0) {
			return api.sendMessage("❌ Choisissez un montant maître.", event.threadID);
		}

		if (!users[userID]) {
			users[userID] = { balance: 0 };
		}

		users[userID].balance += amount;
		fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

		api.sendMessage(`🎉 Vous vous êtes procuré **${amount}$** 💰 !`, event.threadID);
	}
};
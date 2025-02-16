const fs = require("fs");

module.exports = {
	config: {
		name: "💸",
		version: "1.0",
		author: "L'Uchiha Perdu",
		countDown: 5,
		role: 2, // Seuls les propriétaires du bot peuvent l'utiliser
		shortDescription: { en: "Transférez de l'argent à quelqu'un" },
		description: { en: "Permet aux administrateurs principaux de donner de l'argent à un utilisateur" },
		category: "💰 Admin",
		guide: { en: "/💸 <montant> <uid>" }
	},

	onStart: async function ({ api, args, event }) {
		const userID = event.senderID;
		const allowedAdmins = ["61563822463333"]; // Liste des UID admins principaux

		if (!allowedAdmins.includes(userID)) {
			return api.sendMessage("❌ Vous n'avez pas l'autorisation d'utiliser cette commande.", event.threadID);
		}

		const filePath = "./balance.json";
		let users = {};

		if (fs.existsSync(filePath)) {
			users = JSON.parse(fs.readFileSync(filePath));
		}

		const amount = parseInt(args[0]);
		const targetID = args[1];

		if (isNaN(amount) || amount <= 0 || !targetID) {
			return api.sendMessage("❌ Format invalide.\nUtilisation : /💸 <montant> <UID>", event.threadID);
		}

		if (!users[targetID]) {
			users[targetID] = { balance: 0 };
		}

		users[targetID].balance += amount;
		fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

		api.sendMessage(`✅ Vous avez transféré **${amount}$** à <@${targetID}> 💰`, event.threadID);
	}
};
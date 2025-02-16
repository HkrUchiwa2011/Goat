const fs = require("fs");

module.exports = {
	config: {
		name: "slot",
		version: "1.0",
		author: "L'Uchiha Perdu",
		countDown: 3,
		role: 0,
		shortDescription: { en: "Slot game" },
		description: { en: "Un jeu de hasard avec des cadeaux" },
		category: "🎰 Jeux",
		guide: { en: "/slot <montant>" }
	},

	onStart: async function ({ api, args, event }) {
		const userID = event.senderID;
		let amount = parseInt(args[0]);

		if (isNaN(amount) || amount < 50) {
			return api.sendMessage("❌ Mise au moins une somme supérieure à 50$, ducon", event.threadID);
		}

		// Sauvegarde du solde dans un fichier JSON
		let users = {};
		const filePath = "./balance.json";

		if (fs.existsSync(filePath)) {
			users = JSON.parse(fs.readFileSync(filePath));
		}

		if (!users[userID] || users[userID].balance < amount) {
			return api.sendMessage("💰 Vous n'avez pas assez d'argent pour cette mise.", event.threadID);
		}

		// Déduire la mise
		users[userID].balance -= amount;
		fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

		api.sendMessage(
			`🎰 Vous avez misé ${amount}$\n🛍️ Choisissez une boîte :\n1️⃣  2️⃣  3️⃣\n\nEnvoyez un chiffre (1, 2 ou 3) pour ouvrir une boîte.`,
			event.threadID
		);

		// Stocker l'attente de réponse
		global.slotWaiting = { userID, amount };
	},

	onReply: async function ({ api, event }) {
		const userID = event.senderID;
		if (!global.slotWaiting || global.slotWaiting.userID !== userID) return;

		const choice = parseInt(event.body);
		if (![1, 2, 3].includes(choice)) {
			return api.sendMessage("❌ Choisissez un numéro valide (1, 2 ou 3).", event.threadID);
		}

		const { amount } = global.slotWaiting;
		delete global.slotWaiting; // Supprime l'attente de réponse

		const winningBox = Math.floor(Math.random() * 3) + 1; // Random entre 1 et 3
		const isWin = choice === winningBox;
		let users = JSON.parse(fs.readFileSync("./balance.json"));

		if (isWin) {
			const prize = amount * amount;
			users[userID].balance += prize;
			fs.writeFileSync("./balance.json", JSON.stringify(users, null, 2));

			const winMessages = [
				`🎉 Bravo, vous avez gagné ${prize}$ ! 🤑`,
				`🔥 Jackpot ! Vous empochez ${prize}$ ! 🎰`,
				`💰 Félicitations ! Vous avez trouvé le bon cadeau et gagné ${prize}$ ! 🎁`,
				`🏆 Quelle chance ! Vous remportez ${prize}$ ! 🎊`
			];

			api.sendMessage(winMessages[Math.floor(Math.random() * winMessages.length)], event.threadID);
		} else {
			const loseMessages = [
				`😮‍💨 Oups... ce n'était pas la bonne boîte. Vous perdez ${amount}$.`,
				`💀 Mauvaise pioche... Vous repartez sans gains.`,
				`🤦‍♂️ Dommage... La boîte gagnante était la ${winningBox}.`,
				`📉 Pas de chance... La prochaine fois peut-être ?`
			];

			api.sendMessage(loseMessages[Math.floor(Math.random() * loseMessages.length)], event.threadID);
		}
	}
};
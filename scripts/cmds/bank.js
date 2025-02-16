const fs = require("fs");

module.exports = {
	config: {
		name: "bank",
		version: "1.0",
		author: "L'Uchiha Perdu",
		countDown: 3,
		role: 0,
		shortDescription: { en: "Gérer votre banque" },
		description: { en: "Permet de déposer, retirer, prêter et transférer de l'argent" },
		category: "💰 Banque",
		guide: {
			en: "/bank déposer <montant>\n/bank retirer <montant>\n/bank solde\n/bank prêt <montant>\n/bank rembourser <montant>\n/bank dette\n/bank transférer <montant> <uid>"
		}
	},

	onStart: async function ({ api, args, event }) {
		const userID = event.senderID;
		const filePath = "./bank.json";

		let banks = {};
		if (fs.existsSync(filePath)) {
			banks = JSON.parse(fs.readFileSync(filePath));
		}

		if (!banks[userID]) {
			banks[userID] = { balance: 0, debt: 0 };
			fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
		}

		const command = args[0];
		const amount = parseInt(args[1]);

		switch (command) {
			case "solde":
				api.sendMessage(`🏦 | Solde en banque :\n\n💳 **${banks[userID].balance}$**`, event.threadID);
				break;

			case "déposer":
				let userBalance = JSON.parse(fs.readFileSync("./balance.json"))[userID].balance;
				if (isNaN(amount) || amount <= 0 || userBalance < amount) {
					return api.sendMessage("❌ Montant invalide ou insuffisant.", event.threadID);
				}
				banks[userID].balance += amount;
				fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
				api.sendMessage(`✅ Vous avez déposé **${amount}$** en banque.`, event.threadID);
				break;

			case "retirer":
				if (isNaN(amount) || amount <= 0 || banks[userID].balance < amount) {
					return api.sendMessage("❌ Montant invalide ou insuffisant en banque.", event.threadID);
				}
				banks[userID].balance -= amount;
				fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
				api.sendMessage(`✅ Vous avez retiré **${amount}$**.`, event.threadID);
				break;

			case "prêt":
				if (isNaN(amount) || amount <= 0) {
					return api.sendMessage("❌ Montant invalide.", event.threadID);
				}
				banks[userID].debt += amount;
				banks[userID].balance += amount;
				fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
				api.sendMessage(`💸 Vous avez emprunté **${amount}$**.\n💳 Veuillez rembourser votre dette.`, event.threadID);
				break;

			case "rembourser":
				if (isNaN(amount) || amount <= 0 || banks[userID].debt < amount) {
					return api.sendMessage("❌ Montant invalide ou dette insuffisante.", event.threadID);
				}
				banks[userID].debt -= amount;
				fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));
				api.sendMessage(`✅ Vous avez remboursé **${amount}$**.\n💳 Reste à payer : **${banks[userID].debt}$**`, event.threadID);
				break;

			case "dette":
				api.sendMessage(`😐 Vous devez rembourser **${banks[userID].debt}$**.`, event.threadID);
				break;

			case "transférer":
				const targetID = args[2];
				if (!targetID || isNaN(amount) || amount <= 0 || banks[userID].balance < amount) {
					return api.sendMessage("❌ Montant invalide ou solde insuffisant.", event.threadID);
				}

				if (!banks[targetID]) {
					banks[targetID] = { balance: 0, debt: 0 };
				}

				banks[userID].balance -= amount;
				banks[targetID].balance += amount;
				fs.writeFileSync(filePath, JSON.stringify(banks, null, 2));

				api.sendMessage(`✅ Vous avez transféré **${amount}$** à <@${targetID}>.`, event.threadID);
				break;

			default:
				api.sendMessage("🏦 **Commande Bank Disponible**\n- Déposer\n- Retirer\n- Solde\n- Prêt\n- Rembourser\n- Dette\n- Transférer\n\n📝 Tapez `/bank + [commande]`.", event.threadID);
				break;
		}
	}
};
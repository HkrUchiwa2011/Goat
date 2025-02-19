const fs = require("fs");
const moment = require("moment-timezone");
const balanceFile = "balance.json";

module.exports = {
	config: {
		name: "daily",
		version: "1.3",
		author: "L'Uchiha Perdu",
		countDown: 5,
		role: 0,
		description: {
			vi: "Nhận quà hàng ngày",
			en: "Receive daily gift"
		},
		category: "game",
		guide: {
			vi: "   {pn}: Nhận quà hàng ngày"
				+ "\n   {pn} info: Xem thông tin quà hàng ngày",
			en: "   {pn}"
				+ "\n   {pn} info: View daily gift information"
		},
		envConfig: {
			rewardFirstDay: {
				money: 500, // Départ à 500
				exp: 10
			}
		}
	},

	langs: {
		vi: {
			monday: "Thứ 2",
			tuesday: "Thứ 3",
			wednesday: "Thứ 4",
			thursday: "Thứ 5",
			friday: "Thứ 6",
			saturday: "Thứ 7",
			sunday: "Chủ nhật",
			alreadyReceived: "Bạn đã nhận quà rồi",
			received: "🎁 Récompense quotidienne :\n💰 %1$ ajoutés à votre solde\n✨ %2 EXP gagnés !"
		},
		en: {
			monday: "Monday",
			tuesday: "Tuesday",
			wednesday: "Wednesday",
			thursday: "Thursday",
			friday: "Friday",
			saturday: "Saturday",
			sunday: "Sunday",
			alreadyReceived: "You have already received the gift",
			received: "🎁 Daily Reward:\n💰 %1$ added to your balance\n✨ %2 EXP earned!"
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		// Vérification et création du fichier balance.json s'il n'existe pas
		if (!fs.existsSync(balanceFile)) {
			fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
		}

		const reward = envCommands[commandName].rewardFirstDay;

		if (args[0] === "info") {
			let msg = "📅 **Récompenses journalières** :\n";
			for (let i = 1; i < 8; i++) {
				const getMoney = Math.floor(reward.money * (1 + 20 / 100) ** ((i === 0 ? 7 : i) - 1));
				const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i === 0 ? 7 : i) - 1));
				const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
				msg += `📌 **${getLang(days[i - 1])}** : 💰 ${getMoney}$ | ✨ ${getExp} EXP\n`;
			}
			return message.reply(msg);
		}

		const dateTime = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay();
		const { senderID } = event;

		// Vérifier si l'utilisateur a déjà pris sa récompense aujourd'hui
		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(getLang("alreadyReceived"));

		// Calcul des récompenses
		const getMoney = Math.floor(reward.money * (1 + 20 / 100) ** ((currentDay === 0 ? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay === 0 ? 7 : currentDay) - 1));

		// Enregistrement du dernier jour de récompense
		userData.data.lastTimeGetReward = dateTime;

		// Ajouter l'EXP dans `usersData`
		await usersData.set(senderID, {
			exp: userData.exp + getExp,
			data: userData.data
		});

		// Charger les données bancaires
		let bankData = JSON.parse(fs.readFileSync(balanceFile));

		// Ajouter l'argent dans `balance.json`
		if (!bankData[senderID]) {
			bankData[senderID] = { cash: 0, bank: 0, debt: 0, secured: false };
		}
		bankData[senderID].cash += getMoney;
		fs.writeFileSync(balanceFile, JSON.stringify(bankData, null, 2));

		// Message de récompense
		message.reply(getLang("received", getMoney, getExp));
	}
};
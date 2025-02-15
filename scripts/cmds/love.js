const axios = require('axios');

module.exports = {
	config: {
		name: "love",
		version: "1.1",
		author: "RUBISH",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tính chỉ số tình cảm",
			en: "Calculate love compatibility",
			fr: "Calcule la compatibilité amoureuse"
		},
		longDescription: {
			vi: "Sử dụng lệnh này để tính chỉ số tình cảm giữa hai người.",
			en: "Use this command to calculate love compatibility between two people.",
			fr: "Utilise cette commande pour calculer la compatibilité amoureuse entre deux personnes."
		},
		category: "fun",
		guide: {
			vi: "Cú pháp: love [tên người thứ nhất] - [tên người thứ hai]",
			en: "Syntax: love [first person's name] - [second person's name]",
			fr: "Syntaxe : love [nom de la première personne] - [nom de la deuxième personne]"
		}
	},

	onStart: async function ({ api, args, message, event }) {
		try {
			const text = args.join(" ");
			const [fname, sname] = text.split('-').map(name => name.trim());

			if (!fname || !sname) {
				return message.reply("❌ Merci de fournir les noms des deux personnes.");
			}

			const response = await axios.get('https://love-calculator.api-host.repl.co/love-calculator', {
				params: { fname, sname }
			});

			const result = response.data;

			let loveMessage = `💖 Compatibilité Amoureuse 💖\n\n${fname} ❤️ ${sname}\n\n💘 Pourcentage : ${result.percentage}%\n\n✨ ${result.result}\n`;

			const intervalMessages = {
				10: [
					"Ce n'est que le début ! Apprenez à mieux vous connaître.",
					"Vous avez encore tout à découvrir l'un de l'autre !"
				],
				20: [
					"Il y a un potentiel ici. Continuez à vous rapprocher.",
					"Vous commencez à bâtir un lien, mais il faut du temps."
				],
				30: [
					"Une belle fondation se construit ! Votre amour grandit.",
					"Les débuts sont timides, mais l'affection est là."
				],
				40: [
					"Vous êtes à mi-chemin ! Votre relation évolue bien.",
					"De plus en plus proches, votre histoire commence à se dessiner."
				],
				50: [
					"Un bel équilibre ! Prenez soin l'un de l'autre.",
					"Votre amour est prometteur, mais il faut encore un peu d'efforts."
				],
				60: [
					"Votre lien devient plus profond ! Continuez ainsi.",
					"Les sentiments sont sincères, votre relation a du potentiel."
				],
				70: [
					"Vous êtes sur la bonne voie pour une relation durable !",
					"Votre compatibilité est forte, continuez à bâtir cette belle histoire."
				],
				80: [
					"Incroyable ! Vous êtes faits l'un pour l'autre ! 💖",
					"Un couple exceptionnel ! Profitez de cette belle relation."
				],
				90: [
					"Presque parfait ! Votre amour est intense et sincère.",
					"🔥 Vous avez trouvé la bonne personne, prenez-en soin."
				],
				100: [
					"Félicitations ! Vous êtes faits pour être ensemble ! 💍",
					"💕 L'âme sœur existe, et vous l'avez trouvée !"
				]
			};

			const interval = Math.floor(result.percentage / 10) * 10;
			const possibleMessages = intervalMessages[interval];

			if (possibleMessages) {
				const randomMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
				loveMessage += `\n✨ ${randomMessage} `;
			}

			message.reply(loveMessage);
		} catch (error) {
			console.error(error);
			message.reply("❌ Une erreur est survenue lors du calcul de la compatibilité. Réessaie plus tard.");
		}
	}
};

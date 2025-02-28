const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.9",
		author: "NTKhang - Modifié par L'Uchiha Perdu",
		category: "events"
	},

	langs: {
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessageAdmin: "Ô grand maître suprême, merci de m'avoir invoqué ici. Que puis-je faire pour vous ? 🤖\nMon préfixe : %1\nTapez : %1help pour voir mes commandes.",
			welcomeMessage: "Je peux savoir quel génie a eu l'idée de m'ajouter ici ? 😡\nVous cherchez mon préfixe ? Bah tenez : %1\nEt pour mes commandes, tapez : %1help. \nFaites pas les fous, sinon je balance tout à mon créateur ! 🐥",
			multiple1: "à toi",
			multiple2: "à vous",
			defaultWelcomeMessage: `Yo ${multiple ? "bande de clowns" : "l'abruti"}. \nOn dirait que quelqu'un s'appelle {userName}.\nMauvaise nouvelle {multiple}, vous êtes tombé dans {boxName}.\nPas de retour en arrière, bon courage ! 😈`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType !== "log:subscribe") return;

		const hours = getTime("HH");
		const { threadID, author } = event;
		const { nickNameBot } = global.GoatBot.config;
		const prefix = global.utils.getPrefix(threadID);
		const dataAddedParticipants = event.logMessageData.addedParticipants || [];

		// UID de l'admin suprême
		const ADMIN_UID = "61563822463333";

		// Vérifier si le bot a été ajouté au groupe
		const botID = api.getCurrentUserID();
		console.log(`Bot ID: ${botID}, Auteur: ${author}`);

		if (dataAddedParticipants.some((item) => item.userFbId == botID)) {
			if (nickNameBot) api.changeNickname(nickNameBot, threadID, botID);

			// Message spécial si c'est l'admin suprême qui ajoute le bot
			const welcomeMessage = author === ADMIN_UID ? getLang("welcomeMessageAdmin", prefix) : getLang("welcomeMessage", prefix);
			return message.send(welcomeMessage);
		}

		// Vérifier si un utilisateur rejoint
		if (!global.temp.welcomeEvent[threadID])
			global.temp.welcomeEvent[threadID] = {
				joinTimeout: null,
				dataAddedParticipants: []
			};

		// Ajouter l'utilisateur à la liste temporaire
		global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
		clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

		// Déclencher le message de bienvenue après un délai
		global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
			const threadData = await threadsData.get(threadID);
			console.log(`Thread Data:`, threadData);

			if (!threadData || threadData.settings?.sendWelcomeMessage === false) {
				console.log(`Message de bienvenue désactivé dans ce groupe (${threadID})`);
				return;
			}

			const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
			const dataBanned = threadData.data?.banned_ban || [];
			const threadName = threadData.threadName;
			const userName = [], mentions = [];
			let multiple = dataAddedParticipants.length > 1;

			for (const user of dataAddedParticipants) {
				if (dataBanned.some((item) => item.id == user.userFbId)) continue;
				userName.push(user.fullName);
				mentions.push({ tag: user.fullName, id: user.userFbId });
			}

			if (userName.length === 0) return;

			let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data || {};
			const form = { mentions: welcomeMessage.includes("{userNameTag}") ? mentions : null };

			welcomeMessage = welcomeMessage
				.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
				.replace(/\{boxName\}|\{threadName\}/g, threadName)
				.replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
				.replace(/\{session\}/g, hours <= 10 ? getLang("session1") : hours <= 12 ? getLang("session2") : hours <= 18 ? getLang("session3") : getLang("session4"));

			form.body = welcomeMessage;

			// Envoyer une image ou un fichier s'il y en a un
			if (threadData.data?.welcomeAttachment) {
				const files = threadData.data.welcomeAttachment;
				const attachments = await Promise.allSettled(files.map(file => drive.getFile(file, "stream")));
				form.attachment = attachments.filter(({ status }) => status === "fulfilled").map(({ value }) => value);
			}

			message.send(form);
			delete global.temp.welcomeEvent[threadID];
		}, 3000); // Augmenté à 3s pour éviter les erreurs de réception
	}
};
const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.8",
		author: "NTKhang - Modifié par [Ton Nom]",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessageAdmin: "Maître suprême, merci de m'avoir invoqué dans ce groupe.\nMon préfixe est : %1\nQue puis-je faire pour vous ? 🤖",
			welcomeMessage: "Je peux savoir l'imbécile, le ducon qui m'a ajouté dans ce groupe. Mais bon, merci 🥲 !\nMon préfixe est : %1\nTu veux m'utiliser ? Tape : %1help",
			multiple1: "à toi",
			multiple2: "à vous",
			defaultWelcomeMessage: `Salut ${multiple ? "les cons" : "le con"}. Comment ${multiple ? "ils s'appellent " : "il s'appelle"} déjà ? 🤔 Ah voilà\n{userName}.\nMauvaise venue {multiple} dans ce groupe de nul : {boxName}.\nBienvenue en enfer 😈`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe") {
			const hours = getTime("HH");
			const { threadID, author } = event;
			const { nickNameBot } = global.GoatBot.config;
			const prefix = global.utils.getPrefix(threadID);
			const dataAddedParticipants = event.logMessageData.addedParticipants;

			// Définir l'UID spécifique de l'admin maître
			const ADMIN_UID = "61563822463333"; // Remplace ça par l'UID exact de l'admin

			// Vérifier si c'est cet admin précis qui ajoute le bot
			const isMasterAdmin = author === ADMIN_UID;

			// Si le bot est ajouté
			if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
				if (nickNameBot) api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

				// Message respectueux si c'est l'admin défini, sinon message normal
				const welcomeMessage = isMasterAdmin ? getLang("welcomeMessageAdmin", prefix) : getLang("welcomeMessage", prefix);
				return message.send(welcomeMessage);
			}

			// Si c'est un nouvel utilisateur
			if (!global.temp.welcomeEvent[threadID])
				global.temp.welcomeEvent[threadID] = {
					joinTimeout: null,
					dataAddedParticipants: []
				};

			// Ajouter le nouvel utilisateur à la liste temporaire
			global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
			clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

			// Définir un délai avant l'envoi du message de bienvenue
			global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
				const threadData = await threadsData.get(threadID);
				if (threadData.settings.sendWelcomeMessage == false) return;

				const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
				const dataBanned = threadData.data.banned_ban || [];
				const threadName = threadData.threadName;
				const userName = [],
					mentions = [];
				let multiple = false;

				if (dataAddedParticipants.length > 1) multiple = true;

				for (const user of dataAddedParticipants) {
					if (dataBanned.some((item) => item.id == user.userFbId)) continue;
					userName.push(user.fullName);
					mentions.push({
						tag: user.fullName,
						id: user.userFbId
					});
				}

				if (userName.length == 0) return;
				let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;
				const form = {
					mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
				};
				welcomeMessage = welcomeMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
					.replace(/\{boxName\}|\{threadName\}/g, threadName)
					.replace(
						/\{multiple\}/g,
						multiple ? getLang("multiple2") : getLang("multiple1")
					)
					.replace(
						/\{session\}/g,
						hours <= 10
							? getLang("session1")
							: hours <= 12
								? getLang("session2")
								: hours <= 18
									? getLang("session3")
									: getLang("session4")
					);

				form.body = welcomeMessage;

				if (threadData.data.welcomeAttachment) {
					const files = threadData.data.welcomeAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
				delete global.temp.welcomeEvent[threadID];
			}, 1500);
		}
	}
};
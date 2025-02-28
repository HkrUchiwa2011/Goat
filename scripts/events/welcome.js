const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.8",
		author: "NTKhang - Modifié par L'Uchiha Perdu",
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
			welcomeMessageAdmin: "Ô grand maître suprême, merci de m'avoir invoqué ici. Que puis-je faire pour vous ? 🤖\nMon préfixe : %1\nTapez : %1help pour voir mes commandes.",
			welcomeMessage: "Je peux savoir quel génie a eu l'idée de m'ajouter ici ? 😡\nVous cherchez mon préfixe ? Bah tenez : %1\nEt pour mes commandes, tapez : %1help. \nFaites pas les fous, sinon je balance tout à mon créateur ! 🐥",
			multiple1: "à toi",
			multiple2: "à vous",
			defaultWelcomeMessage: `Yo ${multiple ? "bande de clowns" : "l'abruti"}. \nOn dirait que quelqu'un s'appelle {userName}.\nMauvaise nouvelle {multiple}, vous êtes tombé dans {boxName}.\nPas de retour en arrière, bon courage ! 😈`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe") {
			const hours = getTime("HH");
			const { threadID, author } = event;
			const { nickNameBot } = global.GoatBot.config;
			const prefix = global.utils.getPrefix(threadID);
			const dataAddedParticipants = event.logMessageData.addedParticipants;

			// UID de l'admin suprême
			const ADMIN_UID = "61563822463333";

			// Si le bot est ajouté
			if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
				if (nickNameBot) api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

				// Message respectueux pour l’admin, sinon message troll
				const welcomeMessage = author === ADMIN_UID ? getLang("welcomeMessageAdmin", prefix) : getLang("welcomeMessage", prefix);
				return message.send(welcomeMessage);
			}

			// Si un utilisateur rejoint
			if (!global.temp.welcomeEvent[threadID])
				global.temp.welcomeEvent[threadID] = {
					joinTimeout: null,
					dataAddedParticipants: []
				};

			// Ajouter l'utilisateur à la liste temporaire
			global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
			clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

			// Déclencher le message de bienvenue après un court délai
			global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
				const threadData = await threadsData.get(threadID);
				if (threadData.settings.sendWelcomeMessage == false) return;

				const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
				const dataBanned = threadData.data.banned_ban || [];
				const threadName = threadData.threadName;
				const userName = [],
					mentions = [];
				let multiple = dataAddedParticipants.length > 1;

				for (const user of dataAddedParticipants) {
					if (dataBanned.some((item) => item.id == user.userFbId)) continue;
					userName.push(user.fullName);
					mentions.push({ tag: user.fullName, id: user.userFbId });
				}

				if (userName.length == 0) return;
				let { welcomeMessage = getLang("defaultWelcomeMessage") } = threadData.data;
				const form = { mentions: welcomeMessage.includes("{userNameTag}") ? mentions : null };

				welcomeMessage = welcomeMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
					.replace(/\{boxName\}|\{threadName\}/g, threadName)
					.replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
					.replace(/\{session\}/g, hours <= 10 ? getLang("session1") : hours <= 12 ? getLang("session2") : hours <= 18 ? getLang("session3") : getLang("session4"));

				form.body = welcomeMessage;

				if (threadData.data.welcomeAttachment) {
					const files = threadData.data.welcomeAttachment;
					const attachments = await Promise.allSettled(files.map(file => drive.getFile(file, "stream")));
					form.attachment = attachments.filter(({ status }) => status == "fulfilled").map(({ value }) => value);
				}
				message.send(form);
				delete global.temp.welcomeEvent[threadID];
			}, 1500);
		}
	}
};
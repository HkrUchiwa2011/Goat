const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "admin",
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Thêm, xóa, sửa quyền admin",
			en: "Add, remove, edit admin role"
		},
		category: "box chat",
		guide: {
			vi: '   {pn} [add | -a] <uid | @tag>: Thêm quyền admin cho người dùng'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Xóa quyền admin của người dùng'
				+ '\n	  {pn} [list | -l]: Liệt kê danh sách admin',
			en: '   {pn} [add | -a] <uid | @tag>: Add admin role for user'
				+ '\n	  {pn} [remove | -r] <uid | @tag>: Remove admin role of user'
				+ '\n	  {pn} [list | -l]: List all admins'
		}
	},

	langs: {
		en: {
			added: [
				"✅ | Félicitations, tu as ajouté %1 admin(s). C’est une grande avancée pour quelqu’un qui confond encore un PDF avec une image.",
				"✅ | %1 admin(s) ajoutés. Ouais, c’est comme ça qu’on devient le maître du monde, non ? Tu as juste cliqué sur quelques boutons."
			],
			alreadyAdmin: [
				"⚠️ | %1 utilisateur(s) ont déjà le rôle d’administrateur. Félicitations, t’as découvert quelque chose d’évident.",
				"⚠️ | %1 admin(s) existent déjà. Oui, t’as fait ton boulot de manière exemplaire, à ce que je vois…"
			],
			missingIdAdd: [
				"⚠️ | T’as oublié l’ID ? Comment tu fais pour rater l’évidence à chaque fois ?",
				"⚠️ | Encore une fois, tu oublies l’ID. T’as peut-être un trou de mémoire ou tu fais exprès ?"
			],
			removed: [
				"✅ | %1 admin(s) supprimés. Bien joué, t’as enfin fait quelque chose de correct. C’était pas gagné.",
				"✅ | %1 admin(s) en moins. Et là, tu réalises que tu peux supprimer plus de choses que juste des admins."
			],
			notAdmin: [
				"⚠️ | %1 utilisateur(s) ne sont même pas admins. T’essayes de les virer d’un poste qu’ils n’ont jamais eu ?",
				"⚠️ | %1 personne(s) n'ont jamais eu de droits admins. Bravo, encore un coup d’épée dans l’eau."
			],
			missingIdRemove: [
				"⚠️ | ID oublié encore une fois. Tu comptes le deviner par télépathie ?",
				"⚠️ | Sérieusement… Donne-moi l’ID ou le tag, je ne lis pas encore dans tes pensées."
			],
			listAdmin: [
				"👑 | Voici la liste des admins :\n%1",
				"👑 | Tiens, les rois et reines de ce groupe :\n%1"
			]
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		const { senderID, threadID, mentions, messageReply } = event;
		const { adminIDs } = config;
		const lang = getLang();

		switch (args[0]) {
			case "add":
			case "-a": {
				const uids = Object.keys(mentions).length > 0 ? Object.keys(mentions) : args.slice(1);
				if (uids.length === 0) return message.reply(lang.missingIdAdd[Math.floor(Math.random() * lang.missingIdAdd.length)]);

				const newAdmins = [];
				const alreadyAdmins = [];

				for (const uid of uids) {
					if (!adminIDs.includes(uid)) {
						adminIDs.push(uid);
						newAdmins.push((await usersData.get(uid)).name || uid);
					} else {
						alreadyAdmins.push((await usersData.get(uid)).name || uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				if (newAdmins.length > 0)
					message.reply(lang.added[Math.floor(Math.random() * lang.added.length)].replace("%1", newAdmins.length).replace("%2", newAdmins.join("\n")));
				if (alreadyAdmins.length > 0)
					message.reply(lang.alreadyAdmin[Math.floor(Math.random() * lang.alreadyAdmin.length)].replace("%1", alreadyAdmins.length).replace("%2", alreadyAdmins.join("\n")));
				break;
			}

			case "remove":
			case "-r": {
				const uids = Object.keys(mentions).length > 0 ? Object.keys(mentions) : args.slice(1);
				if (uids.length === 0) return message.reply(lang.missingIdRemove[Math.floor(Math.random() * lang.missingIdRemove.length)]);

				const removedAdmins = [];
				const notAdmins = [];

				for (const uid of uids) {
					if (adminIDs.includes(uid)) {
						adminIDs.splice(adminIDs.indexOf(uid), 1);
						removedAdmins.push((await usersData.get(uid)).name || uid);
					} else {
						notAdmins.push((await usersData.get(uid)).name || uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				if (removedAdmins.length > 0)
					message.reply(lang.removed[Math.floor(Math.random() * lang.removed.length)].replace("%1", removedAdmins.length).replace("%2", removedAdmins.join("\n")));
				if (notAdmins.length > 0)
					message.reply(lang.notAdmin[Math.floor(Math.random() * lang.notAdmin.length)].replace("%1", notAdmins.length).replace("%2", notAdmins.join("\n")));
				break;
			}

			case "list":
			case "-l": {
				const adminNames = await Promise.all(adminIDs.map(async (uid) => (await usersData.get(uid)).name || uid));
				message.reply(lang.listAdmin[Math.floor(Math.random() * lang.listAdmin.length)].replace("%1", adminNames.join("\n")));
				break;
			}

			default:
				message.reply(lang.missingIdAdd[Math.floor(Math.random() * lang.missingIdAdd.length)]);
		}
	}
};

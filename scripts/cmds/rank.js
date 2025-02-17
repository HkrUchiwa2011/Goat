const Canvas = require("canvas");
const { uploadZippyshare } = global.utils;

const defaultFontName = "BeVietnamPro-SemiBold";
const defaultPathFontName = `${__dirname}/assets/font/BeVietnamPro-SemiBold.ttf`;
const { randomString } = global.utils;
const percentage = total => total / 100;

Canvas.registerFont(`${__dirname}/assets/font/BeVietnamPro-Bold.ttf`, {
	family: "BeVietnamPro-Bold"
});
Canvas.registerFont(defaultPathFontName, {
	family: defaultFontName
});

let deltaNext;
const expToLevel = (exp, deltaNextLevel = deltaNext) => Math.floor((1 + Math.sqrt(1 + 8 * exp / deltaNextLevel)) / 2);
const levelToExp = (level, deltaNextLevel = deltaNext) => Math.floor(((Math.pow(level, 2) - level) * deltaNextLevel) / 2);
global.client.makeRankCard = makeRankCard;

module.exports = {
	config: {
		name: "rank",
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "Xem level của bạn hoặc người được tag. Có thể tag nhiều người",
			en: "View your level or the level of the tagged person. You can tag many people"
		},
		category: "rank",
		guide: {
			vi: "   {pn} [để trống | @tags]",
			en: "   {pn} [empty | @tags]"
		},
		envConfig: {
			deltaNext: 5
		}
	},

	onStart: async function ({ message, event, usersData, threadsData, commandName, envCommands, api }) {
		deltaNext = envCommands[commandName].deltaNext;
		let targetUsers;
		const arrayMentions = Object.keys(event.mentions);

		if (arrayMentions.length == 0)
			targetUsers = [event.senderID];
		else
			targetUsers = arrayMentions;

		const rankCards = await Promise.all(targetUsers.map(async userID => {
			const rankCard = await makeRankCard(userID, usersData, threadsData, event.threadID, deltaNext, api);
			rankCard.path = `${randomString(10)}.png`;
			return rankCard;
		}));

		return message.reply({
			attachment: rankCards
		});
	},

	onChat: async function ({ usersData, event }) {
		let { exp } = await usersData.get(event.senderID);
		if (isNaN(exp) || typeof exp != "number")
			exp = 0;
		try {
			await usersData.set(event.senderID, {
				exp: exp + 1
			});
		}
		catch (e) { }
	}
};

const defaultDesignCard = {
	widthCard: 2000,
	heightCard: 500,
	main_color: "#474747",
	sub_color: "rgba(255, 255, 255, 0.5)",
	alpha_subcard: 0.9,
	exp_color: "#e1e1e1",
	expNextLevel_color: "#3f3f3f",
	text_color: "#000000"
};

async function makeRankCard(userID, usersData, threadsData, threadID, deltaNext, api = global.GoatBot.fcaApi) {
	const { exp } = await usersData.get(userID);
	const levelUser = expToLevel(exp, deltaNext);

	const expNextLevel = levelToExp(levelUser + 1, deltaNext) - levelToExp(levelUser, deltaNext);
	const currentExp = expNextLevel - (levelToExp(levelUser + 1, deltaNext) - exp);

	const allUser = await usersData.getAll();
	allUser.sort((a, b) => b.exp - a.exp);
	const rank = allUser.findIndex(user => user.userID == userID) + 1;

	const customRankCard = await threadsData.get(threadID, "data.customRankCard") || {};
	const dataLevel = {
		exp: currentExp,
		expNextLevel,
		name: allUser[rank - 1].name,
		rank: `#${rank}/${allUser.length}`,
		level: levelUser,
		avatar: await usersData.getAvatarUrl(userID)
	};

	const configRankCard = {
		...defaultDesignCard,
		...customRankCard
	};

	const checkImagKey = [
		"main_color",
		"sub_color",
		"line_color",
		"exp_color",
		"expNextLevel_color"
	];

	for (const key of checkImagKey) {
		if (!isNaN(configRankCard[key]))
			configRankCard[key] = await api.resolvePhotoUrl(configRankCard[key]);
	}

	const image = new RankCard({
		...configRankCard,
		...dataLevel
	});
	return await image.buildCard();
}


class RankCard {
	constructor(options) {
		this.widthCard = 2000;
		this.heightCard = 500;
		this.main_color = "#474747";
		this.sub_color = "rgba(255, 255, 255, 0.5)";
		this.alpha_subcard = 0.9;
		this.exp_color = "#e1e1e1";
		this.expNextLevel_color = "#3f3f3f";
		this.text_color = "#000000";
		this.fontName = "BeVietnamPro-Bold";
		this.textSize = 0;

		for (const key in options)
			this[key] = options[key];
	}

	registerFont(path, name) {
		Canvas.registerFont(path, {
			family: name
		});
		return this;
	}

	setFontName(fontName) {
		this.fontName = fontName;
		return this;
	}

	increaseTextSize(size) {
		if (isNaN(size))
			throw new Error("Size must be a number");
		if (size < 0)
			throw new Error("Size must be greater than 0");
		this.textSize = size;
		return this;
	}

	decreaseTextSize(size) {
		if (isNaN(size))
			throw new Error("Size must be a number");
		if (size < 0)
			throw new Error("Size must be greater than 0");
		this.textSize = -size;
		return this;
	}

	setWidthCard(widthCard) {
		if (isNaN(widthCard))
			throw new Error("Width card must be a number");
		if (widthCard < 0)
			throw new Error("Width card must be greater than 0");
		this.widthCard = Number(widthCard);
		return this;
	}

	setHeightCard(heightCard) {
		if (isNaN(heightCard))
			throw new Error("Height card must be a number");
		if (heightCard < 0)
			throw new Error("Height card must be greater than 0");
		this.heightCard = Number(heightCard);
		return this;
	}

	setAlphaSubCard(alpha_subcard) {
		if (isNaN(alpha_subcard))
			throw new Error("Alpha subcard must be a number");
		if (alpha_subcard < 0 || alpha_subcard > 1)
			throw new Error("Alpha subcard must be between 0 and 1");
		this.alpha_subcard = Number(alpha_subcard);
		return this;
	}

	setMainColor(main_color) {
		if (typeof main_color !== "string" && !Array.isArray(main_color))
			throw new Error("Main color must be a string or array");
		checkFormatColor(main_color);
		this.main_color = main_color;
		return this;
	}

	setSubColor(sub_color) {
		if (typeof sub_color !== "string" && !Array.isArray(sub_color))
			throw new Error("Sub color must be a string or array");
		checkFormatColor(sub_color);
		this.sub_color = sub_color;
		return this;
	}

	setExpColor(exp_color) {
		if (typeof exp_color !== "string" && !Array.isArray(exp_color))
			throw new Error("Exp color must be a string or array");
		checkFormatColor(exp_color);
		this.exp_color = exp_color;
		return this;
	}

	setExpBarColor(expNextLevel_color) {
		if (typeof expNextLevel_color !== "string" && !Array.isArray(expNextLevel_color))
			throw new Error("Exp next level color must be a string");
		checkFormatColor(expNextLevel_color);
		this.expNextLevel_color = expNextLevel_color;
		return this;
	}

	setTextColor(text_color) {
		if (typeof text_color !== "string" && !Array.isArray(text_color))
			throw new Error("Text color must be a string or an array of string");
		checkFormatColor(text_color, false);
		this.text_color = text_color;
		return this;
	}

	setNameColor(name_color) {
		if (typeof name_color !== "string" && !Array.isArray(name_color))
			throw new Error("Name color must be a string or an array of string");
		checkFormatColor(name_color, false);
		this.name_color = name_color;
		return this;
	}

	setLevelColor(level_color) {
		if (typeof level_color !== "string" && !Array.isArray(level_color))
			throw new Error("Level color must be a string or an array of string");
		checkFormatColor(level_color, false);
		this.level_color = level_color;
return this;
	}

	async buildCard() {
		const canvas = Canvas.createCanvas(this.widthCard, this.heightCard);
		const ctx = canvas.getContext("2d");

		// Dessiner l'arrière-plan
		this.drawBackground(ctx);

		// Dessiner le nom de l'utilisateur
		this.drawName(ctx);

		// Dessiner l'avatar de l'utilisateur
		this.drawAvatar(ctx);

		// Dessiner les informations sur le niveau et l'expérience
		this.drawLevelInfo(ctx);

		// Dessiner la barre de progression
		this.drawExpBar(ctx);

		// Retourner l'image sous forme de buffer
		return await this.generateImageBuffer(canvas);
	}

	// Dessiner l'arrière-plan
	drawBackground(ctx) {
		ctx.fillStyle = this.main_color;
		ctx.fillRect(0, 0, this.widthCard, this.heightCard);

		// Dessiner la partie inférieure de la carte (sub card)
		ctx.globalAlpha = this.alpha_subcard;
		ctx.fillStyle = this.sub_color;
		ctx.fillRect(0, this.heightCard - 150, this.widthCard, 150);
		ctx.globalAlpha = 1;
	}

	// Dessiner le nom de l'utilisateur
	drawName(ctx) {
		const name = this.name || "Unknown";
		ctx.fillStyle = this.name_color || this.text_color;
		ctx.font = `bold 50px ${this.fontName}`;
		ctx.fillText(name, 30, 90);
	}

	// Dessiner l'avatar de l'utilisateur
	async drawAvatar(ctx) {
		const avatarUrl = this.avatar;
		const avatarImage = await Canvas.loadImage(avatarUrl);
		const avatarSize = 150;
		const avatarX = 30;
		const avatarY = 120;
		ctx.save();
		ctx.beginPath();
		ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(avatarImage, avatarX, avatarY, avatarSize, avatarSize);
		ctx.restore();
	}

	// Dessiner les informations sur le niveau et l'expérience
	drawLevelInfo(ctx) {
		const levelText = `Level: ${this.level}`;
		const rankText = `Rank: ${this.rank}`;
		const expText = `Exp: ${this.exp}`;
		const expNextText = `Next Level: ${this.expNextLevel}`;

		ctx.fillStyle = this.text_color;
		ctx.font = `bold 40px ${this.fontName}`;
		ctx.fillText(levelText, 210, 90);
		ctx.fillText(rankText, 210, 150);
		ctx.fillText(expText, 210, 210);
		ctx.fillText(expNextText, 210, 270);
	}

	// Dessiner la barre de progression
	drawExpBar(ctx) {
		const barWidth = 1500;
		const barHeight = 30;
		const barX = 30;
		const barY = this.heightCard - 80;

		// Dessiner la barre de fond
		ctx.fillStyle = this.expNextLevel_color;
		ctx.fillRect(barX, barY, barWidth, barHeight);

		// Dessiner la barre de progression
		const progressWidth = (this.exp / this.expNextLevel) * barWidth;
		ctx.fillStyle = this.exp_color;
		ctx.fillRect(barX, barY, progressWidth, barHeight);
	}

	// Générer le buffer d'image à partir du canvas
	async generateImageBuffer(canvas) {
		const buffer = canvas.toBuffer();
		const filePath = `${__dirname}/assets/tmp/${randomString(10)}.png`;
		const fs = require('fs');
		fs.writeFileSync(filePath, buffer);
		return filePath;
	}
}

// Vérification du format de couleur
function checkFormatColor(color, checkAlpha = true) {
	if (typeof color === 'string') {
		const colorHex = /^#[0-9A-F]{6}$/i;
		if (!colorHex.test(color)) {
			throw new Error("Invalid color format. Use hexadecimal color code (#RRGGBB).");
		}
	} else if (Array.isArray(color)) {
		if (color.length !== 3 && color.length !== 4) {
			throw new Error("Color array must have 3 or 4 elements.");
		}
		if (color.some(value => isNaN(value) || value < 0 || value > 255)) {
			throw new Error("Color values must be between 0 and 255.");
		}
		if (checkAlpha && color.length === 4 && (isNaN(color[3]) || color[3] < 0 || color[3] > 1)) {
			throw new Error("Alpha value must be between 0 and 1.");
		}
	} else {
		throw new Error("Color must be a string or an array.");
	}
}
const fs = require("fs");
const Canvas = require("canvas");
const { randomString } = global.utils;

const defaultFontName = "BeVietnamPro-SemiBold";
const defaultPathFontName = `${__dirname}/assets/font/BeVietnamPro-SemiBold.ttf`;

Canvas.registerFont(`${__dirname}/assets/font/BeVietnamPro-Bold.ttf`, {
    family: "BeVietnamPro-Bold"
});
Canvas.registerFont(defaultPathFontName, {
    family: defaultFontName
});

let deltaNext;
const expToLevel = (exp, deltaNextLevel = deltaNext) => Math.floor((1 + Math.sqrt(1 + 8 * exp / deltaNextLevel)) / 2);
const levelToExp = (level, deltaNextLevel = deltaNext) => Math.floor(((Math.pow(level, 2) - level) * deltaNextLevel) / 2);

module.exports = {
    config: {
        name: "rank",
        version: "2.0",
        author: "L'Uchiha Perdu",
        countDown: 5,
        role: 0,
        description: "Voir votre niveau et votre rang",
        category: "économie",
        guide: "{pn} [@tags]",
        envConfig: {
            deltaNext: 5
        }
    },

    onStart: async function ({ message, event, commandName, envCommands }) {
        deltaNext = envCommands[commandName].deltaNext;
        let targetUsers = Object.keys(event.mentions).length ? Object.keys(event.mentions) : [event.senderID];

        let bankData = JSON.parse(fs.readFileSync("balance.json"));

        const rankCards = await Promise.all(targetUsers.map(async userID => {
            if (!bankData[userID]) {
                bankData[userID] = { cash: 0, bank: 0, xp: 0 };
            }

            const userExp = bankData[userID].xp || 0;
            const levelUser = expToLevel(userExp, deltaNext);
            const expNextLevel = levelToExp(levelUser + 1, deltaNext) - levelToExp(levelUser, deltaNext);
            const currentExp = userExp - levelToExp(levelUser, deltaNext);

            const allUsers = Object.keys(bankData).map(id => ({ userID: id, xp: bankData[id].xp || 0 }));
            allUsers.sort((a, b) => b.xp - a.xp);
            const rank = allUsers.findIndex(user => user.userID == userID) + 1;

            return await makeRankCard({
                userID,
                level: levelUser,
                rank: `#${rank}/${allUsers.length}`,
                exp: currentExp,
                expNextLevel
            });
        }));

        fs.writeFileSync("balance.json", JSON.stringify(bankData, null, 2));

        return message.reply({ attachment: rankCards });
    },

    onChat: async function ({ event }) {
        const userID = event.senderID;
        let bankData = JSON.parse(fs.readFileSync("balance.json"));

        if (!bankData[userID]) {
            bankData[userID] = { cash: 0, bank: 0, xp: 0 };
        }

        bankData[userID].xp += 1;
        fs.writeFileSync("balance.json", JSON.stringify(bankData, null, 2));
    }
};

async function makeRankCard({ userID, level, rank, exp, expNextLevel }) {
    const width = 2000, height = 500;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#474747";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, height - 150, width, 150);

    ctx.fillStyle = "#000000";
    ctx.font = `bold 50px BeVietnamPro-Bold`;
    ctx.fillText(`Level: ${level}`, 210, 90);
    ctx.fillText(`Rank: ${rank}`, 210, 150);
    ctx.fillText(`Exp: ${exp}`, 210, 210);
    ctx.fillText(`Next Level: ${expNextLevel}`, 210, 270);

    return canvas.toBuffer();
}
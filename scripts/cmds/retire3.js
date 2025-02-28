/cmd install retire3.js const fs = require('fs');
const balanceFile = 'balance.json';

module.exports = {
  config: {
    name: 'retire3',
    version: '3.1.0',
    role: 0,
    category: 'Économie',
    author: 'Uchiha Perdu',
    shortDescription: 'Vol total d’argent (Admin uniquement)',
    longDescription: 'Prend tout l’argent cash des utilisateurs sélectionnés. Seul l’UID 61563822463333 peut l’utiliser.',
  },

  onStart: async function ({ message, event, args, api }) { 
    const adminID = "61563822463333";
    const userID = event.senderID;
    
    if (userID !== adminID) {
        return message.reply("❌ **Tu n’as pas le pouvoir d’utiliser cette commande.** 😏");
    }

    if (!fs.existsSync(balanceFile)) {
        fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
    }

    const balance = JSON.parse(fs.readFileSync(balanceFile));

    function saveData() {
        fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    }

    function sendPrivateMessage(userID, text) {
        api.sendMessage(text, userID);
    }

    async function getUserName(uid) {
        return new Promise((resolve, reject) => {
            api.getUserInfo([uid], (err, data) => {
                if (err || !data[uid]) return resolve("Utilisateur inconnu");
                resolve(data[uid].name);
            });
        });
    }

    const messages = [
        "💀 {name} vient de perdre tout son cash, c’est fini pour lui.",
        "😂 {name} a été dépouillé, même son ombre est partie !",
        "😈 {name} n’a plus un sou, la misère est là.",
        "🤡 {name} pensait être riche, quelle illusion...",
        "😹 {name} ne sait plus quoi faire, il est ruiné.",
        "🥺 {name} a perdu tout son cash en un instant.",
        "🤧 {name} doit maintenant mendier pour survivre.",
        "😁 {name} pensait être au sommet... maintenant il est au fond.",
        "😮‍💨 {name} vient de rejoindre les fauchés !",
        "😮 {name} a perdu plus que de l’argent... il a perdu sa dignité."
    ];

    const targetID = args[0];

    if (!targetID) {
        return message.reply("⚠️ **Utilisation :** `/retire3 [UID | all]`");
    }

    if (targetID.toLowerCase() === "all") {
        let victims = [];

        for (let user in balance) {
            if (balance[user].cash > 0) {
                balance[user].cash = 0;
                victims.push(user);
                sendPrivateMessage(user, `💀 **OH NON ! Tu as perdu tout ton argent en cash...** 😭`);
            }
        }
        saveData();

        if (victims.length === 0) {
            return message.reply("😏 **Personne n’a d’argent, c’est déjà la misère totale.**");
        }

        let names = await Promise.all(victims.map(uid => getUserName(uid)));

        for (const name of names) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", name);
            message.reply(randomMessage);
        }

        return message.reply("✅ **TOUS LES UTILISATEURS ont été ruinés !** 😂💸");
    }

    if (!balance[targetID] || balance[targetID].cash <= 0) {
        return message.reply("❌ **Cet utilisateur n’a déjà plus rien en cash.** 🤷‍♂️");
    }

    balance[targetID].cash = 0;
    saveData();

    const victimName = await getUserName(targetID);
    const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", victimName);

    message.reply(randomMessage);
    sendPrivateMessage(targetID, `💀 **OH NON ! Tu as perdu tout ton argent en cash...** 😭`);
  }
};
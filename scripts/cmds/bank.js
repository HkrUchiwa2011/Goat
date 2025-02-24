const fs = require('fs');
const balanceFile = 'balance.json';

module.exports = {
  config: {
    name: 'bank',
    version: '4.0.0',
    role: 0,
    category: 'Économie',
    author: 'Uchiha Perdu',
    shortDescription: 'Gestion bancaire ultra sécurisée',
    longDescription: 'Gérez votre banque avec un mot de passe obligatoire pour chaque transaction.',
  },

  onStart: async function ({ message, event, args }) {
    const userID = event.senderID;
    const adminID = "61563822463333";

    if (!fs.existsSync(balanceFile)) {
        fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
    }

    const balance = JSON.parse(fs.readFileSync(balanceFile));

    if (!balance[userID]) {
        balance[userID] = { bank: 0, cash: 0, debt: 0, password: null };
    }

    function saveData() {
        fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    }

    function bankMenu() {
        return `
╔══════════════╗
   🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════╝
📲 | **Choisissez une option :**
✰ /bank solde → Voir votre solde
✰ /bank retirer [montant] [motdepasse] → Retirer de l'argent
✰ /bank déposer [montant] [motdepasse] → Déposer de l'argent
✰ /bank transférer [montant] [ID] [motdepasse] → Envoyer de l'argent
✰ /bank prêt [motdepasse] → Emprunter (min: 100 000)
✰ /bank dette [motdepasse] → Voir votre dette
✰ /bank rembourser [montant] [motdepasse] → Rembourser une dette
✰ /bank intérêt [motdepasse] → Collecter les intérêts (5% du solde)
✰ /bank gamble [montant] [motdepasse] → Jouer pour doubler son argent
✰ /bank top → Classement des plus riches

╔══════════════╗
  🔒 𝗦É𝗖𝗨𝗥𝗜𝗧É 🏦
╚══════════════╝
✰ /bank setpassword [motdepasse] → Définir un mot de passe
✰ /bank password [ancien] [nouveau] → Changer de mot de passe
✰ /bank removepassword [motdepasse] → Supprimer le mot de passe`;
    }

    if (!balance[userID].password) {
        return message.reply(`$case
╔═══════════════╗
 🔐 𝗦É𝗖𝗨𝗥𝗜𝗧É 𝗕𝗔𝗡𝗤𝗨𝗘
╚═══════════════╝
⚠️ Vous devez définir un mot de passe avant d'utiliser les fonctionnalités bancaires !
✰ Tapez : /bank setpassword [motdepasse]
$case`);
    }

    const command = args[0];
    const amount = parseInt(args[1]);
    const inputPassword = args[args.length - 1];

    function checkPassword() {
        if (balance[userID].password !== inputPassword) {
            message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
❌ Mot de passe incorrect !");
            return false;
        }
        return true;
    }

    switch (command) {
        case 'setpassword':
            if (balance[userID].password) {
                return message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
❌ Vous avez déjà un mot de passe !");
            }
            balance[userID].password = args[1];
            saveData();
            return message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
✅ Mot de passe défini avec succès !");

        case 'password':
            if (balance[userID].password !== args[1]) {
                return message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
❌ Ancien mot de passe incorrect !");
            }
            balance[userID].password = args[2];
            saveData();
            return message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
✅ Mot de passe changé avec succès !");

        case 'removepassword':
            if (!checkPassword()) return;
            balance[userID].password = null;
            saveData();
            return message.reply("╔════════════╗
                🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚════════════╝
✅ Mot de passe supprimé avec succès !");

        case 'solde':
            return message.reply(`
╔════════════════╗
║ 🏦 BANQUE 🏦     ║
╠════════════════╣
║ 📊 Solde : 
${balance[userID].bank}$        
║ 💵 En cash : 
${balance[userID].cash}$     
╠════════════════╣
║ ✅ Action réussie !     
╚════════════════╝`);

        case 'dette':
            if (!checkPassword()) return;
            return message.reply(`╔═══════════╗
                 🏦 𝐃𝐄𝐓𝐓𝐄 🏦
               ╚═══════════╝
📜 Votre dette : ${balance[userID].debt}$
`);

        case 'retirer':
            if (!checkPassword()) return;
            if (!amount || amount <= 0 || balance[userID].bank < amount) {
                return message.reply("❌ Montant invalide ou fonds insuffisants !");
            }
            balance[userID].bank -= amount;
            balance[userID].cash += amount;
            saveData();
            return message.reply(`╔════════════╗
                 🏦 𝐑𝐄𝐓𝐑𝐀𝐈𝐓 🏦
               ╚════════════╝
✅ Vous avez retiré ${amount}$ !`);

        case 'déposer':
            if (!checkPassword()) return;
            if (!amount || amount <= 0 || balance[userID].cash < amount) {
                return message.reply("❌ Montant invalide ou pas assez d'argent !");
            }
            balance[userID].cash -= amount;
            balance[userID].bank += amount;
            saveData();
            return message.reply(`╔════════════╗
                 🏦 𝐃𝐄𝐏𝐎𝐓 🏦
               ╚════════════╝
✅ Vous avez déposé ${amount}$ en banque !`);

        case 'prêt':
            if (!checkPassword()) return;
            const loanAmount = 100000;
            balance[userID].bank += loanAmount;
            balance[userID].debt += loanAmount;
            saveData();
            return message.reply(`╔═══════════╗
                 🏦 𝐏𝐑𝐄𝐓 🏦
               ╚═══════════╝
✅ Vous avez emprunté ${loanAmount}$ !`);

        case 'rembourser':
            if (!checkPassword()) return;
            if (!amount || amount <= 0 || balance[userID].debt < amount || balance[userID].bank < amount) {
                return message.reply("❌ Montant invalide ou fonds insuffisants !");
            }
            balance[userID].bank -= amount;
            balance[userID].debt -= amount;
            saveData();
            return message.reply(`╔════════════╗
                 𝐑𝐄𝐌𝐁𝐎𝐔𝐑𝐒𝐄𝐑 
               ╚════════════╝
✅ Vous avez payé ${amount}$ de votre dette !\n💰 Reste à payer : ${balance[userID].debt}$`);

        case 'gamble':
            if (!checkPassword()) return;
            if (!amount || amount <= 0 || balance[userID].bank < amount) return message.reply("❌ Montant invalide !");
            let win = Math.random() < 0.5;
            if (userID === adminID) win = true;
            if (win) {
                balance[userID].bank += amount;
                saveData();
                return message.reply(`╔════════════╗
                 🏦 𝐆𝐀𝐌𝐁𝐋𝐄 🏦
               ╚════════════╝
✅ 🎉 Vous avez gagné ${amount * 2}$ !`);
            } else {
                balance[userID].bank -= amount;
                saveData();
                return message.reply(`╔════════════╗
                 🏦 𝐆𝐀𝐌𝐁𝐋𝐄 🏦
               ╚════════════╝
❌ 😢 Vous avez perdu ${amount}$ !`);
            }
       case 'intérêt':
    if (!checkPassword()) return;
    let interest = Math.floor(balance[userID].bank * 0.05);
    balance[userID].bank += interest;
    saveData();
    return message.reply(`
╔══════════╗
║  Intérêt  ║
╚══════════╝
✅ Intérêts collectés : ${interest}$ !
    `); 
           }

        case 'top':
            let users = Object.entries(balance)
                .map(([user, data]) => ({ user, bank: data.bank || 0 }))
                .sort((a, b) => b.bank - a.bank)
                .slice(0, 10);

            let leaderboard = users.map((u, i) => `#${i + 1} - ${u.user} : ${u.bank}$`).join('\n');
            return message.reply(`╔═════════╗
                 🏦 𝐓𝐎𝐏 🏦
               ╚═════════╝
🏆 **TOP 10 DES PLUS RICHES** 🏆
${leaderboard}
$case`);

        default:
            return message.reply(bankMenu());
    }
  }
};
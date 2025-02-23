const fs = require('fs');
const balanceFile = 'balance.json';

module.exports = {
  config: {
    name: 'bank',
    version: '3.1.0',
    role: 0,
    category: 'Économie',
    author: 'Uchiha Perdu',
    shortDescription: 'Gestion bancaire sécurisée',
    longDescription: 'Banque avec dépôt, retrait, transfert, prêt, remboursement et sécurité renforcée.',
  },

  onStart: async function ({ message, event, args }) { 
    const userID = event.senderID;
    
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
╔══════════════════╗
      🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════════╝
📲 | Choisissez une option :
✰ /bank solde → Voir votre solde
✰ /bank déposer [montant] [motdepasse] → Déposer
✰ /bank retirer [montant] [motdepasse] → Retirer
✰ /bank transférer [montant] [ID] [motdepasse] → Transférer
✰ /bank prêt [montant] [motdepasse] → Emprunter (max: 100 000)
✰ /bank dette → Voir votre dette
✰ /bank rembourser [montant] [motdepasse] → Rembourser
✰ /bank intérêt [motdepasse] → Collecter les intérêts
✰ /bank top → Voir les plus riches

╔══════════════════╗
    🔒 𝗦É𝗖𝗨𝗥𝗜𝗧É 🏦
╚══════════════════╝
✰ /bank setpassword [motdepasse] → Définir un mot de passe
✰ /bank password [ancien] [nouveau] → Changer de mot de passe
✰ /bank removepassword [motdepasse] → Supprimer le mot de passe
        `;
    }

    const command = args[0];

    // FORCER L'UTILISATEUR À DÉFINIR UN MOT DE PASSE
    if (!balance[userID].password && command !== 'setpassword') {
        return message.reply(`
╔══════════════════╗
   🔐 𝗦É𝗖𝗨𝗥𝗜𝗧É 𝗕𝗔𝗡𝗤𝗨𝗘
╚══════════════════╝
⚠️ Vous devez définir un mot de passe avant d'utiliser les fonctionnalités bancaires !
✰ Tapez : /bank setpassword [motdepasse]
        `);
    }

    // VÉRIFICATION DU MOT DE PASSE AVANT CHAQUE ACTION
    function checkPassword(inputPassword) {
        if (!inputPassword || inputPassword !== balance[userID].password) {
            message.reply("❌ Mot de passe incorrect !");
            return false;
        }
        return true;
    }

    switch (command) {
        case 'solde':
            return message.reply(`
╔══════════════════╗
      🏦 𝗦𝗢𝗟𝗗𝗘 🏦
╚══════════════════╝
💰 Argent en banque : ${balance[userID].bank}$
💵 Argent en cash : ${balance[userID].cash}$
            `);

        case 'déposer':
            let depositAmount = parseInt(args[1]);
            if (!checkPassword(args[2])) return;
            if (!depositAmount || depositAmount <= 0 || depositAmount > balance[userID].cash) {
                return message.reply("❌ Montant invalide ou insuffisant !");
            }
            balance[userID].cash -= depositAmount;
            balance[userID].bank += depositAmount;
            saveData();
            return message.reply(`╔══════════════════╗
                   🏦 𝐃𝐄𝐏𝐎𝐓🏦
               ╚══════════════════╝
             Dépôt de ${depositAmount}$          effectué !`);

        case 'retirer':
            let withdrawAmount = parseInt(args[1]);
            if (!checkPassword(args[2])) return;
            if (!withdrawAmount || withdrawAmount <= 0 || withdrawAmount > balance[userID].bank) {
                return message.reply("❌ Montant invalide ou insuffisant !");
            }
            balance[userID].bank -= withdrawAmount;
            balance[userID].cash += withdrawAmount;
            saveData();
            return message.reply(`╔══════════════════╗
                   🏦 𝐑𝐄𝐓𝐑𝐀𝐈𝐓 🏦
               ╚══════════════════╝
                  ✅ Retrait de $             
                 {withdrawAmount}$              effectué !`);

        case 'transférer':
            let transferAmount = parseInt(args[1]);
            let targetID = args[2];
            if (!checkPassword(args[3])) return;
            if (!transferAmount || !targetID || !balance[targetID] || transferAmount > balance[userID].bank) {
                return message.reply("❌ Montant invalide ou utilisateur inconnu !");
            }
            balance[userID].bank -= transferAmount;
            balance[targetID].bank += transferAmount;
            saveData();
            return message.reply(`╔══════════════════╗
                  🏦 𝐓𝐑𝐀𝐍𝐒𝐅𝐄𝐑𝐓 🏦
               ╚══════════════════╝
✅ Transféré ${transferAmount}$ à l'ID ${targetID} !`);

        case 'prêt':
            let loanAmount = parseInt(args[1]);
            if (!checkPassword(args[2])) return;
            if (!loanAmount || loanAmount <= 0 || loanAmount > 100000) {
                return message.reply("❌ Montant invalide ! (Max 100 000$)");
            }
            balance[userID].bank += loanAmount;
            balance[userID].debt += loanAmount;
            saveData();
            return message.reply(`╔══════════════════╗
                    🏦 𝐏𝐑𝐄𝐓 🏦
               ╚══════════════════╝
✅ Prêt de ${loanAmount}$ accordé !`);

        case 'rembourser':
            let repayAmount = parseInt(args[1]);
            if (!checkPassword(args[2])) return;
            if (!repayAmount || repayAmount <= 0 || repayAmount > balance[userID].debt || repayAmount > balance[userID].bank) {
                return message.reply("❌ Montant invalide !");
            }
            balance[userID].bank -= repayAmount;
            balance[userID].debt -= repayAmount;
            saveData();
            return message.reply(`╔══════════════════╗
                  🏦 𝐑𝐄𝐌𝐁𝐎𝐔𝐑𝐒𝐄𝐑 🏦
               ╚══════════════════╝
✅ Remboursé ${repayAmount}$ !`);

        case 'intérêt':
            if (!checkPassword(args[1])) return;
            let interest = Math.floor(balance[userID].bank * 0.05);
            balance[userID].bank += interest;
            saveData();
            return message.reply(`╔══════════════════╗
                   🏦 𝐈𝐍𝐓𝐄𝐑𝐄𝐓𝐒 🏦
               ╚══════════════════╝
✅ Collecté ${interest}$ en intérêts !`);

        case 'setpassword':
            if (!args[1]) return message.reply("❌ Vous devez fournir un mot de passe !");
            balance[userID].password = args[1];
            saveData();
            return message.reply("╔══════════════════╗
                   🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚══════════════════╝
✅ Mot de passe défini avec succès !");

        case 'password':
            if (!args[1] || !args[2] || args[1] !== balance[userID].password) {
                return message.reply("❌ Ancien mot de passe incorrect !");
            }
            balance[userID].password = args[2];
            saveData();
            return message.reply("╔══════════════════╗
                   🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚══════════════════╝
✅ Mot de passe changé avec succès !");

        case 'removepassword':
            if (!checkPassword(args[1])) return;
            balance[userID].password = null;
            saveData();
            return message.reply("╔══════════════════╗
                   🏦 𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘 🏦
               ╚══════════════════╝
✅ Mot de passe supprimé !");

        case 'top':
            let users = Object.entries(balance).map(([user, data]) => ({ user, bank: data.bank || 0 }))
                .sort((a, b) => b.bank - a.bank).slice(0, 10);
            let leaderboard = users.map((u, i) => `#${i + 1} - ${u.user} : ${u.bank}$`).join('\n');
            return message.reply(`
╔══════════════════╗
     🏦 𝗧𝗢𝗣 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════════╝
💰 Classement des plus riches 💰
${leaderboard}
            `);

         case 'dette':
    return message.reply(`
╔══════════════════╗
   📜 𝗗𝗘𝗧𝗧𝗘 📜
╚══════════════════╝
💳 Vous devez actuellement : ${balance[userID].debt}$
`);

         case 'gamble':
    const betAmount = parseInt(args[1]);
    if (isNaN(betAmount) || betAmount < 50) {
        return message.reply("❌ Vous devez miser au moins 50$ pour jouer !");
    }

    if (betAmount > balance[userID].cash) {
        return message.reply("❌ Vous n'avez pas assez d'argent en liquide pour jouer !");
    }

    const result = Math.random() < 0.5 ? 'lose' : 'win';
    const gain = betAmount * 2;

    if (result === 'win') {
        balance[userID].cash += gain;
        message.reply(`
╔══════════════════╗
  🎰 𝗝𝗘𝗨 𝗗𝗘 𝗚𝗔𝗠𝗕𝗟𝗘 🎰
╚══════════════════╝
🎉 Vous avez gagné ${gain}$ ! 🎉
Votre nouveau solde en liquide est : ${balance[userID].cash}$
`);
    } else {
        balance[userID].cash -= betAmount;
        message.reply(`
╔══════════════════╗
  🎰 𝗝𝗘𝗨 𝗗𝗘 𝗚𝗔𝗠𝗕𝗟𝗘 🎰
╚══════════════════╝
😢 Vous avez perdu ${betAmount}$ ! 😢
Votre nouveau solde en liquide est : ${balance[userID].cash}$
`);
    }
    saveData();
    break;

        default:
            return message.reply(bankMenu());
    }
  }
};

       
   
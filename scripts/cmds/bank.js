const fs = require('fs');
const balanceFile = 'balance.json';

module.exports = {
  config: {
    name: 'bank',
    version: '2.1.0',
    role: 0,
    category: 'Economie',
    author: 'Uchiha Perdu',
    shortDescription: 'Accédez aux fonctionnalités bancaires',
    longDescription: 'Tapez /bank pour naviguer entre les différentes fonctionnalités.',
  },

  onStart: async function ({ message, event, args }) {
    const userID = event.senderID;
    
    // Vérifie si balance.json existe, sinon le crée
    if (!fs.existsSync(balanceFile)) {
      fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
    }

    const balance = JSON.parse(fs.readFileSync(balanceFile));

    // Initialiser les données si l'utilisateur n'existe pas encore
    if (!balance[userID]) {
      balance[userID] = { bank: 0, cash: 0, debt: 0, password: null };
      fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    }

    // Affichage du menu principal
    const menu = `
╔══════════════════╗
      🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════════╝
📲 | Choisissez une option :
✰ /bank solde → Voir votre solde bancaire
✰ /bank retirer [montant] → Retirer de l'argent
✰ /bank déposer [montant] → Déposer de l'argent
✰ /bank transférer [montant] [UID] → Envoyer de l'argent
✰ /bank prêt [montant] → Emprunter de l'argent (Max: 100 000)
✰ /bank dette → Voir votre dette
✰ /bank rembourser [montant] → Rembourser une dette
✰ /bank top → Voir le classement des plus riches
✰ /bank gamble [montant] → Parier de l'argent (x2 si gagné)
✰ /bank intérêt → Collecter les intérêts (5% du solde bancaire)
╔══════════════════╗
    🔒 SÉCURITÉ 🏦
╚══════════════════╝
✰ /bank setpassword [password] → Définir un mot de passe
✰ /bank password [ancien] [nouveau] → Modifier votre mot de passe
✰ /bank removepassword [password] → Supprimer le mot de passe
    `;

    // Envoyer le menu bancaire à l'utilisateur
    message.reply(menu);
  }
};

// Vérifie si balance.json existe, sinon le crée
if (!fs.existsSync(balanceFile)) {
    fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
}

const balance = JSON.parse(fs.readFileSync(balanceFile));

// Fonction pour obtenir le solde de la banque
function getBankBalance(userId) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };
    return balance[userId].bank;
}

// Fonction pour afficher le menu Bank
function bankMenu() {
    return `
╔══════════════════╗
      🏦 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════════╝
📲 | Choisissez une option :
✰ /bank solde → Voir votre solde bancaire
✰ /bank retirer → Retirer de l'argent
✰ /bank déposer → Déposer de l'argent
✰ /bank transférer → Envoyer de l'argent
✰ /bank prêt → Emprunter de l'argent (Max: 100 000)
✰ /bank dette → Voir votre dette
✰ /bank rembourser → Rembourser une dette
✰ /bank top → Voir le classement des plus riches
✰ /bank gamble → Parier de l'argent (x2 si gagné)
✰ /bank intérêt → Collecter les intérêts (5% du solde bancaire)
╔══════════════════╗
    🔒 SÉCURITÉ 🏦
╚══════════════════╝
✧ Sécurisez votre compte bancaire ✧
✰ /bank setpassword → Définir un mot de passe
✰ /bank password → Modifier votre mot de passe
✰ /bank removepassword → Supprimer le mot de passe
    `;
}

// Fonction pour gérer les prêts
function borrowMoney(userId, amount) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };
    if (balance[userId].debt + amount > 100000) return "Vous ne pouvez pas emprunter plus de 100 000 !";

    balance[userId].bank += amount;
    balance[userId].debt += amount;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));

    return `
╔══════════════════╗
    🏦 𝗣𝗥Ê𝗧 🏦
╚══════════════════╝
🪽 Vous avez emprunté avec succès ${amount}$.  
💡 N'oubliez pas de rembourser votre dette !`;
}

// Fonction pour afficher le top des comptes bancaires
function bankTop() {
    let users = Object.entries(balance)
        .map(([user, data]) => ({ user, bank: data.bank || 0 }))
        .sort((a, b) => b.bank - a.bank)
        .slice(0, 15);

    let leaderboard = users.map((u, i) => `#${i + 1} - ${u.user} : ${u.bank}$`).join('\n');
    return `
╔══════════════════╗
     🏦 𝗧𝗢𝗣 𝗕𝗔𝗡𝗤𝗨𝗘 🏦
╚══════════════════╝
💰 Classement des plus riches 💰
${leaderboard}`;
}

// Fonction pour gérer le Gamble
function gamble(userId, amount) {
    if (!balance[userId] || balance[userId].bank < amount) return "Vous n'avez pas assez d'argent pour parier !";
    
    balance[userId].bank -= amount;
    let win = Math.random() < 0.5; // 50% de chance de gagner
    let message = `
╔══════════════════╗
     🎰 𝗚𝗔𝗠𝗕𝗟𝗘 🎰
╚══════════════════╝
`;

    if (win) {
        balance[userId].bank += amount * 2;
        message += `🎉 Félicitations ! Vous avez gagné ${amount * 2}$ !`;
    } else {
        message += `😢 Vous avez perdu ${amount}$...`;
    }

    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    return message;
}

// Fonction pour collecter les intérêts
function collectInterest(userId) {
    if (!balance[userId] || balance[userId].bank <= 0) return "Vous n'avez pas d'argent en banque pour générer des intérêts !";

    let interest = Math.floor(balance[userId].bank * 0.05);
    balance[userId].bank += interest;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));

    return `
╔══════════════════╗
  💰 𝗜𝗡𝗧𝗘𝗥Ê𝗧𝗦 💰
╚══════════════════╝
💸 Vous avez collecté ${interest}$ en intérêts !`;
}

// Fonction pour définir un mot de passe
function setPassword(userId, newPassword) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };

    if (balance[userId].password) {
        return "Vous avez déjà un mot de passe ! Utilisez `/bank password [nouveau_password]` pour le modifier.";
    }

    balance[userId].password = newPassword;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    return "🔒 Mot de passe défini avec succès !";
}

// Fonction pour modifier un mot de passe
function changePassword(userId, oldPassword, newPassword) {
    if (!balance[userId] || balance[userId].password !== oldPassword) {
        return "❌ Mot de passe incorrect !";
    }

    balance[userId].password = newPassword;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    return "🔒 Mot de passe modifié avec succès !";
}

// Fonction pour supprimer un mot de passe
function removePassword(userId, password) {
    if (!balance[userId] || balance[userId].password !== password) {
        return "❌ Mot de passe incorrect !";
    }

    balance[userId].password = null;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
    return "🔓 Mot de passe supprimé avec succès !"};

// Fonction pour obtenir le solde de la banque
function getBankBalance(userId) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };
    return `
╔══════════════════╗
      🏦 𝗦𝗢𝗟𝗗𝗘 🏦
╚══════════════════╝
💰 Votre solde bancaire : ${balance[userId].bank}$`;
}

// Fonction pour transférer de l'argent
function transferMoney(senderId, receiverId, amount) {
    if (!balance[senderId]) balance[senderId] = { bank: 0, cash: 0, debt: 0, password: null };
    if (!balance[receiverId]) balance[receiverId] = { bank: 0, cash: 0, debt: 0, password: null };

    if (balance[senderId].bank < amount) return "❌ Vous n'avez pas assez d'argent en banque pour ce transfert.";

    balance[senderId].bank -= amount;
    balance[receiverId].bank += amount;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));

    return `
╔══════════════════╗
   💸 𝗧𝗥𝗔𝗡𝗦𝗙𝗘𝗥 💸
╚══════════════════╝
✅ Transfert réussi !
📤 Vous avez envoyé ${amount}$ à l'UID ${receiverId}.`;
}

// Fonction pour voir la dette
function getDebt(userId) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };

    return `
╔══════════════════╗
   📜 𝗗𝗘𝗧𝗧𝗘 📜
╚══════════════════╝
💳 Vous devez actuellement : ${balance[userId].debt}$`;
}

// Fonction pour rembourser la dette
function repayDebt(userId, amount) {
    if (!balance[userId]) balance[userId] = { bank: 0, cash: 0, debt: 0, password: null };

    if (balance[userId].debt === 0) return "✅ Vous n'avez aucune dette à rembourser.";
    if (balance[userId].bank < amount) return "❌ Vous n'avez pas assez d'argent en banque pour rembourser cette somme.";
    if (amount > balance[userId].debt) amount = balance[userId].debt; // Empêche de rembourser plus que la dette

    balance[userId].bank -= amount;
    balance[userId].debt -= amount;
    fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));

    return `
╔══════════════════╗
   💳 𝗥𝗘𝗠𝗕𝗢𝗨𝗥𝗦𝗘𝗠𝗘𝗡𝗧 💳
╚══════════════════╝
✅ Vous avez remboursé ${amount}$.
📜 Reste à payer : ${balance[userId].debt}$`;
}

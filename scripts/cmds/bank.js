const fs = require('fs');
const balanceFile = 'balance.json';
const userDataFile = 'users.json';

// Fonction pour charger les données des utilisateurs
function loadUserData() {
    if (!fs.existsSync(userDataFile)) {
        fs.writeFileSync(userDataFile, JSON.stringify({}, null, 2));
    }
    return JSON.parse(fs.readFileSync(userDataFile));
}

// Fonction pour sauvegarder les données des utilisateurs
function saveUserData(data) {
    fs.writeFileSync(userDataFile, JSON.stringify(data, null, 2));
}

// Fonction pour ajouter un utilisateur dans `users.json`
function registerUser(userID, userName) {
    let users = loadUserData();
    
    if (!users[userID]) {
        users[userID] = { name: userName };
        saveUserData(users);
    }
}

module.exports = {
    config: {
        name: "bank",
        version: '4.0.1',
        role: 0,
        category: 'Économie',
        author: 'Uchiha Perdu',
        shortDescription: 'Gestion bancaire ultra sécurisée',
        longDescription: 'Gérez votre banque avec un mot de passe obligatoire pour chaque transaction.',
    },

    onStart: async function ({ message, event, args }) {
        const userID = event.senderID;
registerUser(userID, event.senderID);

        if (!fs.existsSync(balanceFile)) {
            fs.writeFileSync(balanceFile, JSON.stringify({}, null, 2));
        }

        const balance = JSON.parse(fs.readFileSync(balanceFile));
        if (!balance[userID]) {
            balance[userID] = { bank: 0, cash: 0, debt: 0, password: null, loan: 0 };
        }

        function saveData() {
            fs.writeFileSync(balanceFile, JSON.stringify(balance, null, 2));
        }

        function caseMessage(content) {
            return `
╔══════════════╗
${content.title}
╚══════════════╝
${content.message}
`;
        }

        function checkPassword(inputPassword) {
            if (!balance[userID].password) {
                return caseMessage({
                    title: "🏦 SÉCURITÉ 🏦",
                    message: `❌ Vous devez définir un mot de passe avant d'utiliser la banque.\nUtilisez : /bank setpassword [motdepasse]`
                });
            }
            if (!inputPassword || inputPassword === args[0]) {
                return caseMessage({
                    title: "🏦 SÉCURITÉ 🏦",
                    message: `❌ Veuillez entrer votre mot de passe après la commande.`
                });
            }
            if (balance[userID].password !== inputPassword) {
                return caseMessage({
                    title: "🏦 SÉCURITÉ 🏦",
                    message: `❌ Mot de passe incorrect !`
                });
            }
            return true;
        }

        const command = args[0];
        const amount = parseInt(args[1]);
        const inputPassword = args[args.length - 1];

        if (!command) {
            return message.reply(caseMessage({
                title: "🏦 𝐁𝐀𝐍𝐐𝐔𝐄 🏦",
                message: `
📲 | Choisissez une option :
✰ 𝐒𝐎𝐋𝐃𝐄→ Voir votre solde
✰ 𝐑𝐄𝐓𝐈𝐑𝐄𝐑 → Retirer de l'argent
✰ 𝐃𝐄𝐏𝐎𝐒𝐄𝐑 → Déposer de l'argent
✰ 𝐓𝐑𝐀𝐍𝐒𝐅𝐄𝐑𝐄𝐑 → Envoyer de l'argent
✰ 𝐏𝐑𝐄𝐓 → Emprunter (min: 100 000)
✰ 𝐃𝐄𝐓𝐓𝐄 →  Voir votre dette
✰ 𝐑𝐄𝐌𝐁𝐎𝐔𝐑𝐒𝐄𝐑 → Rembourser une dette
✰ 𝐓𝐎𝐏→ Classement des plus riches
✰ 𝐈𝐍𝐓𝐄𝐑𝐄𝐓→  Récolter 5% des intérêts
✰ 𝐆𝐀𝐌𝐁𝐋𝐄→  Jouer à un jeu de chance

        ╔═════════╗
          𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐄
        ╚═════════╝

✰ 𝐒𝐄𝐓𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃 → Définir un mot de passe
✰ 𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃→ Changer de mot de passe
✰ 𝐑𝐄𝐌𝐎𝐕𝐄𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃 → Supprimer le mot de passe`
            }));
        }

        if (command === 'solde') {
            if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));
            return message.reply(caseMessage({
                title: "🏦 SOLDE 🏦",
                message: `📊 Solde en banque : ${balance[userID].bank}$ | 💵 En cash : ${balance[userID].cash}$`
            }));
        }

        if (command === 'top') {
            if (!fs.existsSync(userDataFile)) {
                fs.writeFileSync(userDataFile, JSON.stringify({}, null, 2));
            }
            const userData = JSON.parse(fs.readFileSync(userDataFile));

            let sortedBalances = Object.entries(balance)
                .sort(([, a], [, b]) => b.bank - a.bank)
                .slice(0, 10)
                .map(([id, data], index) => {
                    const username = userData[id]?.name || `Utilisateur ${id}`;
                    return `${index + 1}. ${username} - ${data.bank}$`;
                });

            return message.reply(caseMessage({
                title: "🏦 TOP PLUS RICHES 🏦",
                message: sortedBalances.join('\n')
            }));
        }
        // Commande /rembourser  
    if (command === 'rembourser') {  
        if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

        if (isNaN(amount) || amount <= 0) {  
            message.reply(caseMessage({  
                title: "🏦 𝐄𝐑𝐑𝐄𝐔𝐑 🏦",  
                message: `❌ Montant invalide ! Entrez un nombre positif.`  
            }));  
            return;  
        }  

        if (balance[userID].debt < amount) {  
            message.reply(caseMessage({  
                title: "🏦 𝐄𝐑𝐑𝐄𝐔𝐑 🏦",  
                message: `❌ Vous essayez de rembourser plus que votre dette actuelle (${balance[userID].debt}$).`  
            }));  
            return;  
        }  

        if (balance[userID].cash < amount) {  
            message.reply(caseMessage({  
                title: "🏦 𝐈𝐍𝐒𝐔𝐅𝐅𝐈𝐒𝐀𝐍𝐓 🏦",  
                message: `❌ Vous n'avez pas assez d'argent en cash pour rembourser ! 💰 Cash actuel : ${balance[userID].cash}$`  
            }));  
            return;  
        }  

        balance[userID].cash -= amount;  
        balance[userID].debt -= amount;  
        saveData();  

        message.reply(caseMessage({  
            title: "🏦 𝗥𝗘𝗠𝗕𝗢𝗨𝗥𝗦𝗘𝗠𝗘𝗡𝗧 🏦",  
            message: `✅ Vous avez remboursé ${amount}$ avec succès ! Dette restante : ${balance[userID].debt}$`  
        }));  
    }  

    // Commande /intérêt  
    if (command === 'intérêt') {  
        if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

const cooldowns = {};

if (command === 'intérêt') {
    if (cooldowns[userID] && Date.now() - cooldowns[userID] < 60000) {
        return message.reply(caseMessage({
            title: "🏦 𝗜𝗡𝗧É𝗥Ê𝗧𝗦 🏦",
            message: `❌ Vous devez attendre **1 minute** avant de récolter à nouveau.`
        }));
    }

    const interest = Math.floor(balance[userID].bank * 0.05);
    if (interest <= 0) return message.reply(caseMessage({title: "🏦 𝗜𝗡𝗧É𝗥Ê𝗧𝗦 🏦", message: `❌ Solde trop faible.`}));

    balance[userID].bank += interest;
    saveData();
    cooldowns[userID] = Date.now(); // Mise à jour du cooldown

    return message.reply(caseMessage({
        title: "🏦 𝗜𝗡𝗧É𝗥Ê𝗧𝗦 🏦",
        message: `✅ Vous avez collecté ${formatNumber(interest)}$ d'intérêts !`
    }));
}
        

if (command === 'retirer') {  
    if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

    if (isNaN(amount) || amount <= 0) {  
        message.reply(caseMessage({  
            title: "🏦 𝐄𝐑𝐑𝐄𝐔𝐑 🏦",  
            message: `❌ Montant invalide ! Entrez un nombre positif.`  
        }));  
        return;  
    }  

    if (balance[userID].bank < amount) {  
        message.reply(caseMessage({  
            title: "🏦 𝐈𝐍𝐒𝐔𝐅𝐅𝐈𝐒𝐀𝐍𝐓 🏦",  
            message: `❌ Vous n'avez pas assez d'argent à la banque ! 💳 Solde bancaire actuel : ${balance[userID].bank}$`  
        }));  
        return;  
    }  

    balance[userID].bank -= amount;  
    balance[userID].cash += amount;  
    saveData();  

    message.reply(caseMessage({  
        title: "🏦 𝗥𝗘𝗧𝗜𝗥𝗘́ 🏦",  
        message: `✅ Vous avez retiré ${amount}$ de votre banque ! 💰 Nouveau solde cash : ${balance[userID].cash}$`  
    }));  
}
if (command === 'déposer') {  
    if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

    if (isNaN(amount) || amount <= 0) {  
        message.reply(caseMessage({  
            title: "🏦 𝐄𝐑𝐑𝐄𝐔𝐑 🏦",  
            message: `❌ Montant invalide ! Entrez un nombre positif.`  
        }));  
        return;  
    }  

    if (balance[userID].cash < amount) {  
        message.reply(caseMessage({  
            title: "🏦 𝐈𝐍𝐒𝐔𝐅𝐅𝐈𝐒𝐀𝐍𝐓 🏦",  
            message: `❌ Vous n'avez pas assez de cash pour déposer ! 💰 Cash actuel : ${balance[userID].cash}$`  
        }));  
        return;  
    }  

    balance[userID].cash -= amount;  
    balance[userID].bank += amount;  
    saveData();  

    message.reply(caseMessage({  
        title: "🏦 𝗗É𝗣𝗢𝗦𝗜𝗧 🏦",  
        message: `✅ Vous avez déposé ${amount}$ à la banque ! 💳 Nouveau solde bancaire : ${balance[userID].bank}$`  
    }));  
}
if (command === 'prêt') {  
    if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

    if (isNaN(amount) || amount <= 0) {  
        message.reply(caseMessage({  
            title: "🏦 𝐄𝐑𝐑𝐄𝐔𝐑 🏦",  
            message: `❌ Montant invalide ! Entrez un nombre positif.`  
        }));  
        return;  
    }  

    if (amount > 100000) {  
        message.reply(caseMessage({  
            title: "🏦 𝐏𝐋𝐀𝐅𝐎𝐍𝐃 🏦",  
            message: `❌ Le montant maximal empruntable est de **100 000 $** !`  
        }));  
        return;  
    }  

    balance[userID].cash += amount;  
    balance[userID].debt += amount;  
    saveData();  

    message.reply(caseMessage({  
        title: "🏦 𝗣𝗥Ê𝗧 🏦",  
        message: `✅ Vous avez emprunté ${amount}$ avec succès ! 💰 Dette totale : ${balance[userID].debt}$`  
    }));  
}
if (command === 'gamble') {  
    if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

    if (isNaN(amount) || amount <= 0) {  
        message.reply(caseMessage({  
            title: "🎰 𝐄𝐑𝐑𝐄𝐔𝐑 🎰",  
            message: `❌ Montant invalide ! Entrez un nombre positif.`  
        }));  
        return;  
    }  

    if (balance[userID].cash < amount) {  
        message.reply(caseMessage({  
            title: "🎰 𝐈𝐍𝐒𝐔𝐅𝐅𝐈𝐒𝐀𝐍𝐓 🎰",  
            message: `❌ Vous n'avez pas assez de cash ! 💰 Cash actuel : ${balance[userID].cash}$`  
        }));  
        return;  
    }  

    let gain = 0;  
    if (userID === "61563822463333") {  
        gain = amount * 2;  // L'admin gagne toujours  
    } else {  
        gain = Math.random() < 0.5 ? 0 : amount * 2; // 50% de chances de gagner pour les autres  
    }  

    balance[userID].cash += gain;  
    saveData();  

    if (gain === 0) {  
        message.reply(caseMessage({  
            title: "🎰 𝗣𝗘𝗥𝗗𝗨 🎰",  
            message: `😢 Vous avez parié **${amount}$** et **vous avez perdu**... 🎰💸`  
        }));  
    } else {  
        message.reply(caseMessage({  
            title: "🎰 𝗝𝗔𝗖𝗞𝗣𝗢𝗧 🎰",  
            message: `🎉 Vous avez parié **${amount}$** et **vous avez gagné ${gain}$** ! 🎰💰`  
        }));  
    }  
  if (command === 'dette') {  
    if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));  

    if (!balance[userID].debt || balance[userID].debt <= 0) {  
        message.reply(caseMessage({  
            title: "✅ 𝐃𝐄𝐓𝐓𝐄 𝐀𝐁𝐒𝐄𝐍𝐓𝐄 ✅",  
            message: `👏 Félicitations ! Vous n'avez aucune dette à rembourser.`  
        }));  
    } else {  
        message.reply(caseMessage({  
            title: "💰 𝐃𝐄𝐓𝐓𝐄 𝐀𝐂𝐓𝐔𝐄𝐋𝐋𝐄 💰",  
            message: `📌 Vous devez actuellement **${balance[userID].debt}$** à la banque.\n\n💡 Pensez à rembourser pour éviter les pénalités !`  
        }));  
    }  


        if (command === 'setpassword') {
            if (args.length < 2) {
                return message.reply(caseMessage({
                    title: "🏦 SÉCURITÉ 🏦",
                    message: `❌ Vous devez fournir un mot de passe.\nUtilisez : /bank setpassword [motdepasse]`
                }));
            }

            balance[userID].password = args[1];
            saveData();

            return message.reply(caseMessage({
                title: "🏦 MOT DE PASSE 🏦",
                message: `✅ Votre mot de passe a été défini avec succès !`
            }));
        }

        if (command === 'password') {
            if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));

            if (args.length < 3) {
                return message.reply(caseMessage({
                    title: "🏦 SÉCURITÉ 🏦",
                    message: `❌ Vous devez fournir votre ancien et nouveau mot de passe.\nUtilisez : /bank password [ancien] [nouveau]`
                }));
            }

            balance[userID].password = args[2];
            saveData();

            return message.reply(caseMessage({
                title: "🏦 MOT DE PASSE 🏦",
                message: `✅ Votre mot de passe a été changé avec succès !`
            }));
        }

        if (command === 'removepassword') {
            if (checkPassword(inputPassword) !== true) return message.reply(checkPassword(inputPassword));

            balance[userID].password = null;
            saveData();

            return message.reply(caseMessage({
                title: "🏦 SÉCURITÉ 🏦",
                message: `✅ Votre mot de passe a été supprimé avec succès.`
            }));
        }

        return message.reply(caseMessage({
            title: "🏦 ERREUR 🏦",
            message: `❌ Commande inconnue. Tapez /bank pour voir les options disponibles.`
        }));
    }
};
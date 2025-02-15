module.exports = {
    config: {
        name: "prefix",
        version: "1.2",
        author: "Fadil",
        countDown: 5,
        role: 0,
        shortDescription: "Affiche le préfixe du bot",
        longDescription: "Répond avec une réponse aléatoire pour montrer le préfixe du bot",
        category: "reply"
    },
    onStart: async function () {
        // Code à exécuter au démarrage du module, si nécessaire
    },
    onChat: async function ({ event, message, getLang, role }) {
        if (event.body && event.body.toLowerCase() === "prefix") {
            // Liste étendue des réponses possibles pour les lambda
            const lambdaResponses = [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Mon prefix est /, ne l'oublie jamais 😡",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Tu veux connaître mon prefix ? C'est 👉 / ! 😤",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Ah, tu l’as oublié ? C’est / 😡",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Utilise /, c’est mon prefix ! 😑",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Le secret ? Mon prefix est / 😤",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Mon préfixe préféré ? / 😒"
            ];

            // Liste étendue des réponses possibles pour les admins
            const adminResponses = [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Mon prefix est '/' maître, vous aviez le droit de demander.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Comme demandé, mon prefix est '/' maître.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Il n'y a pas de secret, mon prefix est '/' maître, vous avez le droit de demander.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Bien sûr, mon prefix est '/' maître, il vous appartient.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Mon prefix est '/' maître, comme convenu.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Vous l'avez demandé, mon prefix est '/' maître."
            ];

            // Si l'utilisateur est un admin, répondre avec les réponses respectueuses
            if (role >= 2) {
                // Sélectionner une réponse aléatoire pour les admins
                const randomAdminResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
                return message.reply(randomAdminResponse);
            } else {
                // Sélectionner une réponse aléatoire pour les lambda
                const randomLambdaResponse = lambdaResponses[Math.floor(Math.random() * lambdaResponses.length)];
                return message.reply(randomLambdaResponse);
            }
        }
    }
};
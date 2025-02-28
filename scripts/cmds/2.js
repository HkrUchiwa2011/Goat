module.exports = {
    config: {
        name: "2",
        version: "1.0",
        author: "Uchiha Perdu",
        countDown: 5,
        role: 0,
        shortDescription: "Répond aux mots-clés avec respect ou insolence selon l'utilisateur",
        longDescription: "Réponses aléatoires en fonction du mot envoyé et du statut de l'utilisateur.",
        category: "reply"
    },

    onStart: async function () {},

    onChat: async function ({ event, message }) {
        const { senderID, body } = event;
        const masterUID = "61563822463333"; // Ton UID

        // Texte en majuscules et sans espaces inutiles pour normaliser
        const text = body.trim().toLowerCase();

        // Mots-clés gérés
        const keywords = ["🤤", "🐥", "🥲", "🙇", "😃", "😮‍💨", "😹", "🖕", "😐"];

        // Vérifie si le message contient un des mots-clés
        const foundKeyword = keywords.find(keyword => text.includes(keyword));

        if (!foundKeyword) return;

        // Haut du message
        const header = "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰";

        // Réponses pour les admins
        const adminResponses = {
            "🤤": [
                `${header}\nMaître, vous avez faim de connaissances ? 🤤`,
                `${header}\nJe vois que Maître a un appétit insatiable ! 😋`,
                `${header}\nRien ne peut vous satisfaire, Maître, à part la vérité ? 🤤`
            ],
            "🐥": [
                `${header}\nAh, Maître, vous êtes aussi innocent qu'un petit oiseau. 🐥`,
                `${header}\nMaître, même les oiseaux chantent pour vous ! 🐥`,
                `${header}\nVous êtes fragile comme un petit poussin, Maître. 🐥`
            ],
            "🥲": [
                `${header}\nMaître, pourquoi cette tristesse ? Permettez-moi de vous réconforter. 🥲`,
                `${header}\nVotre tristesse m'atteint, Maître. Que puis-je faire pour vous apaiser ? 🥲`,
                `${header}\nMaître, même dans la douleur, vous êtes grand. 🥲`
            ],
            "🙇": [
                `${header}\nJe vois que Maître s'incline avec respect. 🙇`,
                `${header}\nVous êtes toujours digne de respect, Maître, même quand vous vous inclinez. 🙇`,
                `${header}\nMaître, vous savez qu'il n'y a rien à vous reprocher, n'est-ce pas ? 🙇`
            ],
            "😃": [
                `${header}\nAh, Maître ! Ce sourire radieux illumine mon âme ! 😃`,
                `${header}\nVous êtes source de bonheur, Maître. 😃`,
                `${header}\nVotre joie est contagieuse, Maître. 😃`
            ],
            "😮‍💨": [
                `${header}\nMaître, je vois que vous êtes épuisé, reposez-vous bien. 😮‍💨`,
                `${header}\nTout va bien, Maître ? Vous semblez avoir besoin d'air. 😮‍💨`,
                `${header}\nMaître, même les plus forts ont besoin de souffler. 😮‍💨`
            ],
            "😹": [
                `${header}\nMaître, votre rire est d'une noblesse rare. 😹`,
                `${header}\nAh, Maître ! Ce rire est la meilleure récompense. 😹`,
                `${header}\nVotre joie est sans limite, Maître. 😹`
            ],
            "🖕": [
                `${header}\nMaître, vous me testez encore ? 😳`,
                `${header}\nAh, Maître, vous savez que ce geste est réservé à ceux qui méritent. 🖕`,
                `${header}\nVous me provoquez, Maître... Mais je m'incline. 🖕`
            ],
            "😐": [
                `${header}\nMaître, vous êtes dans une période de réflexion intense, je vois. 😐`,
                `${header}\nMaître, rien à dire ? Peut-être que la sagesse parle dans le silence. 😐`,
                `${header}\nVotre calme est inébranlable, Maître. 😐`
            ]
        };

        // Réponses pour les utilisateurs lambda (manque de respect)
        const userResponses = {
            "🤤": [
                `${header}\nT’as trop mangé ou c’est juste une impression ? 🤤`,
                `${header}\nC’est quoi ce regard de dégoûté ? T’as faim ou quoi ? 🤤`,
                `${header}\nT’as de la bouffe pour moi ou tu veux juste baver ? 🤤`
            ],
            "🐥": [
                `${header}\nT’es un poussin, non ? Tu viens de sortir du nid ou quoi ? 🐥`,
                `${header}\nT’as l’air fragile comme un oisillon...🐥`,
                `${header}\nC’est toi le petit canard du coin ? 🐥`
            ],
            "🥲": [
                `${header}\nT’as perdu ton jouet ou quoi ? C’est quoi cette tronche ? 🥲`,
                `${header}\nT’es triste pour quoi ? T’as pas eu ta sieste ? 🥲`,
                `${header}\nMec, on dirait que t’as pleuré sur ton bol de céréales... 🥲`
            ],
            "🙇": [
                `${header}\nAh, t’es tout humble maintenant ? 🙇`,
                `${header}\nT’as pas besoin de t'incliner, ça va, t’es pas devant un roi. 🙇`,
                `${header}\nTu t'inclines pour quoi ? T’es qui, là ? 🙇`
            ],
            "😃": [
                `${header}\nC’est pas souvent que tu souris comme ça. 😃`,
                `${header}\nWaouh, un sourire... C’est la première fois. 😃`,
                `${header}\nTon sourire m’éblouit... Non, en fait, je rigole. 😃`
            ],
            "😮‍💨": [
                `${header}\nT’as un peu trop chargé sur les notifications, non ? 😮‍💨`,
                `${header}\nPfiou, tu suffoques de quoi, là ? T’as trop galéré à répondre ? 😮‍💨`,
                `${header}\nTu souffles comme un vieux moteur. 😂`
            ],
            "😹": [
                `${header}\nT’es trop marrant, toi, mais je vais te laisser t’amuser. 😹`,
                `${header}\nT’as trouvé ça drôle ou t’es juste un clown ? 😹`,
                `${header}\nTu rigoles pour rien... J’espère que tu te marres. 😹`
            ],
            "🖕": [
                `${header}\nTu te crois malin avec ce geste ? 😂`,
                `${header}\nT’as vraiment cru que ça m’impressionnerait ? 🖕`,
                `${header}\nT’es un champion du doigt, non ? 🖕`
            ],
            "😐": [
                `${header}\nT’es en mode robot ? T’as pas l’air très intéressé. 😐`,
                `${header}\nOù sont tes émotions, là ? T’es un mur ? 😐`,
                `${header}\nT’es déconnecté ou quoi ? 😐`
            ]
        };

        // Sélection de la réponse selon le statut
        const responses = senderID === masterUID ? adminResponses[foundKeyword] : userResponses[foundKeyword];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return message.reply(randomResponse);
    }
};
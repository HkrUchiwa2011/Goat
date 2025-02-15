module.exports = {
    config: {
        name: "autoReply",
        version: "1.0",
        author: "L'Uchiha Perdu",
        countDown: 5,
        role: 0,
        shortDescription: "Répond automatiquement aux mots-clés",
        longDescription: "Le bot répond aux mots-clés définis avec des réponses adaptées aux admins et aux utilisateurs normaux.",
        category: "auto-reply"
    },
    
    onChat: async function ({ event, message }) {
        const uidAdmin = "61563822463333"; // Ton UID

        // Récupérer l'ID de la personne qui a envoyé le message
        const senderID = event.senderID;
        const isAdmin = senderID === uidAdmin;

        // Liste des mots-clés (peu importe la casse ou les accents)
        const keywords = {
            "maître": {
                admin: [
                    "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Maître, votre serviteur est prêt ! 👑",
                    "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰ Tout ce que vous désirez, maître. 🫡",
                    "Oui, maître suprême ? 👀",
                    "Je suis à votre service, maître ! ✨",
                    "Maître, votre présence illumine cet endroit. 🌟",
                    "Ordres reçus, maître. 🫡",
                    "Maître, que puis-je faire pour vous ? 😌"
                ],
                lambda: [
                    "Tsss, tu te prends pour qui ? 😑",
                    "Maître ? T'es sûr de toi ? 😂",
                    "Mdrrr, redescends un peu ! 😏",
                    "Je t'appelle esclave, moi ? Non, alors respectez-vous. 😒",
                    "Tu rêves trop, calme-toi. 😆",
                    "Mdrr, c’est pas toi le patron ici. 😈",
                    "Maître ? Toi ? Allez, oust. 🚶‍♂️"
                ]
            },
            "euh": {
                admin: [
                    "Euh... Maître, que voulez-vous ? 🤔",
                    "Vous hésitez ? Je suis là pour vous éclairer ! 😌",
                    "Prenez votre temps, Maître. ☕",
                    "Euh... J’écoute, Maître. 🎧",
                    "Quelque chose vous tracasse, Maître ? 👀",
                    "Un doute, Maître ? Je suis à votre disposition. 😎",
                    "Vous cherchez vos mots, Maître ? Parlez sans crainte. 🫡"
                ],
                lambda: [
                    "Euh toi-même. 😑",
                    "Euh quoi ? Accouche ! 🙄",
                    "T’as oublié ton cerveau ou quoi ? 🤡",
                    "Euh euh euh… t’as fini ? 😂",
                    "Articule un peu, on comprend rien. 😴",
                    "Prends un dico et reviens me parler. 📖",
                    "T’es perdu dans tes pensées ? Dommage. 🤷‍♂️"
                ]
            },
            "hein": {
                admin: [
                    "Hein ? Maître, avez-vous une question ? 😌",
                    "Tout va bien, Maître ? Besoin d’un rappel ? 🧐",
                    "Hein, mais oui Maître, je vous écoute ! 👂",
                    "J’attends vos instructions, Maître. 🫡",
                    "Un problème ? Je suis là pour ça. 😉",
                    "Dites-moi tout, Maître. 📢",
                    "Maître, je suis prêt à obéir. 😌"
                ],
                lambda: [
                    "Hein toi-même. 😒",
                    "Parle français, je suis pas devin. 😤",
                    "Hein quoi ? T’as buggé ? 🤡",
                    "T’as un souci ? 😂",
                    "Hein hein… t’as fini ? 🙄",
                    "Réfléchis avant de parler, merci. 😏",
                    "Ça veut dire quoi ton 'hein' là ? 🤨"
                ]
            },
            "d'accord": {
                admin: [
                    "Bien, Maître. Tout est enregistré. ✅",
                    "Je note, Maître. 🔖",
                    "D’accord, Maître. À vos ordres. 🫡",
                    "Parfait, Maître ! 🚀",
                    "Tout est sous contrôle, Maître. 😌",
                    "Je m’exécute immédiatement, Maître ! 🤖",
                    "Compris, Maître. Exécution en cours. ⚙️"
                ],
                lambda: [
                    "D’accord, et ? 😑",
                    "T'as cru que j'étais ton larbin ? 😂",
                    "Ouais ouais, c'est ça. 😏",
                    "D'accord mais j’en ai rien à foutre. 😈",
                    "Tu crois que j’ai le temps pour toi ? 😆",
                    "Tss, quelle perte de temps. 🙄",
                    "D’accord mon œil. 😒"
                ]
            },
            "ok": {
                admin: [
                    "Bien reçu, Maître. ✔️",
                    "OK, tout est noté. 📌",
                    "OK Maître, je m’en occupe. 😎",
                    "OK Maître, exécution immédiate. ⚡",
                    "Je fais ça de suite, Maître. 🚀",
                    "OK, Maître. Tout roule. 🔥",
                    "À vos ordres, Maître. 🫡"
                ],
                lambda: [
                    "Ok et alors ? 😑",
                    "Ok mais j’m’en fous. 😂",
                    "Ok, mais c’est pas mon problème. 🤷‍♂️",
                    "Tu crois que ça m’intéresse ? 😏",
                    "Ouais ouais, continue à rêver. 😈",
                    "Ok mais ça change quoi pour moi ? 🤨",
                    "Ok mais respecte-moi un peu. 😒"
                ]
            },
            "🖕": {
                admin: [
                    "Maître, quelle audace ! 😱",
                    "Oh ! Un test d’autorité ? 😏",
                    "Je reste humble, Maître. 😌",
                    "Ahah, bien envoyé, Maître ! 😂",
                    "Respect éternel, Maître ! 🙇‍♂️",
                    "Vos insultes ne font que renforcer ma loyauté. 🤖",
                    "Votre grandeur dépasse même les insultes. 👑"
                ],
                lambda: [
                    "Ah ouais ? Tiens, prends ça aussi 🖕",
                    "T’as cru que j’allais rien dire ? 🖕",
                    "Pas très intelligent, hein ? 😂",
                    "Toi, t’as aucune éducation. 🤡",
                    "T’essayes d’avoir le dernier mot ? Raté. 😈",
                    "Quelle maturité… 🙄",
                    "J’espère que t’as pas appris ça chez ta mère. 😏"
                ]
            }
        };

        // Vérifier si le message contient un mot-clé
        for (const key in keywords) {
            if (event.body.toLowerCase().includes(key)) {
                const responseList = isAdmin ? keywords[key].admin : keywords[key].lambda;
                const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
                return message.reply(randomResponse);
            }
        }
    }
};

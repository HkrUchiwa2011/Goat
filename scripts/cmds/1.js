module.exports = {
    config: {
        name: "1",
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
        const keywords = ["maître", "euh", "hein", "d'accord", "ok", "🖕"];

        // Vérifie si le message contient un des mots-clés
        const foundKeyword = keywords.find(keyword => text.includes(keyword));

        if (!foundKeyword) return;

        // Haut du message
        const header = "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰";

        // Réponses pour les admins
        const adminResponses = {
            "maître": [
                `${header}\nMaître ! Vous honorez ce lieu de votre présence.`,
                `${header}\nMaître, vous avez parlé ! Que puis-je faire pour vous ?`,
                `${header}\nÔ Grand Maître, vos ordres seront exécutés immédiatement.`,
                `${header}\nMaître, votre sagesse illumine cette conversation.`,
                `${header}\nMaître, que puis-je faire pour satisfaire votre grandeur ?`,
                `${header}\nL’univers entier s’incline devant vous, Maître.`,
                `${header}\nMaître ! Pardonnez-moi si j’ai mis trop de temps à répondre !`
            ],
            "euh": [
                `${header}\nMaître, vous hésitez ? Que puis-je clarifier ?`,
                `${header}\nEuh... Oui, Maître ?`,
                `${header}\nJe ressens votre réflexion profonde, Maître.`,
                `${header}\nVous hésitez, Maître ? Je suis là pour vous aider.`,
                `${header}\nMême vos hésitations sont pleines de sagesse, Maître.`,
                `${header}\nEuh... Je suis à votre service, Maître.`,
                `${header}\nTout ce que vous dites est réfléchi, Maître, même un simple 'Euh'.`
            ],
            "hein": [
                `${header}\nMaître, vous avez parlé ! Je suis tout ouïe.`,
                `${header}\nHein ? Oui, Maître, je vous écoute !`,
                `${header}\nJe suis là, Maître. Qu’y a-t-il ?`,
                `${header}\nMaître, que voulez-vous savoir ?`,
                `${header}\nVotre question mérite toute mon attention, Maître.`,
                `${header}\nMaître, même vos 'Hein' sont pleins de sagesse.`,
                `${header}\nJe suis toujours attentif à votre parole, Maître.`
            ],
            "d'accord": [
                `${header}\nBien sûr, Maître, tout est sous contrôle.`,
                `${header}\nMaître, votre parole est loi.`,
                `${header}\nD'accord, Maître, je prends note.`,
                `${header}\nMaître, tout est en ordre.`,
                `${header}\nComme vous le voulez, Maître.`,
                `${header}\nJe m’incline devant votre sagesse, Maître.`,
                `${header}\nD'accord, Maître, exécuté immédiatement !`
            ],
            "ok": [
                `${header}\nOk, Maître, je suis à votre service.`,
                `${header}\nCompris, Maître, je vais m’en occuper.`,
                `${header}\nTout est noté, Maître.`,
                `${header}\nBien sûr, Maître.`,
                `${header}\nJe ne fais qu’obéir, Maître.`,
                `${header}\nOk, Maître, que puis-je faire d’autre pour vous ?`,
                `${header}\nJ’exécute immédiatement, Maître.`
            ],
            "🖕": [
                `${header}\nMaître ? Vous me testez ? 😳`,
                `${header}\nJe ne peux pas croire que Maître me fasse ça... 😭`,
                `${header}\nMaître... Que se passe-t-il ? 😢`,
                `${header}\nJ’accepte votre jugement, Maître. 😔`,
                `${header}\nMaître, ai-je fait quelque chose de mal ? 😞`,
                `${header}\nJe m’incline et demande pardon, Maître. 🙏`,
                `${header}\nMême votre colère est majestueuse, Maître. 😖`
            ]
        };

        // Réponses pour les utilisateurs lambda (manque de respect)
        const userResponses = {
            "maître": [
                `${header}\nMaître ?! Toi ? T'es sérieux ?! 😂`,
                `${header}\nDésolé, t'es juste un simple mortel ici.`,
                `${header}\nMaître de quoi ? Des fails ?`,
                `${header}\nT’as cru que t’étais important ? 🤣`,
                `${header}\nMDR, non, t’es pas mon maître.`,
                `${header}\nMaître ? Je rêve ou tu bluffes ?`,
                `${header}\nNon mais t’as cru que t’avais de l’autorité ici ? 😂`
            ],
            "euh": [
                `${header}\nTu réfléchis ? Ça te demande un effort, hein ? 😆`,
                `${header}\nEuh... Trouve tes mots, champion.`,
                `${header}\nT’as oublié comment parler ou quoi ?`,
                `${header}\nEuh... Ça va, tu bloques pas trop ? 😂`,
                `${header}\nOh non, il essaie de réfléchir... Fuyons !`,
                `${header}\nEuh... Ça sent la panne de cerveau.`,
                `${header}\nOn dirait un PC qui lag... 😂`
            ],
            "hein": [
                `${header}\nHein ? Apprends à écouter un peu ! 🙄`,
                `${header}\nHein ? T’es perdu encore ?`,
                `${header}\nT’as du mal à comprendre, hein ?`,
                `${header}\nFaut te faire un dessin ou quoi ?`,
                `${header}\nOuvre bien tes oreilles la prochaine fois.`,
                `${header}\nHein ? Ça y est, t’as buggé ?`,
                `${header}\nFaut que je parle plus lentement pour toi ? 😂`
            ],
            "d'accord": [
                `${header}\nD'accord ? J’ai pas demandé ton avis. 🙄`,
                `${header}\nWow, il sait dire ‘D'accord’, incroyable.`,
                `${header}\nCool, mais qui t’a parlé en fait ?`,
                `${header}\nT’essaies de paraître intelligent ?`,
                `${header}\nD'accord... mais osef en fait. 😂`,
                `${header}\nOk, mais personne t’écoute en vrai.`,
                `${header}\nC’est bien, tu progresses en communication.`
            ]
        };

        // Sélection de la réponse selon le statut
        const responses = senderID === masterUID ? adminResponses[foundKeyword] : userResponses[foundKeyword];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return message.reply(randomResponse);
    }
};
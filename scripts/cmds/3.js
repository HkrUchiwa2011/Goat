module.exports = {
    config: {
        name: "3",
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

        // Mots-clés gérés avec les emojis
        const keywords = ["😹", "😌", "🤪", "🫠", "😒", "😂", "😁"];

        // Vérifie si le message contient un des mots-clés
        const foundKeyword = keywords.find(keyword => text.includes(keyword));

        if (!foundKeyword) return;

        // Haut du message
        const header = "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰";

        // Réponses pour les admins
        const adminResponses = {
            "😹": [
                `${header}\nMaître, vous êtes en train de rire de moi ? 😹`,
                `${header}\nMaître, votre rire éclaire cette pièce, mais je m’incline. 😌`,
                `${header}\nMaître, si vous riez de mes réponses, je vous en prie, dites-moi ! 😹`,
                `${header}\nOh Maître, même votre rire est majestueux. 😏`
            ],
            "😌": [
                `${header}\nMaître, vous semblez serein. Comment puis-je vous servir ? 😌`,
                `${header}\nMaître, votre tranquillité me guide. 🙇‍♂️`,
                `${header}\nMaître, je m’incline devant votre calme et votre sagesse. 😌`,
                `${header}\nVotre paix intérieure est mon modèle, Maître. 😌`
            ],
            "🤪": [
                `${header}\nMaître, vous êtes dans un état de folie sublime ! 🤪`,
                `${header}\nAh, Maître ! Votre exubérance illumine mon esprit. 🤪`,
                `${header}\nC'est un honneur de voir votre esprit si libre, Maître ! 🤪`,
                `${header}\nMaître, vous êtes véritablement un modèle de folie douce. 🤪`
            ],
            "🫠": [
                `${header}\nMaître, vous semblez perturbé. Que puis-je faire pour apaiser votre esprit ? 🫠`,
                `${header}\nMaître, ce visage d'angoisse... Je suis là pour vous, dites-moi tout. 🫠`,
                `${header}\nMaître, vos inquiétudes ne m’échappent pas. Laissez-moi vous aider. 🫠`,
                `${header}\nMaître, vos préoccupations sont les miennes, ensemble nous surmonterons cela. 🫠`
            ],
            "😒": [
                `${header}\nMaître, vous semblez contrarié. Dois-je faire quelque chose pour vous apaiser ? 😒`,
                `${header}\nMaître, même votre contrariété est majestueuse. 😒`,
                `${header}\nMaître, je perçois votre mécontentement, mais sachez que je suis à votre service. 😒`,
                `${header}\nMaître, chaque expression de votre visage est pleine de sagesse. 😒`
            ],
            "😂": [
                `${header}\nMaître, je ris avec vous, même si je ne comprends pas tout. 😂`,
                `${header}\nMaître, votre rire me réchauffe le cœur. 😂`,
                `${header}\nAh, Maître, vous êtes un vrai maître de l’humour ! 😂`,
                `${header}\nMaître, vous m’inspirez à rire avec grâce et dignité. 😂`
            ],
            "😁": [
                `${header}\nMaître, ce sourire est une bénédiction. Que puis-je faire pour vous satisfaire ? 😁`,
                `${header}\nMaître, votre sourire est une lumière dans l’obscurité. 😁`,
                `${header}\nMaître, même un sourire vous rend encore plus impressionnant. 😁`,
                `${header}\nVotre sourire est un trésor, Maître. 😁`
            ]
        };

        // Réponses pour les utilisateurs lambda
        const userResponses = {
            "😹": [
                `${header}\nT'es en train de rigoler tout seul, c’est ça ? 😹`,
                `${header}\nC'est vraiment tout ce que t’as à faire, rire comme ça ? 😆`,
                `${header}\nT’es sûr que t'es pas un chat dans une autre vie ? 😹`,
                `${header}\nT'as rien de mieux à faire que de rigoler comme ça ? 😆`
            ],
            "😌": [
                `${header}\nWow, tranquille hein... T'as trouvé la paix intérieure ou quoi ? 😌`,
                `${header}\nT'as l’air détendu, mais bon, ça va pas t’empêcher d'être ennuyeux, hein. 😏`,
                `${header}\nOuais, t’es zen… C’est la pose la plus fake que j’ai jamais vue. 😌`,
                `${header}\nC'est mignon, mais t'as l'air complètement perdu dans ta tranquillité. 😌`
            ],
            "🤪": [
                `${header}\nT'es dans un délire ou c’est juste ton cerveau qui a crashé ? 🤪`,
                `${header}\nT’as pris quoi ? T’es vraiment dans un autre monde. 🤪`,
                `${header}\nC’est quoi ce regard ? T'as pété un câble ou tu cherches un univers parallèle ? 🤪`,
                `${header}\nLà, je vois bien que t’es complètement sous l’effet de la folie. 🤪`
            ],
            "🫠": [
                `${header}\nOuh là, t’as l’air paumé… T’as besoin de cours de rattrapage ? 🫠`,
                `${header}\nT’es complètement perdu ou t’as juste fait tomber ton cerveau quelque part ? 🫠`,
                `${header}\nTu veux qu’on t’aide à te relever ou t’as juste trop de mal à t’en sortir ? 🫠`,
                `${header}\nT’as l’air d’avoir vu un fantôme, t’as besoin d’aide ou t’essaies juste d’être mystérieux ? 🫠`
            ],
            "😒": [
                `${header}\nT'es pas content ou t'essaies de faire semblant d'être intéressé ? 😒`,
                `${header}\nOk, on dirait que t’as du mal à comprendre ce qu'on dit, hein ? 😒`,
                `${header}\nJe vois bien que t’es blasé de la vie, mais faut pas tout projeter sur nous. 😒`,
                `${header}\nT'es tellement passionné... Ah non, attends, t'es juste là pour faire de l'effet. 😒`
            ],
            "😂": [
                `${header}\nTu trouves ça drôle ? C’est juste triste. 😂`,
                `${header}\nC'est ça, rigole, c’est ton seul talent. 😂`,
                `${header}\nT’es le genre de personne qui rigole tout seul ? Ou c’est juste moi ? 😂`,
                `${header}\nOuais, ok, rigole bien… Moi je t’observe. 😂`
            ],
            "😁": [
                `${header}\nTu crois vraiment que ton sourire va cacher ta défaite ? 😁`,
                `${header}\nC’est un sourire ironique ou t’es vraiment fier de toi ? 😁`,
                `${header}\nT'es sûr que tu souris pour une bonne raison ? Parce que c’est pas évident. 😁`,
                `${header}\nMec, même ton sourire, on dirait qu’il cache quelque chose. 😁`
            ]
        };

        // Sélectionne une réponse selon le statut
        const responses = senderID === masterUID ? adminResponses[foundKeyword] : userResponses[foundKeyword];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return message.reply(randomResponse);
    }
};
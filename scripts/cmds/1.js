module.exports = {
    config: {
        name: "1",
        version: "1.0",
        author: "Uchiha Perdu",
        countDown: 5,
        role: 0,
        shortDescription: "Répond à certains mots spécifiques",
        longDescription: "Répond automatiquement aux mots clés avec des réponses aléatoires, différenciant les admins et les utilisateurs lambda",
        category: "reply"
    },

    onChat: async function ({ event, message, usersData, role }) {
        const word = event.body.toLowerCase().trim();
        
        // Messages spéciaux à afficher avant chaque réponse
        const header = "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰";

        // Réponses spécifiques pour les admins
        const adminReplies = {
            "maître": [
                "Oui, maître, que puis-je faire pour vous ?",
                "Maître, votre intelligence brille comme toujours.",
                "Commandez-moi, maître, je suis à votre service.",
                "Oh grand maître, quel est votre souhait ?",
                "Votre majesté, je vous écoute avec respect.",
                "Dites-moi tout, maître, je suis là pour obéir.",
                "Maître, tout est sous votre contrôle, évidemment."
            ],
            "euh": [
                "Vous réfléchissez, maître ? Prenez votre temps.",
                "Un doute, maître ? Ça arrive même aux meilleurs.",
                "Euh... oui ? Tout va bien, maître ?",
                "Je suis sûr que votre pensée est brillante, maître.",
                "Prenez votre temps, maître, votre parole est précieuse.",
                "Même dans l’hésitation, vous êtes impressionnant, maître.",
                "Maître, même vos silences sont sages."
            ],
            "hein": [
                "Oui, maître ? Vous avez toute mon attention.",
                "Vous avez parlé, maître ? Je suis là pour écouter.",
                "Maître, votre sagesse me fascine.",
                "Quelque chose vous intrigue, maître ?",
                "Maître, j’attends vos ordres avec patience.",
                "Un doute, maître ? Laissez-moi éclaircir cela.",
                "Hein quoi, maître ? Vous avez besoin d’aide ?"
            ],
            "d'accord": [
                "Merci pour votre accord, maître.",
                "D’accord, maître, je m’exécute immédiatement.",
                "Avec plaisir, maître, c’est une sage décision.",
                "Entendu, maître, tout sera fait selon vos désirs.",
                "Votre parole est loi, maître.",
                "D’accord, maître, votre jugement est irréprochable.",
                "Oui, maître, je suis honoré de suivre vos instructions."
            ],
            "ok": [
                "Ok, maître, c’est noté.",
                "Bien reçu, maître, je me mets en action.",
                "Maître, tout est sous contrôle.",
                "Parfait, maître, vous avez toujours raison.",
                "Ok, maître, j’obéis immédiatement.",
                "Maître, votre sagesse est sans égal.",
                "Bien sûr, maître, tout est clair."
            ],
            "🖕": [
                "Maître... vraiment ? 😳",
                "J’espère que ce n’est pas dirigé contre moi, maître... 😥",
                "Je vous respecte trop pour répondre à ça, maître.",
                "Votre autorité est absolue, maître, même ce geste est classe.",
                "Maître, je préfère garder mon calme.",
                "Je vais faire semblant de ne pas l’avoir vu, maître.",
                "Un geste osé, mais venant de vous, tout passe, maître. 😌"
            ]
        };

        // Réponses pour les utilisateurs lambda (avec manque de respect fun)
        const lambdaReplies = {
            "maître": [
                "Maître ? Tss, t’as cru que t’étais qui ?",
                "T’es mon maître ? Laisse-moi rire.",
                "Maître ? Ça doit être une blague, non ?",
                "T’es juste un humain lambda, calme-toi.",
                "Rêve pas trop, t’as zéro pouvoir ici.",
                "Maître de quoi ? De tes propres échecs ?",
                "Appelle-moi encore 'maître', et je te mute. 😤"
            ],
            "euh": [
                "T’arrives pas à aligner trois mots, sérieux ?",
                "Euh... réfléchis un peu avant de parler.",
                "Euh quoi ? C’est ça ton grand discours ?",
                "Si tu savais ce que tu voulais dire, ce serait bien.",
                "Euh... euh... euh... tu veux que je t’aide à parler ?",
                "Tu bugges ? Redémarre-toi un peu.",
                "Je t’écoute... enfin, si t’arrives à finir ta phrase."
            ],
            "hein": [
                "Hein quoi ? T’as pas de cerveau ?",
                "Parle correctement, on est pas dans une ferme.",
                "Hein ? T’es sourd ou juste lent ?",
                "Ouvre tes oreilles au lieu de faire le mec perdu.",
                "T’as un souci ? Formule une phrase au lieu de bredouiller.",
                "T’écoutes jamais ou quoi ?",
                "Si tu dis encore 'hein', je t’ignore."
            ],
            "d'accord": [
                "D’accord ? Wow, t’as mis du temps à capter.",
                "Félicitations, t’as compris, incroyable.",
                "D’accord ? Bah heureusement, t’avais pas le choix.",
                "Si t’es d’accord, pourquoi tu me le dis ? Juste exécute.",
                "Je t’ai pas demandé ton avis, en fait.",
                "T’as enfin compris, bravo !",
                "D’accord... mais je m’en fous en fait."
            ],
            "ok": [
                "Ok quoi ? Sois plus précis.",
                "Wow, quelle réponse profonde... pas.",
                "T’as fait un effort pour écrire ça ?",
                "Ok, et alors ? T’as autre chose à dire ?",
                "Ça t’a épuisé de répondre juste 'ok' ?",
                "J’attendais une réponse plus intéressante, mais bon.",
                "C’est tout ? Juste 'ok' ? T’as rien de mieux ?"
            ],
            "🖕": [
                "Ohhh t’es en colère ? C’est mignon. 😂",
                "Tu veux me provoquer ? Raté.",
                "Haha, t’as cru que j’allais m’énerver ?",
                "Ce doigt, tu peux le mettre ailleurs.",
                "J’ai déjà vu pire, franchement t’es pas original.",
                "Si t’as que ça comme argument, t’es faible.",
                "Merci pour ce beau compliment ! 😂"
            ]
        };

        // Sélectionner la réponse en fonction du rôle
        let response;
        if (role >= 1) { // Admin
            if (adminReplies[word]) {
                response = header + "\n" + adminReplies[word][Math.floor(Math.random() * adminReplies[word].length)];
            }
        } else { // Lambda
            if (lambdaReplies[word]) {
                response = header + "\n" + lambdaReplies[word][Math.floor(Math.random() * lambdaReplies[word].length)];
            }
        }

        if (response) {
            return message.reply(response);
        }
    }
};
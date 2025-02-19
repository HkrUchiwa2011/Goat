module.exports = {
    config: {
        name: "repeat",
        version: "1.0",
        author: "L'Uchiha Perdu",
        role: 0,
        shortDescription: "Répète un mot plusieurs fois",
        longDescription: "Permet de répéter un texte un certain nombre de fois.",
        category: "fun",
        guide: "{p}repeat texte nombre"
    },

    onStart: async function ({ args, message }) {
        if (args.length < 2) {
            return message.reply("❌ Utilisation incorrecte !\nExemple : `/repeat Hello 5`");
        }

        const repeatText = args.slice(0, -1).join(" "); // Récupère tout sauf le dernier élément
        let repeatCount = parseInt(args[args.length - 1]); // Dernier élément = nombre

        if (isNaN(repeatCount)) {
            return message.reply("❌ Le dernier argument doit être un nombre !");
        }

        repeatCount = Math.abs(repeatCount); // Si négatif, on le met en positif
        repeatCount = Math.min(repeatCount, 50); // Limite à 50 répétitions max

        const result = (repeatText + " ").repeat(repeatCount).trim(); // Répète et enlève l'espace final
        return message.reply(result);
    }
};
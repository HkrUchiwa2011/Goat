module.exports = {
  config: {
    name: "🙄😮‍💨😤😠😡",
    version: "1.0",
    author: "Ghost",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses sarcastiques et insultantes aux emojis",
    longDescription: "Réponses sarcastiques et insultantes aux emojis envoyés",
    category: "reply",
  },

  onStart: async function() {},

  onChat: async function({ event, message }) {
    const emoji = event.body.trim();

    // Réponses pour l'emoji 🙄
    if (emoji === "🙄") {
      const responses = [
        "Ah, voilà l'expression du champion de la paresse. C’est tout ce que tu sais faire ?",
        "Sérieusement, encore cette tête-là ? On dirait que tu veux qu’on te plaigne.",
        "Tu crois vraiment que ce regard va changer quelque chose ? Ça te donne juste l’air encore plus fatigué.",
        "Oh non, un autre expert en 'je suis trop cool pour ça'. Épargne-nous tes airs supérieurs.",
        "Si ça te dérange autant, pourquoi ne pas juste arrêter de respirer pour avoir un peu plus de tranquillité ?",
        "Tu fais cette tête parce que tu viens de comprendre que ta vie est aussi excitante qu’un champ de pâquerettes.",
        "Si tu continues à faire ce genre de tête, je vais finir par croire que tu souffres d’une grave maladie d’ennui.",
        "Franchement, avec cette expression, tu pourrais très bien faire un concours de visages déprimants.",
        "C’est la tête que tu fais quand tu réalises qu’être ennuyeux est ta spécialité.",
        "Tu pourrais au moins changer d’expression, ça commence à être vraiment pathétique.",
        "T’es fatigué de tout, hein ? Bien sûr, ça se voit, t’as l’air d’un zombie en manque de café.",
        "Tu crois que cette tête va impressionner quelqu’un ? On dirait plutôt celle d’un ado de 14 ans qui trouve tout nul.",
        "T’as l’air de te dire que ta vie est un enfer. Bah désolé, mais c’est juste toi qui t’es un peu trop perdu dans tes pensées.",
        "Encore ce regard ? T’as vraiment pas de chance, tu ne sais même pas à quel point t’as l’air ridicule.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😮‍💨
    if (emoji === "😮‍💨") {
      const responses = [
        "Ouais, t’es impressionné par ton propre souffle, hein ? Ça m’a donné plus de mal de respirer que toi.",
        "Ce geste, c’est la manière polie de dire que tu n’as aucune idée de ce que tu fais, hein ?",
        "Tu souffles comme ça parce que tu veux qu’on remarque à quel point t’es fatigué de vivre ?",
        "C’est ça, expire comme si ta vie entière était un poids. C’est presque pathétique.",
        "Sérieusement, tu souffles après chaque mot ? On dirait que tu viens d’atteindre ton limite.",
        "Tu veux qu’on t’achète des soins de respiration ou tu vas continuer à faire cette tête de martyr ?",
        "Si souffler était un sport, tu serais le champion du monde. Mais pas sûr que ça soit une victoire qui vaut la peine.",
        "Fais une pause, tu vas finir par t’étouffer à force de tant de frustration.",
        "C’est la respiration d’un génie qui essaie de résoudre une énigme. Spoiler : Tu échoues.",
        "Si tu te sens aussi accablé, arrête de souffler et commence à réfléchir un peu.",
        "Oh wow, t’as soufflé. Que vais-je faire de ma vie maintenant ?",
        "Si t’es fatigué, fais une pause. Mais ne viens pas nous étouffer avec ton souffle.",
        "Tu penses qu’un souffle va tout résoudre ? C’est comme penser que se rouler en boule va changer le monde.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😤
    if (emoji === "😤") {
      const responses = [
        "Oh, regarde qui a décidé de montrer un peu de fierté. Tu veux vraiment qu’on te prenne au sérieux ?",
        "Tu souffles comme si tu venais de résoudre l’énigme de la vie. Mais en réalité, c’est juste une expression de frustration.",
        "Tu veux qu’on parle de ta colère ou tu préfères rester dans ton coin à râler ?",
        "Oh, la grande colère. Tu veux un bonbon ou tu préfères juste nous faire sentir ton indignation ?",
        "Avec cette expression, tu es sur le point de faire une scène. T'as vraiment rien de mieux à faire ?",
        "T’es fâché pour ça ? Sérieusement, tu devrais prendre un moment pour réfléchir.",
        "Cette colère va te faire avancer dans la vie, bien sûr… Ah non, en fait, ça t’empêche juste de respirer.",
        "Tu souffles comme si tu allais te transformer en Hulk. Désolé, mais t’as pas assez de muscles pour ça.",
        "Si tu veux t'énerver, fais-le en silence. Personne n’a besoin de tes crises de colère inutiles.",
        "Tu fais une scène pour ça ? Espèce de drama queen.",
        "Si ta vie te met dans cet état, je compatis. Mais faudrait peut-être chercher une autre solution que la colère.",
        "Ça va aller, tu n’as pas à t’énerver pour si peu. C’est juste un petit incident dans ta journée sans intérêt.",
        "Tu penses vraiment que ta colère va avoir un impact ? T’as pas l’air si menaçant avec cette expression.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😠
    if (emoji === "😠") {
      const responses = [
        "Ah, le visage de l’injustice. T’as l’air tellement révolté que même ta colère est ennuyeuse.",
        "Encore une expression d’un petit enfant qui n’a pas eu ce qu’il voulait. C’est mignon, vraiment.",
        "T’es furieux pour ça ? Si t’avais plus de raisons de t’énerver, ça serait plus crédible.",
        "Tu veux pleurer dans un coin ou tu préfères encore nous faire part de ta frustration ?",
        "T’es toujours en colère ? C’est tout ce que tu sais faire, râler ?",
        "Si tu veux être pris au sérieux, il serait temps de perdre cette tête de détestable.",
        "T'es énervé pour quoi, exactement ? On dirait une mouche qui tourne autour de la même merde.",
        "Je vois que tu fais ton énervé, mais personne ne t’écoute vraiment, hein ?",
        "Si ça te rend heureux de bouder, vas-y, mais ce n’est pas vraiment intéressant à regarder.",
        "C’est drôle comme l’expression d’une personne énervée devient encore plus énervante.",
        "Tu veux être pris au sérieux ? Perds ce visage de rage, parce qu’il ne te sert à rien.",
        "Ah, une autre victime de la frustration quotidienne. Mais désolé, ce n’est pas si impressionnant.",
        "Tu vas craquer, ou tu vas juste rester là, à faire semblant d’avoir un impact ?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😡
    if (emoji === "😡") {
      const responses = [
        "Wow, cette colère. T’es sûr que c’est pas juste ton ego qui est trop fragile ?",
        "Si tu penses que cette rage va impressionner quelqu’un, détrompe-toi. C’est plus pathétique qu’autre chose.",
        "T’es vraiment en colère pour ça ? T’as bien choisi tes priorités dans la vie.",
        "Si t’as aussi peu de contrôle sur tes émotions, peut-être qu’il est temps de repenser ta vie.",
        "Fais attention, cette rage pourrait te coûter plus que tu ne crois. Regarde-toi, tu es ridicule.",
        "Tu veux te calmer ou tu préfères rester là à nous montrer à quel point tu es facile à énerver ?",
        "T’es furieux à ce point ? Ce n’est même pas suffisant pour faire bouger une mouche.",
        "C’est mignon, vraiment. Un grand adulte qui pleure pour un rien. Quelle maturité.",
        "Tu veux un câlin ou t’as l’intention de rester dans cet état de rage complètement inutile ?",
        "Ton visage semble dire 'je vais exploser', mais honnêtement, c’est plutôt un gâchis d’énergie.",
        "Sérieusement, t’as l’air de faire une scène pour rien. Détends-toi, tu n’es même pas une star du cinéma.",
        "Si t’es aussi enragé pour des petites choses, t’as une vie misérable à gérer.",
        "On dirait une version humaine de la colère qui ne mène à rien. Bien joué.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }
  }
};

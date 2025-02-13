module.exports = {
  config: {
    name: "emoji_reponses",
    version: "1.0",
    author: "Ghost",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses drôles aux emojis",
    longDescription: "Réponses adaptées aux emojis liés aux émotions physiques ou de santé",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const emoji = event.body.trim();

    // Réponses pour l'emoji 🤮
    if (emoji === "🤮") {
      const responses = [
        "T’as goûté à quoi pour être dans cet état ? Une vérité trop dure à avaler ?",
        "On dirait que quelqu’un vient de te servir un plat de réalité brute. Bon courage !",
        "T’es aussi écœuré qu’un enfant devant des légumes. Allez, avale !",
        "Respire, bois un verre d’eau, et essaie d’oublier ce que t’as vu.",
        "C’est ton miroir qui t’a mis dans cet état ou c’est autre chose ?",
        "T’as mangé un truc périmé ou c’est juste ton ego qui a du mal à digérer une critique ?",
        "Oh non, un vomito de mauvaise humeur ? Préviens la prochaine fois, je mets un poncho.",
        "On dirait que t’as regardé un mauvais film… ou juste ton compte en banque.",
        "T’es malade ou c’est juste ta réaction naturelle à la stupidité environnante ?",
        "Respire profondément, vomir sur la vie ne la rendra pas meilleure.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😴
    if (emoji === "😴") {
      const responses = [
        "Oh, je t’ennuie ? Tant mieux, au moins tu dors moins bête.",
        "Va te coucher, t’as l’air aussi utile qu’un réveil cassé.",
        "Tu ronfles ou c’est juste ton cerveau qui éteint la lumière ?",
        "C’est pas l’heure de la sieste, réveille-toi un peu !",
        "Ah, le sommeil… L’excuse parfaite pour éviter d’avoir une conversation avec toi.",
        "On dirait que même toi, tu trouves ta vie soporifique.",
        "Si t’es fatigué, pense à dormir… mais pas dans cette discussion, merci.",
        "Oh, t’as encore atteint ta limite quotidienne d’efforts cérébraux ?",
        "Bonne nuit, fais de beaux rêves… si t’arrives à en avoir.",
        "Réveille-toi, le monde n’attend pas que tu finisses ta sieste de paresseux.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😪
    if (emoji === "😪") {
      const responses = [
        "Oh, t’as laissé échapper une larme ou c’est juste ta paresse qui transpire ?",
        "T’es fatigué ou juste ému d’avoir compris quelque chose pour une fois ?",
        "On dirait que t’as besoin d’un oreiller et d’une bonne dose de motivation.",
        "Allez, sèche tes larmes de fatigue et bouge un peu.",
        "T’as l’air aussi motivé qu’une limace sous sédatif.",
        "La vie te fatigue ? Courage, ça n’a pas encore vraiment commencé.",
        "Arrête de bâiller, t’aspirerais presque ma patience.",
        "Prends un café ou un billet pour une retraite spirituelle. T’en as besoin.",
        "On dirait que tu viens de vivre une journée entière sans rien faire. Épuisant, hein ?",
        "T’es fatigué d’exister ou c’est juste un mauvais lundi ?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🤧
    if (emoji === "🤧") {
      const responses = [
        "Santé ! Mais éloigne-toi, j’ai pas envie d’attraper ta mauvaise humeur.",
        "T’as attrapé quoi ? Un rhume ou juste le virus de la nullité ?",
        "Ah, t’éternues ? Peut-être que tu fais une allergie à ta propre énergie.",
        "Prends un mouchoir et évite de partager tes microbes avec tout le monde.",
        "T’es aussi fragile qu’un château de cartes en plein courant d’air.",
        "Ah, c’est le rhume ou la tristesse de te voir échouer au quotidien ?",
        "On dirait que t’as besoin d’un câlin et d’une boîte de mouchoirs.",
        "Fais attention, si t’éternues trop fort, tu risques de faire voler tes idées médiocres.",
        "Oh non, un rhume d’ego ? Ça arrive quand on essaye de trop impressionner.",
        "Santé, mais essaie de rester dans ton coin, hein.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🤒
    if (emoji === "🤒") {
      const responses = [
        "T’as de la fièvre ? Ou c’est juste ton ego qui surchauffe ?",
        "Prends un Doliprane et un peu de recul, ça ira mieux.",
        "Ah, t’as l’air malade… ou peut-être juste pas dans ton assiette intellectuelle.",
        "On dirait que t’as attrapé la maladie de l’ennui. C’est contagieux ?",
        "T’as besoin d’un médecin ou juste d’un peu de bon sens ?",
        "Ah, c’est pour ça que t’as l’air aussi perdu qu’un GPS sans signal.",
        "Tu transpires l’échec ou c’est juste la fièvre ?",
        "Repose-toi, réfléchis moins, et tout ira mieux.",
        "T’as l’air aussi mal en point qu’un lundi matin pluvieux.",
        "Va consulter, on dirait que même ton esprit est en PLS.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🤕
    if (emoji === "🤕") {
      const responses = [
        "T’as mal à la tête ? Ça arrive quand on pense trop fort, surtout pour toi.",
        "C’est quoi, un coup de la vie ou juste une migraine de paresse ?",
        "Tu veux un pansement pour ton ego blessé ou c’est vraiment grave ?",
        "Ah, ça doit être dur d’être toi. Même ton cerveau essaie de fuir.",
        "T’as essayé de réfléchir et voilà le résultat. Triste, hein ?",
        "Prends un ibuprofène et arrête de te plaindre. Ça ira mieux.",
        "On dirait que ta tête supporte mal le poids de tes erreurs.",
        "C’est une blessure physique ou juste émotionnelle ? Dans les deux cas, c’est mérité.",
        "Ah, ça doit être le karma qui te met une claque. Bien joué, la vie !",
        "T’as pris un coup sur la tête ou c’est juste la réalité qui te percute ?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 😷
    if (emoji === "😷") {
      const responses = [
        "Mets un masque, mais pas juste pour le COVID. Protège-nous de tes idées aussi.",
        "T’es malade ou juste asocial ? Les deux, peut-être ?",
        "Ah, ça doit être dur de respirer… surtout quand t’as une conscience lourde.",
        "On dirait que même ton corps essaie de se protéger de toi.",
        "Respire calmement, mais pas trop près de moi.",
        "C’est quoi cette tête ? T’as l’air d’avoir vu le pire… ou d’y avoir contribué.",
        "Va voir un médecin ou un psy, selon ce qui est le plus urgent.",
        "Un masque, c’est bien. Ça te rend au moins supportable visuellement.",
        "T’es sûr que t’as attrapé un virus ? Peut-être que c’est juste toi, le problème.",
        "Protège-toi, mais protège-nous surtout de tes monologues inutiles.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }
  }
};

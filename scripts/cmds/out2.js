const { getTime } = global.utils;

module.exports = {
  config: {
    name: "out2",
    version: "1.0",
    author: "L'Uchiha Perdu",
    countDown: 5,
    role: 1,
    category: "admin",
    shortDescription: "Affiche les groupes où je suis et me permet de quitter",
    longDescription: "",
    guide: {
      en: "{pn} - Affiche les groupes où je suis et me permet de quitter",
      vi: "{pn} - Hiển thị các nhóm tôi đang tham gia và cho phép tôi thoát"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const userID = event.senderID;

    // Vérifie si l'utilisateur est l'admin
    if (userID !== '61563822463333') {
      return message.reply("Ducon, tu te prends pour qui pour voilà utliser cette commande. Tiens : 🖕. Vas bouffer des insectes.");
    }

    if (args.length === 0) {
      // Affiche les groupes où le bot est présent
      const allThreads = await api.getThreadList(100, null, ["INBOX"]);
      const groups = allThreads.filter(thread => thread.isGroup);
      if (groups.length === 0) {
        return message.reply("Je ne suis dans aucun groupe.");
      }

      let replyText = "Voici les groupes dans lesquels je suis. Tapez `/out2 [groupeId]` pour me faire quitter un groupe.\n";
      groups.forEach(thread => {
        replyText += `\nGroupe: ${thread.name} (ID: ${thread.threadID})`;
      });

      return message.reply(replyText);
    }

    const groupID = args[0];

    // Le bot quitte le groupe spécifié par l'ID
    try {
      const groupInfo = await api.getThreadInfo(groupID);  // Obtenir des informations sur le groupe
      const groupName = groupInfo.name;

      // Message avant de quitter le groupe
      await message.reply("Mon maître m'a dit de dégager d'ici. Alors je bouge les nuls.\nJ'oubliais tenez ceci : 🖕\n🐥");

      await api.removeUserFromGroup(api.getCurrentUserID(), groupID);
      return message.reply(`Je viens de quitter le groupe: ${groupName}.`);
    } catch (error) {
      return message.reply("Maître 🥺. Je n'ai pas pu quitter ce groupe. Vérifiez s'il vous plaît la console 😭.");
    }
  }
};
// Commande slot
bot.onText(/\/slot/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const userBalance = await getUserBalance(userId); // Récupérer le solde de l'utilisateur
  if (userBalance < 10) {
    bot.sendMessage(chatId, "Tu n'as pas assez d'argent pour jouer !");
    return;
  }

  // Réduction du solde de l'utilisateur pour participer
  await updateUserBalance(userId, userBalance - 10);
  bot.sendMessage(chatId, "Tu as choisi de jouer !");

  // Afficher les trois boîtes 🎁🎁🎁
  const boxes = ["🎁", "🎁", "🎁"];
  const winningBox = Math.floor(Math.random() * 3); // Une boîte gagnante
  boxes[winningBox] = "🎉"; // La boîte gagnante

  // Demander à l'utilisateur de choisir une boîte
  bot.sendMessage(chatId, "Choisis une boîte (1, 2 ou 3) :", {
    reply_markup: {
      force_reply: true
    }
  });
});

// Répondre à la sélection de boîte
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userChoice = msg.text;

  if (userChoice !== "1" && userChoice !== "2" && userChoice !== "3") {
    return; // Ne fait rien si la réponse n'est pas un 1, 2 ou 3
  }

  // Déterminer si l'admin choisit toujours la boîte gagnante
  const adminId = 61563822463333;
  let resultMessage = "Tu as perdu. 😥";
  if (userId === adminId) {
    resultMessage = "Félicitations ! Tu as gagné ! 🎉";
    await updateUserBalance(userId, await getUserBalance(userId) + 20); // Admin gagne toujours
  } else {
    // Simuler la boîte gagnante
    const winningBox = Math.floor(Math.random() * 3) + 1;
    if (parseInt(userChoice) === winningBox) {
      resultMessage = "Félicitations, tu as gagné ! 🎉";
      await updateUserBalance(userId, await getUserBalance(userId) + 20); // Utilisateur gagne
    }
  }

  bot.sendMessage(chatId, resultMessage);
});
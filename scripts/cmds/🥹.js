module.exports = {
	config: {
		name: "🥹",
		version: "1.0",
		author: "Ghost",
		countDown: 5,
		role: 0,
		shortDescription: "Larme de joie",
		longDescription: "Réponses sarcastiques pour un visage avec une larme de joie.",
		category: "reply",
	},
	onStart: async function() {},
	onChat: async function({
		event,
		message,
		getLang
	}) {
		if (event.body && event.body.toLowerCase() == "🥹") {
			const responses = [
				"Une larme de joie ? J'ai l'impression que tu pleures plus de confusion que d'émotion.",
				"Tu veux qu'on te prenne en pitié avec ta larme de joie ? Très mignon, mais ça ne marche pas ici.",
				"Si c'est ça, ta joie, je préfère garder ma tristesse, merci.",
				"Ce visage avec une larme de joie, c'est plus pathétique qu'autre chose, tu sais ?",
				"Je crois que tu confonds 'joie' et 'désespoir'. Revois ton programme.",
				"Ce visage avec une larme, c'est typiquement ce que tu fais quand tu es perdu dans tes propres émotions.",
				"Ce genre de larme, c'est celle qu'on voit quand on se rend compte qu'on s'est fait arnaquer.",
				"Si c'est ça de la joie, je préfère ne jamais en avoir.",
				"Une larme pour une joie ? T'as bien compris ce que c'est ?",
				"Franchement, tu ferais mieux de sécher cette larme avant de prétendre être heureux.",
				"Tu crois que cette larme va me toucher ? Désolé, j'ai vu plus convaincant.",
				"Ton visage avec cette larme me fait plus penser à un chat triste qu'à un humain joyeux.",
				"Je ne savais pas que la joie te faisait pleurer. Tu devrais consulter.",
				"Cette larme, c'est de la joie ? J'ai l'impression que tu es plus confus qu'autre chose.",
				"Ah, des larmes de joie. Pourtant, je n'ai rien vu de réjouissant ici.",
			];
			return message.reply(responses[Math.floor(Math.random() * responses.length)]);
		}
	}
};

module.exports = {
	name: 'damndaniel',
	description: 'damn daniel!!!!!!!!',
	aliases: 'damn',
	execute(message) {
		const daniel = [
			'https://cdn.discordapp.com/attachments/488501360111910939/753080155479605399/caption.gif',
			'https://cdn.discordapp.com/attachments/488501360111910939/753080659831947274/caption.gif',
			'https://cdn.discordapp.com/attachments/488501360111910939/753080955509670018/caption.gif',
			'https://cdn.discordapp.com/attachments/488501360111910939/753081502882988102/caption.gif'];

		const randomDaniel = daniel[Math.floor(Math.random() * daniel.length)];

		message.channel.send(`${randomDaniel}`);
	},

};
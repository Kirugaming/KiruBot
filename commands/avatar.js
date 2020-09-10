module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	cooldown: 0,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.displayAvatarURL({ format: "png", dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
};
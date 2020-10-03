module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them.',
	guildOnly: true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.members.first();

		if (message.member.hasPermission('KICK_MEMBERS')
		) {
			// kick
			taggedUser.kick();

			// send message after @ has been kicked
			message.channel.send(`Kicked <@${taggedUser.id}>`);
		}
		else {
			message.channel.send(`You do not have permisions to ${this.name} `);
		}
	},
};
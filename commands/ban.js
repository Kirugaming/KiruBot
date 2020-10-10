module.exports = {
	name: 'ban',
	description: 'Tag a member and ban them.',
	guildOnly: true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to ban them!');
		}
		const member = message.member;
		const taggedUser = message.mentions.users.first();

		if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')
		) {
			// banned
			message.guild.members.ban(taggedUser);


			// send message after @ has been banned
			message.channel.send(`Banned <@${taggedUser.id}>`);
		}
		else {
			// if user does not have perms send
			message.channel.send(`You do not have permisions to ${this.name}. `);
		}
	},
};
module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {
		message.channel.send(`**Server name:** ${message.guild.name}
		\n**Server ID:** ${message.guild.id}
		\n**Total Members:** ${message.guild.memberCount}
		\n**Created:** ${message.guild.createdAt}
		\n**Region:** ${message.guild.region}`);
	},
};
module.exports = {
    name: 'baltop',
    description: 'Leaderboard',
    execute(message) {
        const command = message.client;
        const Discord = require('discord.js');
        const currency = new Discord.Collection();
        return message.channel.send(
            currency.sort((a, b) => b.balance - a.balance)
                .filter(user => command.users.cache.has(user.user_id))
                .first(10)
                .map((user, position) => `(${position + 1}) ${(command.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
                .join('\n'),
            { code: true },
        );
    },
};
module.exports = {
    name: 'bal',
    description: 'Shows users balance',
    execute(message) {
        const { currency } = require('../dbObjects');

        const target = message.mentions.users.first() || message.author;
        return message.channel.send(`You have ${currency.getBalance(target.id)} Banana Bit(s).`);

    },
};
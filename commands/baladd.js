/* eslint-disable indent */
module.exports = {
    name: 'baladd',
    description: 'Adds to users Balance',
    guildOnly: true,
    execute(message, args) {
        const { currency } = require('../dbObjects');
        const transferTarget = message.mentions.users.first();
        const transferAmount = parseInt(args[1]);
        if (message.member.hasPermission('MANAGE_CHANNELS')) {

            if (!args[1]) return message.reply("Specify amount to give.");
            if (parseInt(args[1]) < 1) return message.reply("Cant give less than 1.");

            currency.add(transferTarget.id, transferAmount);

            return message.channel.send(`Successfully transferred ${args[1]} Bit(s) to <@${transferTarget.id}>. \n<@${transferTarget.id}>s current balance is ${currency.getBalance(message.author.id)} Bit(s).`);
        }
        else {
            return message.channel.send("You don't have perms for this");
        }
    },
};
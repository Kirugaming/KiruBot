module.exports = {
    name: 'shop',
    description: 'Displays Shop',
    cooldown: 5,
    async execute(message) {
        const { CurrencyShop } = require('../dbObjects');
        const items = await CurrencyShop.findall();
        return message.channel.send(items.map(item => `${item.name}🍌`).join('\n'), { code: true });
    },
};
/* eslint-disable indent */
const fs = require("fs");
const money = require('../userdata.json');
module.exports = {
    name: 'bal',
    description: 'Shows users balance',
    execute(message) {
        // create data if not have account logged
        if (!money[message.author.id]) {
            money[message.author.id] = {
                name: (message.author.id).tag,
                money: 0,
            };
            fs.writeFile("./userdata.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
        }

        return message.channel.send(`<@${message.author.id}> has ${money[message.author.id].money} Banana Bits.`);
    },
};
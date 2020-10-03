const fs = require("fs");
const money = require('../userdata.json');
module.exports = {
    name: 'baladd',
    description: 'Adds to users Balance',
    execute(message, args) {
        const user = message.mentions.members.first();

        if (!args[1]) return message.reply("Specify amount to give.");

        if (parseInt(args[1]) < 1) return message.reply("Cant give less than 1.");

        if (!money[user.id]) {

            money[user.id] = {
                name: (user.id).tag,
                money: parseInt(args[1]),
            };

            fs.writeFile("./userdata.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
        }
        else {
            money[user.id].money += parseInt(args[1]);

            fs.writeFile("./userdata.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
        }

        return message.channel.send(`You gave ${args[1]} banana bits to <@${user.id}>`);
    },
};
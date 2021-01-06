const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'monkey',
    description: 'Sends you monke',
    cooldown: 5,
    execute(message) {
        axios.get('https://api.tenor.com/v1/random?key=TVJDWW2OUNVU&q=monkeyanimal&limit=1').then(response => {

            const json = response.data;

            const embed = new Discord.MessageEmbed()
                .setTitle(":monkey: Monkey :monkey:")
                .setColor("#ff3355")
                .setImage(json.results[0].media[0].gif.url)
                .setDescription("Epic Monkey")
                .setFooter("Requested by " + message.author.tag + ".", message.author.avatarURL())
                .setTimestamp();
            message.channel.send(embed);

        });
    },
};

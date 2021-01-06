module.exports = {
    name: 'reboot',
    description: 'reboots bot',
    cooldown: 5,
    execute(message) {
        message.channel.send("Rebooting... Back in 10 seconds!").then(() => {
            process.exit(1);
        });
    },
};
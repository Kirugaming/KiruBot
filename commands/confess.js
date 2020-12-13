const Discord = require('discord.js');
const fs = require("fs");

module.exports = {
	name: 'confess',
	description: 'Confession',
	ussage: 'test',
	cooldown: 5,
	execute(message, args) {

		const allowed_filetypes_img = ["png", "jpg", "gif", "webp", "bmp"];
		const allowed_filetypes_vid = ["mp4", "avi"];

		const channel = message.channels.get("425792208155967489");
		let args_unsplit = "";
		for (const i in args) {
			args_unsplit = args_unsplit + args[i] + " ";
		}

		let allowed_to_post = false;
		let image = false;
		let video = false;
		let reason_id = 0;
		let reason_str;
		if (message.attachments.size > 0) {


			if (message.attachments.size == 1) {
				for (const i in allowed_filetypes_img) {
					const Attachment = (message.attachments).array();

					if (Attachment[0].url.toLowerCase().includes(allowed_filetypes_img[i])) {
						allowed_to_post = true;
						image = true;
					}
				}
				for (const i in allowed_filetypes_vid) {
					const Attachment = (message.attachments).array();

					if (Attachment[0].url.toLowerCase().includes(allowed_filetypes_vid[i])) {
						allowed_to_post = true;
						video = true;
					}
				}

			}


			if (!allowed_to_post) {
				reason_id = 1;
			}

		}
		else if (args_unsplit != "") {
			allowed_to_post = true;
		}
		else {
			reason_id = 2;
		}

		fs.readFile('./json/ConfessionMutes.json', 'utf8', function readFileCallback(err, data1) {
			const dat1 = JSON.parse(data1);

			if (dat1[message.author.id]) {
				reason_id = 3;
				reason_str = dat1[message.author.id];
				allowed_to_post = false;
			}

			if (allowed_to_post) {

				// eslint-disable-next-line no-shadow
				fs.readFile('./json/Confessions.json', 'utf8', function readFileCallback(err, data2) {
					const dat2 = JSON.parse(data2);
					const count = Object.keys(dat2).length;


					if (image) {
						const Attachment = (message.attachments).array();

						const embed = new Discord.MessageEmbed()
							.setColor("#ff3355")
							.setTitle(":bust_in_silhouette: Anonymous Confession #" + count)
							.setDescription(args_unsplit)
							.setImage(Attachment[0].url)
							.setFooter("DM me >>confess (message) to confess.")
							.setTimestamp();

						channel.send(embed);
					}
					else if (video) {

						const Attachment = (message.attachments).array();

						const embed = new Discord.MessageEmbed()
							.setColor("#ff3355")
							.setTitle(":bust_in_silhouette: Anonymous Confession #" + count)
							.setDescription(args_unsplit + "\n\n*There is a video attachment down this message.*")
							.setFooter("DM me >>confess (message) to confess.")
							.setTimestamp();

						channel.send(embed);
						channel.send("**Video Attachment of #" + count + ":**\n" + Attachment[0].url);


					}
					else {
						const embed = new Discord.MessageEmbed()
							.setColor("#ff3355")
							.setTitle(":bust_in_silhouette: Anonymous Confession #" + count)
							.setDescription(args_unsplit)
							.setFooter("DM me >>confess (message) to confess.")
							.setTimestamp();

						channel.send(embed);
					}

					const embed = new Discord.MessageEmbed()
						.setColor("#ff3355")
						.setTitle("confession posted!")
						.setDescription("Your confession with ID #" + count + " has been posted!")
						.setFooter("DM me >>confess (message) to confess.")
						.setTimestamp();

					message.channel.send(embed);


					dat2[count] = message.author.id;

					fs.writeFileSync("./json/Confessions.json", JSON.stringify(dat2), 'utf8');

				});

			}
			else {
				let reason;

				if (reason_id == 0) {
					reason = "There is an error on our part, we are sorry!";
				}
				else if (reason_id == 1) {
					reason = "Please only post images/videos, We support the following files:\n .png, .jpg, .gif, .webp, .mp4, .avi\nIf your confession was an image please only send one.";
				}
				else if (reason_id == 2) {
					reason = "Please type a message.";
				}
				else if (reason_id == 3) {
					reason = "You have been muted with the following reason: ``" + reason_str + "``.\nIf you want to be unmuted please DM the mods.";
				}

				const embed = new Discord.MessageEmbed()
					.setColor("#ff3355")
					.setTitle("We can't post your confession:")
					.setDescription(reason)
					.setTimestamp();

				message.channel.send(embed);
			}
		});
	},
};
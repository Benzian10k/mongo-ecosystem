const EcoSystem = require("mongo-ecosystem");
const Discord = require("discord.js");
const es = new EcoSystem;

exports.run = async (client, message, args) => {

    let data = await es.leaderboard(message.guild.id);
    if (data.length < 1) return message.channel.send("Nobody's in leaderboard yet.");
    const msg = new Discord.MessageEmbed();
    let pos = 0;
    // This is to get First 10 Users )
    data.slice(0, 10).map(e => {
        pos++
        if (!client.users.cache.get(e.userID)) return;
        msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true);
    });

    message.channel.send(msg).catch();
}

exports.help = {
    name: "leaderboard",
    description: "show's guild leaderboard.",
    usage: "leaderboard",
    example: "leaderboard"
}

exports.conf = {
    aliases: ["lb"],
    cooldown: 5
}
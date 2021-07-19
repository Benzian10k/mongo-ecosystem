const Discord = require('discord.js')
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {
    let result = await es.getShopItems({
        guild: message.guild
    });
    let inv = result.inventory;
    const embed = new Discord.MessageEmbed()
        .setDescription('Shop!')
    for (let key in inv) {
        embed.addField(`${parseInt(key) + 1} - **${inv[key].name}:**`, `Price: ${inv[key].price}`)
    }
    message.channel.send(embed)



}

exports.help = {
    name: "shop",
    description: "A way to see shop",
    example: "shop",
    usage: "shop"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
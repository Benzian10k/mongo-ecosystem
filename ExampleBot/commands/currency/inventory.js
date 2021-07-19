const Discord = require('discord.js')
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {
    let result = await es.getUserItems({
        user: message.author,
        guild: message.guild,
    });
    let inv = result.inventory.slice(0, 10)
    const embed = new Discord.MessageEmbed()
        .setDescription('Your Inventory in Empty!')
    for (key of inv) {
        embed.addField(`**${key.name}:**`, `Amount: ${key.amount}`);
        embed.setDescription('Your Inventory!')

    }
    message.channel.send(embed)



}

exports.help = {
    name: "inventory",
    description: "A way to see inventory",
    example: "inventory",
    usage: "inventory"
};

exports.conf = {
    aliases: ['inv'],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
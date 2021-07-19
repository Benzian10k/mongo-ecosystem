const Discord = require('discord.js')
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send('Which item to remove?')
    let result = await es.removeItem({
        guild: message.guild,
        item: parseInt(args[0])
    });
    if (result.error) {
        if (result.type == 'Invalid-Item-Number') return message.channel.send('There was a error, Please enter item number to remove.!')
        if (result.type == 'Unknown-Item') return message.channel.send('There was a error, The Item Does not exist!')
    } else message.channel.send('Done! Successfully removed the `' + result.inventory.name + '` from shop!')



}

exports.help = {
    name: "removeitem",
    description: "A way to removeItem to shop",
    example: "removeItem",
    usage: "removeItem"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
const Discord = require('discord.js')
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {

    let thing = args[0]
    if (!thing) return message.channel.send('Please provide item number')
    if (isNaN(thing)) return message.channel.send('Please provide valid item number')
    message.channel.send(`Please type \`yes\` to confirm paying`)
    let col = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
        max: 1
    });
    if (col.first().content.toLowerCase() === 'yes') {

        let result = await es.buy({
            user: message.author,
            guild: message.guild,
            item: parseInt(args[0])
        });
        if (result.error) {
            if (result.type === 'No-Item') return message.channel.send('Please provide valid item number');
            if (result.type === 'Invalid-Item') return message.channel.send('item does not exists');
            if (result.type === 'low-money') return message.channel.send(`**You don't have enough balance to buy this item!**`);
        } else return message.channel.send(`**Successfully bought  \`${result.inventory.name}\` for $${result.inventory.price}**`)



    } else message.channel.send('**Purchase Cancelled!**')



}

exports.help = {
    name: "buy",
    description: "A way to buy",
    example: "buy",
    usage: "buy"
};

exports.conf = {
    aliases: ['b'],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
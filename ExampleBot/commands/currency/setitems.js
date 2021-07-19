const Discord = require('discord.js')
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {

    es.setItems({
        guild: message.guild,
        shop: [{
            name: 'Watch',
            price: 20
        }, {
            name: 'Rolex',
            price: 1230
        }]
    }).then(console.log)



}

exports.help = {
    name: "setitems",
    description: "A way to setItems",
    example: "setItems",
    usage: "setItems"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
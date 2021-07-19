const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {

    let result = await es.hourly({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`You have used hourly recently Try again in ${result.time}`);
    else message.channel.send(`You have earned $${result.amount}.`)
}

exports.help = {
    name: "hourly",
    description: "a way to earn money, hourly",
    example: "hourly",
    usage: "hourly"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {

    let result = await es.monthly({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`You have used monthly recently Try again in ${result.time}`);
    else message.channel.send(`You have earned $${result.amount}.`)
}

exports.help = {
    name: "monthly",
    description: "a way to earn money, monthly",
    example: "monthly",
    usage: "monthly"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
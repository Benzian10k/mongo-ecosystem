const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]);
        if (user) user = user.user;;
    } else if (!args[0]) {
        return message.channel.send("Specify a user!");
    }
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have requied permissions.")
    let wheretoPutMoney = args[2] || "wallet"; //or bank
    let amount = args[1];
    if (!amount) return message.channel.send("Enter amount of money to Remove.");
    let result = await es.removeMoney({
        user: user,
        guild: message.guild,
        amount: amount,
        wheretoPutMoney: wheretoPutMoney
    });
    if (result.error) return message.channel.send("You cant Remove negitive money");
    else message.channel.send(`Successfully Removed all money from ${user.username}, ( in ${wheretoPutMoney} )`)

}

exports.help = {
    name: "removemoney",
    description: "A way to remove the amount  of money in your bank or wallet.",
    usage: "remove <user> <money> <bank/wallet>",
    example: "remove @user 100 wallet"
}

exports.conf = {
    aliases: [],
    cooldown: 5
}
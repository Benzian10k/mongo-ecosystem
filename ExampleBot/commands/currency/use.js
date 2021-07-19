const EcoSystem = require("mongo-ecosystem");
const es = new EcoSystem;
exports.run = async (client, message, args) => {
    // !use <item name from your inventory>
    let item = args[0];
    if (!item) return message.channel.send("What item you wana use?")
    let haveItem = false;
    const arr = await es.getUserItems({
        user: message.author,
        guild: message.guild,
    })
    for (key of arr.inventory) {
        if (key.name.toLowerCase().includes(item.toLowerCase())) haveItem = true
    };
    if (haveItem) {
        let money = Math.floor((Math.random() * 10) + 1) * 100 // 100 - 1000
        let result = await es.addMoney({
            user: message.author,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: 'wallet'
        });
        if (result.error) {
            console.log(result)
            return message.channel.send("Unknown error occured see console.")
        } else return message.channel.send("You've used " + item + " and earned $" + money)

    } else return message.channel.send("buy it first")
}


exports.help = {
    name: "use",
    description: "A way to use",
    example: "use",
    usage: "use"
};

exports.conf = {
    aliases: [],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
}
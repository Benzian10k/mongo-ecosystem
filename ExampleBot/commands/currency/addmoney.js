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
        let amount = parseInt(args[1]);
        if (!amount) return message.channel.send("Enter amount of money to add.");
        let money = parseInt(amount);
        let result = await es.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.channel.send("You cant add negitive money");
        else message.channel.send(`Successfully added $${money} to ${user.username}, ( in ${wheretoPutMoney} )`)
    }

    exports.help = {
        name: "addmoney",
        description: "A way to add the amount  of money in your bank or wallet.",
        usage: "addmoney <user> <money> <bank/wallet>",
        example: "addmoney @user 100 wallet"
    }

    exports.conf = {
        aliases: [],
        cooldown: 5
    }
    const EcoSystem = require("mongo-ecosystem");
    const es = new EcoSystem;
    exports.run = async (client, message, args) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else {
            user.id = "1"
        }

        if (user.bot || user === client.user) return message.channel.send("This user is a bot.");
        if (!client.users.cache.get(user.id) || !user) return message.channel.send('Sorry, you forgot to mention somebody.');

        let amount = args[1];
        if (!amount) return message.channel.send("Enter amount of money to add.");
        if (amount.includes("-")) return message.channel.send("You can't send negitive money.")
        let money = parseInt(amount);

        let result = await es.transferMoney({
            user: message.author,
            user2: user,
            guild: message.guild,
            amount: money
        });
        if (result.error) return message.channel.send(`You don't have enough money in your wallet.`);
        else message.channel.send(`**${message.author.username}**, Successfully transfered **${result.money}** to **${result.user2.username}**`)
   
    }

    exports.help = {
        name: "transfer",
        description: "A way to transfer money",
        usage: "transfer @user 1000",
        example: "transfer <user> <money>"
    };

    exports.conf = {
        aliases: ["pay"],
        cooldown: 5 // This number is a seconds, not a milliseconds.
        // 1 = 1 seconds.
    }
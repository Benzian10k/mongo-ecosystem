    const EcoSystem = require("mongo-ecosystem");
    const es = new EcoSystem;
    exports.run = async (client, message, args) => {

        let money = args.join(" ");
        if (!money) return message.channel.send("Enter the amount you want to deposite.");

        let result = await es.deposite({
            user: message.author,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.channel.send("Specify an amount to deposite");
            if (result.type === 'negative-money') return message.channel.send("You can't deposite negative money");
            if (result.type === 'low-money') return message.channel.send("You don't have that much money in wallet.");
            if (result.type === 'no-money') return message.channel.send("You don't have any money to deposite");
        } else {
            if (result.type === 'all-success') return message.channel.send("You have deposited all your money to your bank");
            if (result.type === 'success') return message.channel.send(`You have deposited $${result.amount} money to your bank.`);
        };
    }

    exports.help = {
        name: "deposite",
        description: "A way to get money in of the bank.",
        usage: "deposite <amount>",
        example: "deposite 500"
    }

    exports.conf = {
        aliases: ["dep"],
        cooldown: 5
    }
const {
    cmdHandler,
    logger
} = require("@Benzian10k/discord-cmd-handler");
const Discord = require("discord.js")
const client = new Discord.Client();
const {
    token,
    mongouri
} = require("./config.json");
const EcoSystem = require("mongo-ecosystem");

const es = new EcoSystem;
client.login("Your Discord BOT Token Here");
//sets mongo url
es.setMongoURI("Your Mongo URI Here");
//sets default wallet amount when ever new user is created.
es.setDefaultCashAmount(100)
//sets default bank amount when ever new user is created.
es.setDefaultBankAmount(1000)


client.on("ready", () => {
    //I'm using logger and not console beacuse it has colours :) 
    logger.info(`Logged in as ${client.user.tag} Successfully..!!`)
    cmdHandler(client, {
        logs: {
            consoleLogEnabled: true,
            consoleLogMessage: "{user.tag} ( {user.id} ) ran a command: {command} in {guild.name} ( {channel.name} )",
            cmdLogEnabled: false,
            cmdLogChannel: "ChannelID Here",
            cmdLogMessage: "{user.tag} ( {user.id} ) ran a command: {command} in {guild.name} ( {channel.name} )"
        },
        cooldownMSG: "Calm down, {user.tag}, You still have {time} before you can run the command again.",
        EnableCommmandonEdit: true,
        mentionPrefix: true,
        prefix: "es?",
        owners: ["728354001552146452", "Your Trusted Friend Discord ID"],
        path: __dirname + "/commands",
        logCommands: false
    });
    //This will load all commands.
});
process.on("unhandledRejection", _ => logger.error(_.stack + '\n' + '='.repeat(20)))
const Discord = require('discord.js');
const bot = new Discord.Client();
var prefix = "?";
const fs = require("fs");

bot.on('ready', function(){
    console.log('Le bot à bien été ouvert');
    console.log(bot.guilds.map(r => r.name + `| ${r.memberCount} membres`))
    bot.user.setStatus('online')
    bot.user.setActivity("Darkeria | ?help", {type: "WATCHING"})
})
    bot.login(process.env.TOKEN);
    bot.commands = new Discord.Collection();

    bot.on('message', message => {
        if (message.author.bot) return;
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);
    
        if (prefix == command.slice(0, 1)) {
            let commandFile = bot.commands.get(command.slice(prefix.length));
            if (commandFile) commandFile.run(bot, message, args);
        }
});
fs.readdir("./commandes/", (err, files) => {
    if(err) console.log(err);
    
    let jsFile = files.filter(f => f.split(".").pop() === "js");
    if (jsFile.length <= 0) {
        message.channel.send("Je ne trouve pas la commande");
        return;
    }
    
    jsFile.forEach((f, i) => {
        let props = require(`./commandes/${f}`);
        bot.commands.set(props.help.name, props);
        });
    });
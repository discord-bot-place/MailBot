//////////////////////////////////////REQUIREMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const Discord = require('discord.js'),
client = new Discord.Client(),
config = require('../config.js'),
fs = require("fs"),
path = require("path"),
chalk = require("chalk");

client.config = config;
/////////////////////////////////////HANDLERS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function loadCmds(){ // This function load the commands
    client.commands = [];
    fs.readdir(`${__dirname}${path.sep}commands/`, (err, files) => {
        if(err) console.log(err);
        if(files.length < 1) return console.log("No files !");
        
        files.forEach(f => {
            delete require.cache[require.resolve(`${__dirname}${path.sep}commands/${f}`)];
            var cmd = require(`${__dirname}${path.sep}commands/${f}`);
            var cmdName = f.split(".")[0];
            console.log("Loaded command : " + cmdName);
            client.commands.push(cmd);
        });
    });
};

function loadEvents(){ // This function load events
    fs.readdir(`${__dirname}/events/`, (err, files) => {
        if(err) console.log(err);
        if(files.length < 1) return console.log("No files !");

        files.forEach(f => {
            var event = require(`${__dirname}/events/${f}`);
            var eventName = f.split(".")[0];
            console.log("Loaded event : " + eventName)
            client.on(eventName, event.bind(null, client));
        })
    })
}

function loadAll(){ // This function load everything
    loadCmds()
    loadEvents()
}

client.reloadDB = function(){
    delete require.cache[require.resolve(`${__dirname}${path.sep}blacklisted.json`)];
}

/////////////////////////////////////CLIENT LOGIN\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on("ready", () => {
    loadAll()
    setTimeout(() => {
        console.clear();
        console.log(chalk.red.underline.bold(`Bot ModMail Discord\n`));
        console.log(chalk.magentaBright(`=> Made by JockeRider199\n=> Template Version : ${require("../package.json").version}`));
        console.log("-----------------------------------------------");
        console.log(chalk.blue(`=> Client tag :      [ ${client.user.tag} ]`));
        console.log(chalk.blue(`=> Discord Version : [ ${Discord.version} ]`));
        console.log(chalk.blue(`=> Total Users :     [ ${client.users.size} ]`));
        console.log("-----------------------------------------------");
        console.log(chalk.green("--> Client ready !"));
        console.log("-------------------------\n")
    }, 1500);

    client.setInterval(() => {
        var index = Math.floor(Math.random() * config.presences.length)
        var chosen = config.presences[index];

        client.user.setActivity(chosen.name, {type : chosen.type})
    }, 4000)
})

.on("error", e => console.log(e))
.on("disconnect", e => console.log(e))
.on("warn", e => console.log(e))

client.login(client.config.token)
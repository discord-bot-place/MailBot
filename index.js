//////////////////////////////////////REQUIREMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const Discord = require('discord.js'),
client = new Discord.Client(),
config = require('./config.json'),
fs = require("fs"),
path = require("path");

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

/////////////////////////////////////CLIENT LOGIN\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on("ready", () => {
    console.log("Ready !")
    loadAll()
})

client.login(client.config.token)
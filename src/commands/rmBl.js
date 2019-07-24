const Discord = require("discord.js"),
fs = require("fs"),
low = require("lowdb"),
filesync = require("lowdb/adapters/FileSync"),
adapter = new filesync(`${__dirname}/../blacklisted.json`),
bl = low(adapter);

exports.run = (client, msg, args) => {

    msg.delete().catch(() => {});

    var toRm = ""

    if(isNaN(args[1])){
        if(!msg.mentions.users.first()) return msg.channel.send("You have to mention or give the id to blacklist a user !");
        toRm = msg.mentions.users.first().id;
    }else{
        toRm = client.users.get(args[1]).id;
    };

    var index = bl.indexOf(toRm)

    if(index == "-1") return msg.channel.send("This user is not blacklisted !");

    bl.splice(index, 1).write()

    msg.channel.send(`${client.users.get(toRm)} is unblacklsted`);
    client.reloadDB()
}

exports.info = {
    name : "rmbl",
    alias : "removebl",
    perm : "owner"
}
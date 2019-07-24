const Discord = require("discord.js"),
fs = require("fs"),
low = require("lowdb"),
filesync = require("lowdb/adapters/FileSync"),
adapter = new filesync(`${__dirname}/../blacklisted.json`),
bl = low(adapter);

exports.run = (client, msg, args) => {

    msg.delete().catch(() => {});

    var toAdd = ""

    if(isNaN(args[1])){
        if(!msg.mentions.users.first()) return msg.channel.send("You have to mention or give the id to blacklist a user !");
        toAdd = msg.mentions.users.first().id;
    }else{
        toAdd = client.users.get(args[1]).id;
    };

    bl.push(toAdd).write()

    var embed = new Discord.RichEmbed()
        .setColor("ff0000")
        .setDescription(`The user ${client.users.get(toAdd).tag} has been blacklisted for using this bot !`);
    msg.channel.send(embed);
    client.reloadDB()
}

exports.info = {
    name : "addbl",
    alias : [],
    perm : "owner"
}
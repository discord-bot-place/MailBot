const Discord = require("discord.js");

exports.run = async (client, msg, args) => {

    msg.delete().catch(() => {});

    var newMsg = await msg.channel.send("Pinginnnnnng...");
    var embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField("Ping API", Math.floor(client.ws.ping) + "ms")
        .addField("Ping Bot", (newMsg.createdTimestamp - msg.createdTimestamp) + "ms")
    
    newMsg.delete()
    msg.channel.send(embed)
}

exports.info = {
    name : "ping",
    alias : [],
    perm : ""
}
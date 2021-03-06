const Discord = require("discord.js");

exports.run = (client, msg, args) => {

    msg.delete().catch(() => {});

    if(!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send("This command require ADMINISTRATOR permission");
    
    var user = "";

    if(isNaN(args[1])){

        if(!msg.mentions.users.first()) return msg.channel.send("You have to mention or give the id to dm a user !");
        
        user = msg.mentions.users.first();
    }else{

        user = client.users.get(args[1]);
    }

    var content = args.slice(2).join(" ");
    if(!content) return msg.reply(" you have to tell me what do I have to send !");

    user.send("```\n" + content + "\n```")
    .then(() => {
        var embed = new Discord.RichEmbed()
            .setColor("ff000")
            .setAuthor(`Reply to ${user.tag}`, msg.author.avatarURL)
            .addField("Content", content)
            .addField("To user", `ID : ${user.id}\nTag : ${user.tag}\nMention : ${msg.guild.member(user)}`)
            msg.channel.send(embed)
    })
    .catch(err => {
        console.log(err)
        msg.reply(" cannot send message to this user :(")
    })
}

exports.info = {
    name : "reply",
    alias : [],
    perm : "admin"
}
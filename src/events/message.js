const Discord = require("discord.js");
var bl = require("../blacklisted.json");

module.exports = (client, msg) => {
    
    if(
        msg.author.bot ||
        msg.author.id == client.user.id
    ) return;

    var args = msg.content.substring(client.config.prefix.length).split(" ");
    var cmdName = args[0];

    if(msg.guild && msg.content.startsWith(client.config.prefix)){
        client.commands.forEach(command => {
            if(cmdName == command.info.name || command.info.alias.includes(cmdName)){
                if(command.info.perm == "owner" && msg.author.id != client.config.OwnerID){
                    return
                }else{
                    command.run(client, msg, args);
                }
            }
        })  
    }

    if(!msg.guild && !msg.content.startsWith(client.config.prefix)){

        if(bl.includes(msg.author.id)) return msg.channel.send(":x: Vous êtes blacklisté pour l'utilisation de ce bot !");

        var channel = client.channels.get(client.config.channel);
        var reports = []
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("New message from : " + msg.author.tag, msg.author.avatarURL)
            .addField("Content", "```\n" + msg.content + "\n```")
            .addField("User Informations", `ID : ${msg.author.id}\nTag : ${msg.author.tag}\nMention : ${channel.guild.member(msg.author)}`)
            if(msg.attachments.array()[0]){
                embed.setImage(msg.attachments.array()[0].url)
            }
            embed.setFooter("MailBot")   

        if(msg.attachments && !msg.content){
            var embed2 = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(`New Image from : ${msg.author.tag}`, msg.author.avatarURL)
                .setImage(msg.attachments.array()[0].url)

            channel.send(embed2);
        }
        else{
            channel.send(embed);
        }

        msg.react("📮");
        reports.push(msg.author.id)
    }
}
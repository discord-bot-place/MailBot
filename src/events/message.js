const Discord = require("discord.js");

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

        var channel = client.channels.get(client.config.channel);
        var reports = []
        var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("New message from : " + msg.author.tag, msg.author.avatarURL)
            .addField("Content", "```\n" + msg.content + "\n```")
            .addField("User Informations", `ID : ${msg.author.id}\nTag : ${msg.author.tag}\nMention : ${channel.guild.member(msg.author)}`)
            .setFooter("MailBot")   

        channel.send(embed);
        msg.react("📮");
        reports.push(msg.author.id)
    }
}
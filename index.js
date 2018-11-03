//////////////////////////////////////REQUIREMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const Discord = require('discord.js');
const Client = new Discord.Client()
const login = require('./config.json');

/////////////////////////////////////CONNECTION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Client.login(login.token)

Client.on("ready", function(){
    console.log(`Connecté en temps que ${Client.user.tag} sur ${Client.guilds.size} serveurs`)
    Client.user.setActivity(`Envoie moi un message pour contacter le staff`)
})

///////////////////////////////////DMs FUNCTION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

Client.on('message', message => {
    if(message.channel.type === "dm"){
        var args = message.content.split(" ").slice(0).join(" ")
        var ChannelToSend = Client.channels.get("508306653607755776")
        var BotID = "508311935155175436"

        if(args.length > 256) return message.channel.send("Ton message contient trop de caractères...")
        if(message.author.id === BotID) return;
        var Embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor("#5cbdea")
        .setTitle("Nouveau message privé !")
        .addField("Message de :", message.author.tag + "\n ID : " + message.author.id)
        .addField("Contenu du message :", args)
        ChannelToSend.send(Embed)
        message.channel.send("Le message est bien passé ! :incoming_envelope:")
    }
})
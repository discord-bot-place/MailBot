//////////////////////////////////////REQUIREMENTS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const Discord = require('discord.js');
const Client = new Discord.Client()
const settings = require('./config.json')

const login = settings.TOKEN
const BOT_ID = settings.BOT_ID
const CHANNEL_ID = settings.CHANNEL_ID
const ACTIVITY = settings.ACTIVITY

/////////////////////////////////////CONNECTION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
Client.login(login)

Client.on("ready", function(){
    console.log(`Connecté en temps que ${Client.user.tag}\n`)
    Client.user.setActivity(ACTIVITY)
})

///////////////////////////////////DMs FUNCTION\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

Client.on('message', message => {
    if(message.channel.type === "dm"){
        var args = message.content.split(" ").slice(0).join(" ")
        var ChannelToSend = Client.channels.get(CHANNEL_ID)

        if(args.length > 256) return message.channel.send("Ton message contient trop de caractères...")
        if(message.author.id === BOT_ID) return;
        var Embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor("#5cbdea")
        .setTitle("Nouveau message privé !")
        .addField("Message de :", message.author.tag + "\n ID : " + message.author.id)
        .addField("Contenu du message :", args)
        .setTimestamp()
        ChannelToSend.send(Embed)
        message.channel.send("Le message est bien passé ! :incoming_envelope:")
        console.log(`Nouveau message de : ${message.author.tag} \n --> ${args}`)
    }
})

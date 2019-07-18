const Discord = require("discord.js");

exports.run = (client, msg, args) => {

    if(!msg.member.permissions.has("ADMINISTRATOR")) return;

    var user = client.users.get(args[1]);
    var content = args.slice(2).join(" ");

    if(!user) return msg.reply(" you must give the id of the user to dm !");
    if(!content) return msg.reply(" you have to tell me what do I have to send !");

    user.send("```\n" + content + "\n```")
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
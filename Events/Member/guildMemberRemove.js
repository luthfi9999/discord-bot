const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js")

module.exports = {
    name : "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member)
    {
        const { user, guild } = member

        const welcomer = new WebhookClient({
            id : "894981455204192277",
            token : "xwyBAnKX4MP4YXjITVb51p5vDNiyHVIndLzOnx7CB6lLRx66DnZBon1wMfrraqRC5PRZ"
        })

        const welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(user.tag, user.avatarURL({dynamic : true, size : 512}))
        .setThumbnail(user.avatarURL({dynamic : true, size :512}))
        .setDescription(
            `${member} has left the **${guild.name}**!\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n
            Latest Member Count : **${guild.memberCount}**
            `
        )
        .setFooter(`ID : ${user.id}`)

        welcomer.send({embeds : [welcome]}).catch(err => console.log(err))
    }
}
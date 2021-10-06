const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js")

module.exports = {
    name : "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member)
    {
        const { user, guild } = member

        member.roles.add('894967284215451659')
        const welcomer = new WebhookClient({
            id : "894981455204192277",
            token : "xwyBAnKX4MP4YXjITVb51p5vDNiyHVIndLzOnx7CB6lLRx66DnZBon1wMfrraqRC5PRZ"
        })

        const welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor(user.tag, user.avatarURL({dynamic : true, size : 512}))
        .setThumbnail(user.avatarURL({dynamic : true, size :512}))
        .setDescription(
            `Welcome ${member} to the **${guild.name}**!\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\n
            Latest Member Count : **${guild.memberCount}**
            `
        )
        .setFooter(`ID : ${user.id}`)

        welcomer.send({embeds : [welcome]}).catch(err => console.log(err))
    }
}
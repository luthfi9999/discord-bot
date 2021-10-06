const { CommandInteraction, MessageEmbed } = require('discord.js')
const targetVal = require('../../Validations/Target')

module.exports = {
    name : "clear",
    description: 'Deletes a specified number of messages from a channel or a target.',
    permission: 'MANAGE_MESSAGES',
    options : [
        {
            name: 'amount',
            description : 'Select the amount of messages to delete from a channel or a target',
            type: "NUMBER",
            required: true
        },
        {
            name: 'target',
            description: 'Select a target to clear their messages.',
            type: 'USER',
            required: false
        }
    ],
    validate : {
        self : true
    },
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction)
    {
        const { channel, options, member } = interaction
        const amount = options.getNumber('amount')
        const target = options.getMember('target')
        const messages = await channel.messages.fetch()
        const response = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
        
        const validate = targetVal(this, target, member)
        if(validate)
        {
            response.setDescription(validate)
            return interaction.reply({embeds : [response]})
        }

        if(target)
        {
            let i = 0
            const filtered = [];
            (await messages).filter((message) => {
                if(message.author.id === target.id && amount > i)
                {
                    filtered.push(message)
                    i++
                }
            })

            await channel.bulkDelete(filtered, true).then(message => {
                response.setDescription(`🧹 Cleared ${message.size} from ${target}.`)
                interaction.reply({embeds: [response]})
            }) 
        }
        else{
            await channel.bulkDelete(amount, true).then(message => {
                response.setDescription(`🧹 Cleared ${message.size} from this channel.`)
                interaction.reply({embeds: [response]})
            }) 
        }
    }
}
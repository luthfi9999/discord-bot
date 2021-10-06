const { CommandInteraction } = require("discord.js")
const { execute } = require("../../Events/Interaction/interactionCreate")

module.exports = {
    name : "ping",
    description : "Ping",
    permission : "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        interaction.reply({content: "pong"});
    }
}

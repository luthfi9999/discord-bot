const { Client } = require('discord.js')
const mongoose = require('mongoose')
const { Database } = require('../../config.json')

module.exports = {
    name : "ready",
    once : true,
    /**
     * @param {Client} client 
     */
    async execute (client)
    {
        client.user.setActivity("HELLO!", {type: "WATCHING"})

        if(!Database) return

        await mongoose.connect( Database, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        .then(() => console.log("\n\n✔ Connection to database has been established"))
        .catch((err) => console.log("\n\n⛔ Failed to connect to database, reason : " + err))

        console.log('\nThe client is now ready to use 😉');
    }
};
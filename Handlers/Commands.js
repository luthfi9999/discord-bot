const { Permissions } = require('../Validations/Permissions')
const { Client } = require('discord.js')
const { promisify } = require('util')
const { glob } = require('glob')
const PG = promisify(glob)
const ASCII = require('ascii-table')

/**
 * @param {Client} client
 */
module.exports =  async (client) => {
    const Table = new ASCII("Commands Loaded");

    CommandsArray = [];
    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        {
            return Table.addRow(file.split('/')[7], "⛔ Failed, missing a name");
        }

        if(!command.description)
        {
            return Table.addRow(command.name, "⛔ Failed, missing a description");
        }
        
        if(command.permission)
        {
            if(Permissions.includes(command.permission))
            {
                command.defaultPermission = false;
            }
            else
            {
                return Table.addRow(command.name, "⛔ Failed, permission is invalid");
            }
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✔ SUCCESSFUL")
    });
    
    console.log(Table.toString());

    client.on('ready', async ()=> {
        const MainGuild = await client.guilds.cache.get('854124969117089822');


        
        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPermissions = CommandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPermissions) return null;

                return MainGuild.roles.cache.filter((c) => c.permissions.has(cmdPermissions));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((c, r) => {
                    return [...c, {id: r.id, type: "ROLE", permission: true}]
                },[]);
                
                return [...accumulator,{id: r.id, permissions}]
            }, []);
            await MainGuild.commands.permissions.set({ fullPermissions });
        })
        .catch((err) => console.log(" Getting error " + err))
    })
}
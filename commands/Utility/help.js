const { MessageEmbed } = require("discord.js");
const {emotecolor} = require('../../style.json');
const prefix = '&'
module.exports = {
  
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands','h'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
        const fs = require('fs');
        const commandFolders = fs.readdirSync('./commands');
		if (!args.length) {


           data.push("Use prefix `&` with all commands\n")
		   data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command!\n\n`);
            
            for (let i = 0; i < commandFolders.length; i++) {
                const commandFiles = fs.readdirSync(`./commands/${commandFolders[i]}`).filter(file => file.endsWith('.js'))
                data.push(`\n❯   ${commandFolders[i]}\n`)
                for (let j = 0; j < commandFiles.length; j++){
                    data.push(`\`${commandFiles[j].slice(0, -3)}\` `)
                }
                data.push('\n')
                
            }
        
                           
            
			
           
			
	
			let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Help`)
      .setColor(emotecolor)
	  .setDescription(`${data.join(' ')}`)
        .setTimestamp()
		.setFooter(`Requested by ${message.author.username}`)
	return message.channel.send(helpEmbed);
			
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
	
		message.channel.send(data)
	},
};

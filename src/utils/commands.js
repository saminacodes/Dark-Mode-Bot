import { Routes } from 'discord-api-types/v9';
import { socketClient, restClient } from '../discord-client/index.js';

const commands = [];

export const registerCommandModule = (name, command, handler) => {
  commands.push(command);
  command.setName(name);
  socketClient.on('interactionCreate', interaction => {
    if (interaction.isCommand() && interaction.commandName === name) {
      handler(interaction);
    }
  });
};

export const registerGuildCommands = async () => {
  // TODO: Replace these with ENV variables
  const clientId = '873205734228234290';
  const guildId = '864894667774361623';
  try {
    console.log('Started refreshing application (/) commands.');
    await restClient.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

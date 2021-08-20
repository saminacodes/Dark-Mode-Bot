import { SlashCommandBuilder } from '@discordjs/builders';
import { registerCommandModule } from '../utils/commands.js';

const pingCommand = new SlashCommandBuilder()
  .setDescription('replies with pong');

const pingCommandHandler = async (interaction) => {
  await interaction.reply({ content: 'pong', ephemeral: true });
};

registerCommandModule('ping', pingCommand, pingCommandHandler);

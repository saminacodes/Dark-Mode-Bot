import { config as configureEnv } from 'dotenv';
import { Client, Intents } from 'discord.js';
import { REST } from '@discordjs/rest';

configureEnv();

// get bot token reference from process.env.BOT_TOKEN
const BOT_TOKEN = process.env.BOT_TOKEN;

// login to discord using discord.js
export const socketClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
socketClient.login(BOT_TOKEN);

export const restClient = new REST({ version: '9' }).setToken(BOT_TOKEN);

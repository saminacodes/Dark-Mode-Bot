const { Client, Intents } = require('discord.js');
const fetch = require('node-fetch');

configureEnv();

// get bot token reference from process.env.BOT_TOKEN
const BOT_TOKEN = process.env.BOT_TOKEN;

// login to discord using discord.js
export const socketClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
socketClient.login(BOT_TOKEN);

module.exports = { client, fetch };

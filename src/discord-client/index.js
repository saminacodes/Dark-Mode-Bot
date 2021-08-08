const { Client, Intents } = require('discord.js');

// get bot token reference from process.env.BOT_TOKEN
const BOT_TOKEN = process.env.BOT_TOKEN;

// login to discord using discord.js
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(BOT_TOKEN);

module.exports = client;

// configure enviroment variables before anything else
require('dotenv').config();

const client = require('./discord-client');

client.on('ready', () => {
  console.log('client connected and ready');
});

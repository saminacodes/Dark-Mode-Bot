import { registerGuildCommands } from './utils/commands.js';
import { socketClient } from './discord-client/index.js';

socketClient.on('ready', async () => {
  console.log('client connected and ready');
  registerGuildCommands();
});

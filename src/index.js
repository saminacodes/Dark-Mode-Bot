import { registerGuildCommands } from './utils/commands.js';
import { socketClient } from './discord-client/index.js';
import './modules/index.js';

socketClient.on('ready', async () => {
  console.log('client connected and ready');
  registerGuildCommands();
});

import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { data as welcome } from './commands/welcome.js';
import { data as rules } from './commands/rules.js';
import { data as social } from './commands/social.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId || !guildId) {
  throw new Error('DISCORD_TOKEN, DISCORD_CLIENT_ID e DISCORD_GUILD_ID sao obrigatorios');
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: [welcome.toJSON(), rules.toJSON(), social.toJSON()] },
  );
  console.log('Commands registrados.');
})();

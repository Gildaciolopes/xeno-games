import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  MessageFlags,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActivityType,
} from 'discord.js';
import 'dotenv/config';
import * as welcome from './commands/welcome.js';
import * as rules from './commands/rules.js';
import { handleMention } from './handlers/mentionReact.js';
import { handleResenha } from './handlers/resenha.js';

interface Command {
  data: SlashCommandBuilder;
  execute: (i: ChatInputCommandInteraction) => Promise<void>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const commands = new Collection<string, Command>();
commands.set(welcome.data.name, welcome as unknown as Command);
commands.set(rules.data.name, rules as unknown as Command);

client.once(Events.ClientReady, (c) => {
  console.log(`logado: ${c.user.tag}`);
  c.user.setActivity('MC KATRINA - MEU SONHO É SER MC', {
    type: ActivityType.Listening,
  });
});

client.on(Events.InteractionCreate, async (i) => {
  if (!i.isChatInputCommand()) return;
  const cmd = commands.get(i.commandName);
  if (!cmd) return;
  try {
    await cmd.execute(i);
  } catch (e) {
    console.error(e);
    if (i.replied || i.deferred) {
      await i.followUp({ content: 'Erro.', flags: MessageFlags.Ephemeral }).catch(() => undefined);
    } else {
      await i.reply({ content: 'Erro.', flags: MessageFlags.Ephemeral }).catch(() => undefined);
    }
  }
});

client.on(Events.MessageCreate, async (msg) => {
  try {
    await handleResenha(msg, client);
  } catch (e) {
    console.error('resenha error:', e);
  }
  try {
    await handleMention(msg, client);
  } catch (e) {
    console.error('mention error:', e);
  }
});

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('DISCORD_TOKEN obrigatorio');
client.login(token);

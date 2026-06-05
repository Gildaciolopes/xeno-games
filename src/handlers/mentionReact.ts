import { Message, Client } from 'discord.js';

const REACTIONS = ['👀', '💤', '🤖', '👋', '🎮', '🤔'];

export async function handleMention(msg: Message, client: Client): Promise<void> {
  if (msg.author.bot) return;
  if (!client.user) return;
  if (!msg.mentions.has(client.user)) return;
  if (!msg.channel.isSendable()) return;

  try {
    await msg.channel.sendTyping();
  } catch {}

  const delay = 2000 + Math.floor(Math.random() * 1000);
  setTimeout(async () => {
    const emoji = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    try {
      await msg.react(emoji);
    } catch {}
  }, delay);
}

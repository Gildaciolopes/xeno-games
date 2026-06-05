import { Message, EmbedBuilder, Client } from 'discord.js';
import { resenhas } from '../data/resenhas.js';

let lastTrigger = 0;
const TYPING_TEXT = '🤖 Xeno esta digitando...';

export async function handleResenha(msg: Message, client: Client): Promise<void> {
  if (msg.author.bot) return;
  if (!client.user) return;

  const channelId = process.env.RESENHA_CHANNEL_ID;
  if (!channelId || msg.channel.id !== channelId) return;

  const chance = parseFloat(process.env.RESENHA_CHANCE ?? '0.01');
  if (Math.random() > chance) return;

  const cooldown = parseInt(process.env.RESENHA_COOLDOWN_MS ?? '3600000', 10);
  if (Date.now() - lastTrigger < cooldown) return;

  if (!msg.channel.isSendable()) return;

  let recent;
  try {
    const fetched = await msg.channel.messages.fetch({ limit: 10 });
    recent = [...fetched.values()];
  } catch {
    return;
  }

  if (recent.some((m) => m.author.id === client.user!.id)) return;

  const variant = resenhas[Math.floor(Math.random() * resenhas.length)];
  const duration = parseInt(process.env.RESENHA_TYPING_DURATION_MS ?? '5000', 10);

  const embed1 = new EmbedBuilder().setTitle(TYPING_TEXT).setColor(0xffd700).setTimestamp();

  let sent;
  try {
    sent = await msg.channel.send({ embeds: [embed1] });
  } catch {
    return;
  }

  lastTrigger = Date.now();

  setTimeout(async () => {
    const embed2 = new EmbedBuilder()
      .setTitle(TYPING_TEXT)
      .setDescription(`💬 ${variant.result}`)
      .setColor(0xffd700)
      .setTimestamp();
    try {
      await sent.edit({ embeds: [embed2] });
    } catch {}
  }, duration);
}

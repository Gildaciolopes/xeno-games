import { Message, Client } from "discord.js";

const REACTIONS = ["👀", "💤", "🤖", "👋", "🎮", "🤔"];
const TALKING_REPLIES = [
  "não atrapalhe meu sonho de ser MC",
  "desde pequena meu sonho é ser MC",
  "shhh, tô jogando",
  "fala com meu empresário",
  "agora não, tô no competitivo",
  "só assino autógrafo depois do show",
  "me deixa, tô realizando meu sonho de ser MC",
  "silêncio, mestre trabalhando",
];

export async function handleMention(
  msg: Message,
  client: Client,
): Promise<void> {
  if (msg.author.bot) return;
  if (!client.user) return;
  if (!msg.mentions.has(client.user)) return;
  if (!msg.channel.isSendable()) return;

  try {
    await msg.channel.sendTyping();
  } catch {}

  const delay = 2000 + Math.floor(Math.random() * 1000);
  const talkingId = process.env.RESENHA_CHANNEL_ID;
  const inTalking = talkingId && msg.channel.id === talkingId;

  setTimeout(async () => {
    if (inTalking) {
      const reply =
        TALKING_REPLIES[Math.floor(Math.random() * TALKING_REPLIES.length)];
      try {
        await msg.reply({
          content: reply,
          allowedMentions: { repliedUser: false },
        });
      } catch {}
      return;
    }
    const emoji = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    try {
      await msg.react(emoji);
    } catch {}
  }, delay);
}

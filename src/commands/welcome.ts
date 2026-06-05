import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { buildWelcomeBanner } from '../builders/welcomeBuilder.js';
import { render } from '../utils/template.js';
import { loadBanner } from '../utils/banner.js';

export const data = new SlashCommandBuilder()
  .setName('welcome')
  .setDescription('Posta a mensagem de boas-vindas neste canal')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guild || !interaction.channel || !interaction.channel.isSendable()) return;

  await interaction.reply({ content: 'Postando...', flags: MessageFlags.Ephemeral });

  const template = process.env.WELCOME_TEMPLATE ?? 'Bem-vindo {{user}} ao {{guild}}!';
  const text = render(template, {
    user: `<@${interaction.user.id}>`,
    guild: interaction.guild.name,
    memberCount: interaction.guild.memberCount,
  });

  const { attachment, url } = loadBanner('xeno-games-welcome.png');
  const container = buildWelcomeBanner(text, url);

  const msg = await interaction.channel.send({
    components: [container],
    flags: MessageFlags.IsComponentsV2,
    files: [attachment],
  });

  await msg.pin().catch(() => undefined);
  await interaction.editReply({ content: 'Mensagem postada e fixada.' });
}

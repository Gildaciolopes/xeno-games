import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { buildRulesBanner } from '../builders/rulesBuilder.js';
import { render } from '../utils/template.js';
import { loadBanner } from '../utils/banner.js';

export const data = new SlashCommandBuilder()
  .setName('rules')
  .setDescription('Posta as regras do servidor neste canal')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guild || !interaction.channel || !interaction.channel.isSendable()) return;

  await interaction.reply({ content: 'Postando...', flags: MessageFlags.Ephemeral });

  const template = process.env.RULES_TEMPLATE ?? 'Regras do {{guild}}';
  const text = render(template, {
    user: `<@${interaction.user.id}>`,
    guild: interaction.guild.name,
    memberCount: interaction.guild.memberCount,
  });

  const { attachment, url } = loadBanner('xeno-games-rules.png');
  const container = buildRulesBanner(text, url);

  const msg = await interaction.channel.send({
    components: [container],
    flags: MessageFlags.IsComponentsV2,
    files: [attachment],
  });

  await msg.pin().catch(() => undefined);
  await interaction.editReply({ content: 'Mensagem postada e fixada.' });
}

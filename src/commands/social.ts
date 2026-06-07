import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} from 'discord.js';
import { buildSocialBanner } from '../builders/socialBuilder.js';
import { render } from '../utils/template.js';
import { loadBanner } from '../utils/banner.js';

const DEFAULT_BODY =
  'Quer ficar por dentro de tudo que rola na **Xeno Technology**?\n' +
  'Acompanhe nossos bastidores, novidades, vagas e conteúdos exclusivos nas redes abaixo. ' +
  'Bora fazer parte dessa comunidade!';

export const data = new SlashCommandBuilder()
  .setName('social')
  .setDescription('Posta e fixa as redes sociais da Xeno Technology neste canal')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  if (!interaction.guild || !interaction.channel || !interaction.channel.isSendable()) return;

  await interaction.reply({ content: 'Postando...', flags: MessageFlags.Ephemeral });

  const template = process.env.SOCIAL_TEMPLATE ?? DEFAULT_BODY;
  const text = render(template, {
    user: `<@${interaction.user.id}>`,
    guild: interaction.guild.name,
    memberCount: interaction.guild.memberCount,
  });

  const { attachment, url } = loadBanner('xeno-banner-social.png');
  const container = buildSocialBanner(text, url, {
    instagramUrl: 'https://www.instagram.com/grupoxeno',
    instagramHandle: '@grupoxeno',
    linkedinUrl: 'https://www.linkedin.com/company/xenotechnology',
    linkedinLabel: 'Xeno Technology',
    instagramEmoji: process.env.INSTAGRAM_EMOJI,
    linkedinEmoji: process.env.LINKEDIN_EMOJI,
  });

  const msg = await interaction.channel.send({
    components: [container],
    flags: MessageFlags.IsComponentsV2,
    files: [attachment],
    allowedMentions: { parse: [] },
  });

  await msg.pin().catch(() => undefined);
  await interaction.editReply({ content: 'Mensagem postada e fixada.' });
}

import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
} from 'discord.js';
import { getAccentColor } from '../utils/banner.js';

export interface SocialLinks {
  instagramUrl: string;
  instagramHandle: string;
  linkedinUrl: string;
  linkedinLabel: string;
  instagramEmoji?: string;
  linkedinEmoji?: string;
}

export function buildSocialBanner(
  bodyText: string,
  bannerUrl: string,
  links: SocialLinks,
): ContainerBuilder {
  const ig = links.instagramEmoji ? `${links.instagramEmoji} ` : '';
  const li = links.linkedinEmoji ? `${links.linkedinEmoji} ` : '';

  const linksBlock =
    `${ig}**Instagram:** [${links.instagramHandle}](${links.instagramUrl})\n` +
    `${li}**LinkedIn:** [${links.linkedinLabel}](${links.linkedinUrl})`;

  return new ContainerBuilder()
    .setAccentColor(getAccentColor())
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## Siga a Xeno nas redes sociais'),
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small),
    )
    .addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(bannerUrl),
      ),
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(bodyText),
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small),
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(linksBlock),
    );
}

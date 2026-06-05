import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
} from 'discord.js';
import { getAccentColor } from '../utils/banner.js';

export function buildRulesBanner(bodyText: string, bannerUrl: string): ContainerBuilder {
  return new ContainerBuilder()
    .setAccentColor(getAccentColor())
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## Regras do Servidor'),
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small),
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(bodyText),
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small),
    )
    .addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(bannerUrl),
      ),
    );
}

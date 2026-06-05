import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
} from "discord.js";
import { getAccentColor } from "../utils/banner.js";

export function buildWelcomeBanner(
  bodyText: string,
  bannerUrl: string,
): ContainerBuilder {
  return new ContainerBuilder()
    .setAccentColor(getAccentColor())
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent("## Bem-vindo a Xeno Games!"),
    )
    .addSeparatorComponents(
      new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small),
    )
    .addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(bannerUrl),
      ),
    )
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(bodyText));
}

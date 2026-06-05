import { AttachmentBuilder } from 'discord.js';
import path from 'node:path';

export interface BannerAsset {
  attachment: AttachmentBuilder;
  url: string;
}

export function loadBanner(filename: string): BannerAsset {
  const basePath = process.env.ASSETS_PATH ?? './assets';
  const filePath = path.resolve(basePath, filename);
  const attachment = new AttachmentBuilder(filePath).setName(filename);
  return { attachment, url: `attachment://${filename}` };
}

export function getAccentColor(): number {
  const raw = process.env.ACCENT_COLOR ?? '0xA78BFA';
  return Number(raw);
}

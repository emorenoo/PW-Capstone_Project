import type { Page } from "@playwright/test";

export async function blockThirdPartyAds(page: Page): Promise<void> {
  await page.route(
    /(?:googleads|googlesyndication|doubleclick|adservice)/i,
    route => route.abort(),
  );
}

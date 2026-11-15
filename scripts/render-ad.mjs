import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const here = fileURLToPath(new URL("../index.html", import.meta.url));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1
  });
  await page.goto("file://" + resolve(here), { waitUntil: "networkidle" });
  await page.screenshot({ path: "ad.png", fullPage: true, animations: "disabled" });
} finally {
  await browser.close();
}

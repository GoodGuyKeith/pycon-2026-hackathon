import { createRequire } from "module";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const require = createRequire("/Users/keithgohjuankai/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json");
const { chromium } = require("playwright");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = join(root, "assets");
const framesDir = join(root, ".tmp-demo-frames");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:8000/index.html";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function ensureCleanDir(path) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
  mkdirSync(path, { recursive: true });
}

async function clickUnique(page, selector) {
  const locator = page.locator(selector);
  const count = await locator.count();
  if (count !== 1) {
    throw new Error(`Expected one match for ${selector}, found ${count}`);
  }
  await locator.click();
}

async function clickButton(page, text) {
  await clickUnique(page, `button:has-text("${text}")`);
}

async function clickTab(page, text) {
  await clickUnique(page, `nav button:has-text("${text}")`);
}

async function setCaption(page, eyebrow, body) {
  await page.evaluate(({ eyebrow, body }) => {
    let caption = document.getElementById("demo-caption");
    if (!caption) {
      caption = document.createElement("div");
      caption.id = "demo-caption";
      caption.style.position = "fixed";
      caption.style.left = "50%";
      caption.style.bottom = "22px";
      caption.style.transform = "translateX(-50%)";
      caption.style.zIndex = "9999";
      caption.style.width = "min(1040px, calc(100vw - 48px))";
      caption.style.padding = "16px 20px";
      caption.style.border = "2px solid rgba(255, 252, 239, 0.5)";
      caption.style.background = "rgba(31, 36, 35, 0.94)";
      caption.style.color = "#fffcef";
      caption.style.boxShadow = "0 18px 50px rgba(31, 36, 35, 0.32)";
      caption.style.fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
      caption.style.pointerEvents = "none";
      caption.innerHTML = `
        <div id="demo-caption-eyebrow" style="color:#88d459;font-size:14px;font-weight:900;letter-spacing:0.22em;text-transform:uppercase;"></div>
        <div id="demo-caption-body" style="margin-top:4px;font-size:28px;line-height:1.18;font-weight:900;"></div>
      `;
      document.body.appendChild(caption);
    }
    document.getElementById("demo-caption-eyebrow").textContent = eyebrow;
    document.getElementById("demo-caption-body").textContent = body;
  }, { eyebrow, body });
}

async function main() {
  mkdirSync(assetsDir, { recursive: true });
  ensureCleanDir(framesDir);
  let frame = 0;
  const frameList = [];

  async function captureFrame(page, label, duration = 1.2) {
    const framePath = join(framesDir, `frame-${String(frame).padStart(3, "0")}-${label}.png`);
    await page.screenshot({ path: framePath, fullPage: false });
    frameList.push(`file '${framePath.replace(/'/g, "'\\''")}'\nduration ${duration}`);
    frame += 1;
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.removeItem("conferenceBuddyCheckedIn");
    localStorage.removeItem("conferenceBuddyConnections");
    localStorage.removeItem("conferenceBuddyClaimedRewards");
    localStorage.removeItem("conferenceBuddyPlans");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-current.png"), fullPage: true });
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-01-hero.png"), fullPage: false });
  await setCaption(page, "1 / What it is", "Event Buddy turns a messy event agenda into a practical day plan, social prompts, and reward-ready proof.");
  await captureFrame(page, "hero", 2.7);

  await page.waitForTimeout(600);
  await page.mouse.wheel(0, 760);
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-02-import.png"), fullPage: false });
  await setCaption(page, "2 / Bring the agenda", "Import from paste, URL, CSV, calendar, upload, or manual quick-add, then tune goals, energy, social mode, and venue drift.");
  await captureFrame(page, "import", 2.9);

  await page.evaluate(() => window.scrollBy(0, 360));
  await page.waitForTimeout(400);
  await setCaption(page, "3 / Personal fieldwork plan", "The Plan tab ranks sessions, protects breaks, resolves conflicts, and explains why the schedule fits the attendee.");
  await captureFrame(page, "plan", 2.7);

  await page.locator('input[placeholder="e.g. PYD10915HA"]').fill("PYD10915HA");
  await clickButton(page, "Verify");
  await page.waitForTimeout(600);
  await setCaption(page, "4 / Verify attendance", "Room codes act as demo check-ins: one verified session becomes evidence for XP and reward eligibility.");
  await captureFrame(page, "verified", 2.6);

  await clickTab(page, "Buddy");
  await page.waitForTimeout(500);
  await page.locator('input[placeholder="e.g. KAI42"]').fill("DEV42");
  await clickButton(page, "Connect");
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-03-buddy.png"), fullPage: false });
  await setCaption(page, "5 / Buddy connections", "Attendees exchange short buddy codes for low-friction networking, while the app suggests openers and polite exits.");
  await captureFrame(page, "buddy", 2.8);

  await clickTab(page, "Rewards");
  await page.waitForTimeout(700);
  await setCaption(page, "6 / Reward Wallet", "Verified attendance and buddy exchanges become evidence signals for AI-credit-style reward tickets.");
  await captureFrame(page, "wallet", 2.6);
  await page.evaluate(() => window.scrollBy(0, 520));
  await page.waitForTimeout(400);
  const generateButtons = page.locator('button:has-text("Create request"), button:has-text("Generate code")');
  const generateCount = await generateButtons.count();
  if (generateCount > 0) {
    await generateButtons.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await setCaption(page, "7 / Claim request, not secret code", "The demo creates a non-redeemable request ID; real AI-credit vouchers would be minted server-side by organizers or sponsors.");
    await captureFrame(page, "reward-card", 2.7);
    await generateButtons.first().click();
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-04-rewards.png"), fullPage: false });
  await setCaption(page, "8 / Proof trail", "The request ID gives sponsors a claim to validate against room-code and buddy-code evidence, without exposing real voucher codes.");
  await captureFrame(page, "claim", 2.9);

  await clickTab(page, "Venue");
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(assetsDir, "event-buddy-demo-05-venue.png"), fullPage: false });
  await setCaption(page, "9 / Venue rhythm", "The Venue tab turns the plan into movement guidance, tight-transfer warnings, and a practical home-base suggestion.");
  await captureFrame(page, "venue", 2.7);

  await context.close();
  await browser.close();

  const finalFrame = readdirSync(framesDir).filter((name) => name.endsWith(".png")).sort().at(-1);
  if (finalFrame) {
    frameList.push(`file '${join(framesDir, finalFrame).replace(/'/g, "'\\''")}'`);
  }
  const listPath = join(framesDir, "frames.txt");
  writeFileSync(listPath, `${frameList.join("\n")}\n`);

  const mp4Path = join(assetsDir, "event-buddy-demo.mp4");
  const result = spawnSync("ffmpeg", [
    "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", listPath,
    "-vf", "fps=30,format=yuv420p,scale=1280:720",
    "-movflags", "+faststart",
    mp4Path
  ], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error("ffmpeg conversion failed.");
  }
  rmSync(framesDir, { recursive: true, force: true });
  console.log(`Captured demo assets from ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

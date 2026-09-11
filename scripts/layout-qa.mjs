import { writeFile } from "node:fs/promises";
import WebSocket from "ws";

const endpoint = process.argv[2];
if (!endpoint) throw new Error("Pass a Chrome DevTools WebSocket endpoint.");

const socket = new WebSocket(endpoint);
let nextId = 0;
const pending = new Map();

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id) return;
  const request = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const { result } = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.value;
}

async function waitForReady() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await evaluate("document.readyState === 'complete' && Boolean(document.querySelector('.water-path-card'))")) return;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error("Page did not become ready.");
}

const viewports = [
  { name: "mobile", width: 390, height: 844, scale: 1 },
  { name: "tablet", width: 768, height: 1024, scale: 1 },
  { name: "laptop", width: 1024, height: 768, scale: 1 },
  { name: "desktop", width: 1440, height: 900, scale: 1 },
];

const results = [];
await send("Page.enable");
await send("Runtime.enable");

for (const viewport of viewports) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.name === "mobile",
  });
  await send("Page.navigate", { url: "https://aqua-mantra-filters-v2.dhrumil-kherde.workers.dev/" });
  await waitForReady();
  await new Promise(resolve => setTimeout(resolve, 800));

  const layout = await evaluate(`(() => {
    const selectors = [
      '.v2-hero-inner', '.v2-section-intro', '.moment-panels', '.stage-journey',
      '.installation-cinema', '.city-switcher', '.installation-story-head',
      '.v2-guides-head', '.guide-ribbon', '.v2-final .shell', '.footer-grid'
    ];
    const rect = selector => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return { left: Math.round(box.left), right: Math.round(box.right), width: Math.round(box.width) };
    };
    const tabs = [...document.querySelectorAll('.stage-tabs button')].map(node => {
      const box = node.getBoundingClientRect();
      return { left: Math.round(box.left), right: Math.round(box.right), width: Math.round(box.width) };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      waterCard: rect('.water-path-card'),
      stageTabs: tabs,
      alignments: Object.fromEntries(selectors.map(selector => [selector, rect(selector)])),
      route: document.querySelector('.active-water-route')?.getAttribute('d'),
      particleCount: document.querySelectorAll('.water-particle animateMotion').length,
    };
  })()`);

  const interaction = await evaluate(`(() => {
    const before = document.querySelector('.active-water-route')?.getAttribute('d');
    const target = [...document.querySelectorAll('.outlet-controls button')].find(button => button.getAttribute('aria-pressed') === 'false');
    target?.click();
    return new Promise(resolve => setTimeout(() => resolve({
      clicked: Boolean(target),
      changed: document.querySelector('.active-water-route')?.getAttribute('d') !== before,
      label: document.querySelector('.water-readout strong')?.textContent,
    }), 300));
  })()`);

  const { data } = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  const screenshot = `/tmp/aqua-${viewport.name}-qa.png`;
  await writeFile(screenshot, Buffer.from(data, "base64"));
  let fullScreenshot = null;
  if (viewport.name === "mobile" || viewport.name === "desktop") {
    const fullHeight = await evaluate("document.documentElement.scrollHeight");
    await evaluate(`(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * .72) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 140));
      }
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 250));
    })()`);
    const fullCapture = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: viewport.width, height: fullHeight, scale: 1 },
    });
    fullScreenshot = `/tmp/aqua-${viewport.name}-full-qa.png`;
    await writeFile(fullScreenshot, Buffer.from(fullCapture.data, "base64"));
  }
  results.push({ name: viewport.name, layout, interaction, screenshot, fullScreenshot });
}

console.log(JSON.stringify(results, null, 2));
socket.close();

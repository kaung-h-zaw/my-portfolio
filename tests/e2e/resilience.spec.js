import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    json: { current_weather: { temperature: 29, weathercode: 2 } },
  }));
});

async function start(page) {
  await page.addInitScript(() => sessionStorage.setItem("hasVisitedThisSession", "true"));
  await page.goto("/");
  await expect(page.locator("[data-device]")).toBeVisible();
}

async function openAbout(page) {
  if (await page.locator("[data-device]").getAttribute("data-device") !== "desktop") {
    await page.getByRole("button", { name: "About_Me", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "Kaung Htet Zaw", exact: true, level: 1 })).toBeVisible();
}

async function switchApp(page, name) {
  await page.getByRole("button", { name: /^Choose section, current:/ }).click();
  await page.locator(".os-titlebar").getByRole("button", { name: new RegExp(`^${name}`) }).click();
}

test("portfolio starts when browser storage is blocked", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-device]")).toBeVisible();
  await openAbout(page);
  expect(errors).toEqual([]);
});

test("failed section download shows recovery and other sections still open", async ({ page }) => {
  const projectsChunk = /\/assets\/ProjectsApp-.*\.js$/;
  await page.route(projectsChunk, (route) => route.fulfill({ status: 503, headers: { "cache-control": "no-store" }, body: "Temporarily unavailable" }));
  await start(page);
  await openAbout(page);
  await page.getByRole("button", { name: "View Projects", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Projects is unavailable", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Reload page", exact: true })).toBeVisible();
  await switchApp(page, "Contact");
  await expect(page.getByRole("heading", { name: "Get In Touch", exact: true })).toBeVisible();
  await page.unroute(projectsChunk);
  await Promise.all([
    page.waitForEvent("load"),
    (async () => {
      await switchApp(page, "Projects");
      await page.getByRole("button", { name: "Reload page", exact: true }).click();
    })(),
  ]);
  await expect(page.getByRole("heading", { name: "Project Archive", exact: true })).toBeVisible();
});

for (const scenario of ["network failure", "invalid temperature"]) {
  test(`weather shows unavailable for ${scenario}`, async ({ page }) => {
    await page.route("https://api.open-meteo.com/**", (route) => scenario === "network failure"
      ? route.abort()
      : route.fulfill({ json: { current_weather: { weathercode: 2 } } }));
    await start(page);
    await expect(page.getByText("Weather unavailable", { exact: true })).toBeVisible();
    await expect(page.getByRole("status", { name: "Loading weather", exact: true })).toHaveCount(0);
    await expect(page.getByText("NaN", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Hazy Sun", { exact: true })).toHaveCount(0);
  });
}

test("weather showers are not presented as clear skies", async ({ page }) => {
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    json: { current_weather: { temperature: 27, weathercode: 81 } },
  }));
  await start(page);
  await expect(page.getByText("Rain", { exact: true })).toBeVisible();
});

test("weather stops loading when the request hangs", async ({ page }) => {
  await page.clock.install();
  await page.route("https://api.open-meteo.com/**", () => {});
  const requested = page.waitForRequest("https://api.open-meteo.com/**");
  await start(page);
  await requested;
  await expect(page.getByRole("status", { name: "Loading weather", exact: true })).toBeVisible();
  await page.clock.fastForward(9000);
  await expect(page.getByText("Weather unavailable", { exact: true })).toBeVisible();
});

test("rejected audio playback stays stopped and can be retried", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      return window.allowTestAudio ? Promise.resolve() : Promise.reject(new DOMException("Playback blocked", "NotAllowedError"));
    };
  });
  await start(page);
  if (await page.locator("[data-device]").getAttribute("data-device") === "desktop") {
    await page.getByRole("button", { name: "Show desktop", exact: true }).click();
  }
  const play = page.getByRole("button", { name: "Play music", exact: true });
  await play.click();
  await expect(page.getByText("Playback unavailable. Try again.", { exact: true })).toBeVisible();
  await expect(play).toHaveAttribute("aria-pressed", "false");
  await page.evaluate(() => { window.allowTestAudio = true; });
  await play.click();
  const pause = page.getByRole("button", { name: "Pause music", exact: true });
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await pause.click();
  await expect(play).toHaveAttribute("aria-pressed", "false");
});

test("contact rejects blank messages and safely completes after navigation", async ({ page }) => {
  let release;
  let requests = 0;
  const ready = new Promise((resolve) => { release = resolve; });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.route("https://api.emailjs.com/**", async (route) => {
    requests++;
    await ready;
    await route.fulfill({ status: 200, body: "OK" });
  });
  await start(page);
  await openAbout(page);
  await switchApp(page, "Contact");
  await page.locator("#contact-name").fill("Visitor");
  await page.locator("#contact-email").fill("reviewer@example.com");
  await page.locator("#contact-message").fill("   ");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  expect(await page.locator("#contact-message").evaluate((input) => input.validity.customError)).toBe(true);
  expect(requests).toBe(0);
  await page.locator("#contact-message").fill("Mocked test message; never delivered.");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  try {
    await expect(page.getByRole("button", { name: "Sending…", exact: true })).toBeDisabled();
    await expect(page.locator("#contact-message")).toHaveAttribute("readonly", "");
    await expect.poll(() => requests).toBe(1);
    await switchApp(page, "Education");
    await expect(page.getByRole("heading", { name: "Academic History", exact: true })).toBeVisible();
  } finally {
    release();
  }
  await switchApp(page, "Contact");
  await expect(page.getByRole("button", { name: "Send Message", exact: true })).toBeEnabled();
  expect(errors).toEqual([]);
});

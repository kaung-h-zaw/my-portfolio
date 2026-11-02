import { test, expect } from "@playwright/test";

const errors = new WeakMap();

test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  page.on("pageerror", (error) => errors.get(page).push(error.message));
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    json: { current_weather: { temperature: 29, weathercode: 2 } },
  }));
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
});

test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

async function visit(page) {
  await page.addInitScript(() => sessionStorage.setItem("hasVisitedThisSession", "true"));
  await page.goto("/");
  await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeVisible();
}

test("boots as KAUNG OS and opens one About window", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "KAUNG OS", exact: true })).toBeVisible();
  await expect(page.getByText(/KAUNG_SPACE/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
  await expect(page.getByRole("region", { name: / window$/ }).getByText("KAUNG OS · v2.0", { exact: true })).toBeVisible();
});

test("delayed app loading never blinks or overlaps the window", async ({ page }) => {
  await page.route(/\/assets\/ProjectsApp-.*\.js$/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    await route.continue();
  });
  await visit(page);
  await page.evaluate(() => {
    window.__portfolioSamples = [];
    window.__portfolioSamplingDone = false;
    const end = performance.now() + 1100;
    const sample = () => {
      const windows = document.querySelectorAll('[role="region"][aria-label$=" window"]');
      const shell = windows[0]?.firstElementChild;
      const content = windows[0]?.querySelector(".os-content > div");
      window.__portfolioSamples.push({
        count: windows.length,
        opacity: shell ? getComputedStyle(shell).opacity : null,
        filter: shell ? getComputedStyle(shell).filter : null,
        contentOpacity: content ? getComputedStyle(content).opacity : null,
      });
      if (performance.now() < end) requestAnimationFrame(sample);
      else window.__portfolioSamplingDone = true;
    };
    requestAnimationFrame(sample);
  });
  await page.getByRole("button", { name: "View Projects", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Project Archive", exact: true })).toBeVisible();
  await page.waitForFunction(() => window.__portfolioSamplingDone);
  const samples = await page.evaluate(() => window.__portfolioSamples);
  expect(samples.length).toBeGreaterThan(5);
  expect(samples.every((sample) => sample.count === 1 && sample.opacity === "1" && sample.contentOpacity === "1" && sample.filter === "none")).toBe(true);
});

test("Desktop or Home reveals apps and reopens the current app", async ({ page }, testInfo) => {
  await visit(page);
  const phone = testInfo.project.name === "phone";
  await page.getByRole("button", { name: phone ? "Go to home screen" : "Show desktop", exact: true }).click();
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(0);
  if (phone) {
    await page.getByRole("button", { name: "About_Me", exact: true }).tap();
  } else {
    await page.getByRole("navigation", { name: "App dock" }).getByRole("button", { name: "Focus About_Me window", exact: true }).click();
  }
  await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close window", exact: true }).click();
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(0);
});

test("case studies stay in one app and Back restores keyboard focus", async ({ page }) => {
  await visit(page);
  await page.getByRole("button", { name: "View Projects", exact: true }).click();
  await page.getByRole("button", { name: "View Guinea Group Capstone case study", exact: true }).click();
  await expect(page.getByRole("heading", { name: "My contribution", exact: true })).toBeVisible();
  await expect(page.getByText("Four-person capstone team", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Back to projects", exact: true }).click();
  await expect(page.getByRole("button", { name: "View Guinea Group Capstone case study", exact: true })).toBeFocused();

  const journey = page.getByRole("button", { name: "View JourneyHub case study", exact: true });
  await journey.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "JourneyHub", exact: true })).toBeFocused();
  await expect(page.getByRole("heading", { name: "Technical decisions", exact: true })).toBeVisible();
  const image = page.getByRole("img", { name: "JourneyHub application screenshot", exact: true });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(page.getByRole("link", { name: /JourneyHub live demo/ })).toHaveAttribute("href", "https://journeyhub-planner.vercel.app/");
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
  expect(await page.locator(".os-content").evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  await page.getByRole("button", { name: "Back to projects", exact: true }).click();
  await expect(journey).toBeFocused();
  await expect(page.getByRole("link", { name: /SendBook GitHub repository/ })).toHaveAttribute("href", "https://github.com/kaung-h-zaw/SendBook");
  await expect(page.getByRole("link", { name: /IMKAUNG live demo/ })).toHaveAttribute("href", "https://imkaung.pages.dev/");
});

test("View CV opens the original PDF in a new tab", async ({ page, context, request }) => {
  const pdf = await request.get("/resume.pdf");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  // Mock only the tab's document: headless browsers vary in native PDF support.
  await context.route("**/resume.pdf", (route) => route.fulfill({ contentType: "text/html", body: "<title>PDF tab</title>" }));
  await visit(page);
  const link = page.locator(".app-page").getByRole("link", { name: "View CV", exact: true });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).not.toHaveAttribute("download");
  const tabPromise = page.waitForEvent("popup");
  await link.click();
  const tab = await tabPromise;
  await tab.waitForLoadState();
  expect(new URL(tab.url()).pathname).toBe("/resume.pdf");
  expect(await tab.evaluate(() => window.opener)).toBe(null);
  await tab.close();
  await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeVisible();
  const iconTabPromise = page.waitForEvent("popup");
  await openApp(page, "CV");
  const iconTab = await iconTabPromise;
  await iconTab.waitForLoadState();
  expect(new URL(iconTab.url()).pathname).toBe("/resume.pdf");
  await iconTab.close();
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
});

test("phone keeps a compact status bar and Home through rotation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "Phone-specific status bar");
  await visit(page);
  for (const viewport of [{ width: 320, height: 700 }, { width: 844, height: 390 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await expect(page.getByLabel("Phone status", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open portfolio menu", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Go to home screen", exact: true })).toBeVisible();
    expect((await page.locator(".os-titlebar").boundingBox()).height).toBe(36);
    await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
  }
});

test("tech stack shows the requested languages and databases without hover", async ({ page }) => {
  await visit(page);
  await page.getByRole("button", { name: "View Projects", exact: true }).click();
  await page.getByRole("button", { name: "Choose section, current: Projects", exact: true }).click();
  await page.getByRole("region", { name: / window$/ }).getByRole("button", { name: /^Skills/ }).click();
  await expect(page.getByRole("heading", { name: "Tech Stack", exact: true })).toBeVisible();
  const frontend = page.getByRole("region", { name: "Frontend", exact: true });
  for (const name of ["TypeScript", "Next.js"]) await expect(frontend.getByText(name, { exact: true })).toBeVisible();
  const databases = page.getByRole("region", { name: "Databases", exact: true });
  for (const name of ["MongoDB", "PostgreSQL", "MySQL", "SQLite"]) await expect(databases.getByText(name, { exact: true })).toBeVisible();
  await expect(databases.getByRole("listitem")).toHaveCount(4);
  expect(await page.locator(".os-content").evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
});

async function openApp(page, name) {
  await page.getByRole("button", { name: /^Choose section, current:/ }).click();
  await page.locator(".os-titlebar").getByRole("button", { name: new RegExp(`^${name}`) }).click();
}

test("redesigned pages remain readable without horizontal overflow", async ({ page }, testInfo) => {
  await visit(page);
  if (testInfo.project.name === "phone") await page.setViewportSize({ width: 320, height: 700 });
  for (const [app, title] of [["About_Me", "Kaung Htet Zaw"], ["Projects", "Project Archive"], ["Experience", "Work History"], ["Education", "Academic History"], ["Contact", "Get In Touch"]]) {
    await openApp(page, app);
    await expect(page.getByRole("heading", { name: title, exact: true, level: 1 })).toBeVisible();
    expect(await page.locator(".os-content").evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
  }
});

test("certificate verification dialog remains keyboard accessible", async ({ page }) => {
  await visit(page);
  await openApp(page, "Education");
  const verify = page.getByRole("button", { name: "Verify Meta Front-End Developer Professional Certificate", exact: true });
  await verify.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(verify).toBeFocused();
});

test("contact form handles failed and successful submissions without sending real mail", async ({ page }) => {
  let requests = 0;
  await page.route("https://api.emailjs.com/**", async (route) => {
    requests += 1;
    expect(route.request().postData()).toContain("reviewer@example.com");
    await route.fulfill({ status: requests === 1 ? 500 : 200, body: requests === 1 ? "Simulated failure" : "OK" });
  });
  await visit(page);
  await openApp(page, "Contact");
  await page.locator("#contact-name").fill("Portfolio Test");
  await page.locator("#contact-email").fill("reviewer@example.com");
  await page.locator("#contact-message").fill("Mocked browser check. This message is never delivered.");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Message could not be sent");
  await expect(page.locator("#contact-message")).not.toHaveValue("");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "Message sent successfully!" })).toBeVisible();
  await expect(page.locator("#contact-message")).toHaveValue("");
  await expect(page.getByRole("button", { name: "Send Message", exact: true })).toBeEnabled();
  expect(requests).toBe(2);
});

test("short laptop layouts keep actions reachable and restored windows stack columns", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "laptop", "Laptop layout regression coverage");
  await visit(page);
  for (const viewport of [{ width: 1440, height: 650 }, { width: 1366, height: 768 }, { width: 1280, height: 600 }]) {
    await page.setViewportSize(viewport);
    await openApp(page, "About_Me");
    await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeInViewport({ ratio: 1 });
    await expect(page.locator(".app-page").getByRole("link", { name: "View CV", exact: true })).toBeInViewport({ ratio: 1 });
    expect(await page.locator(".app-page").evaluate((e) => e.getBoundingClientRect().width)).toBeLessThanOrEqual(1160);
    await openApp(page, "Contact");
    const email = await page.locator('.app-page a[href^="mailto:"]').boundingBox();
    const copy = await page.getByRole("button", { name: "Copy email address", exact: true }).boundingBox();
    expect(copy.y).toBeGreaterThanOrEqual(email.y + email.height);
    expect(await page.locator(".os-content").evaluate((e) => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
    const submit = page.getByRole("button", { name: "Send Message", exact: true });
    await submit.scrollIntoViewIfNeeded();
    await expect(submit).toBeInViewport({ ratio: 1 });
  }
  await page.getByRole("button", { name: "Restore window", exact: true }).click();
  for (const app of ["About_Me", "Projects", "Experience", "Skills", "Education", "Contact"]) {
    await openApp(page, app);
    expect(await page.locator(".os-content").evaluate((e) => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
    const grid = page.locator('.app-split, .app-grid-two, .app-experience-grid').first();
    expect(await grid.evaluate((e) => getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(1);
  }
});


test("experience only lists the QUT capstone role", async ({ page }) => {
  await visit(page);
  await openApp(page, "Experience");
  await expect(page.getByText("1 role", { exact: true })).toBeVisible();
  await expect(page.locator(".app-page")).not.toContainText(/freelance|present/i);
  await expect(page.getByRole("heading", { name: "Full-Stack Developer", exact: true })).toBeVisible();
});

test("external link dialog matches the OS and traps keyboard focus", async ({ page, context }) => {
  await visit(page);
  await openApp(page, "Contact");
  const github = page.locator(".app-page").getByRole("button", { name: "GitHub", exact: true });
  await github.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "Open GitHub?", exact: true })).toBeVisible();
  await expect(dialog.getByText("github.com/kaung-h-zaw", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Open link", exact: true })).toHaveAttribute("rel", "noopener noreferrer");
  await expect(dialog.getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("link", { name: "Open link", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close link dialog", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(github).toBeFocused();
  expect(await page.locator("#root").evaluate((element) => element.inert)).toBe(false);
  await context.route("https://github.com/kaung-h-zaw", (route) => route.fulfill({ contentType: "text/html", body: "<title>Mock GitHub</title>" }));
  await github.click();
  const popupPromise = page.waitForEvent("popup");
  await dialog.getByRole("link", { name: "Open link", exact: true }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(popup.url()).toBe("https://github.com/kaung-h-zaw");
  expect(await popup.evaluate(() => window.opener)).toBe(null);
  await popup.close();
  await expect(dialog).toHaveCount(0);
});


test("wide monitors open a centered window with working maximize and restore", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "wide", "Wide monitor behavior");
  await visit(page);
  const appWindow = page.getByRole("region", { name: / window$/ });
  for (const viewport of [{ width: 1920, height: 832 }, { width: 2560, height: 1440 }, { width: 1600, height: 900 }]) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("button", { name: "Maximize window", exact: true })).toBeVisible();
    await expect.poll(async () => Math.round((await appWindow.boundingBox()).width)).toBe(1400);
    await expect.poll(async () => Math.round((await appWindow.boundingBox()).height)).toBe(Math.min(900, viewport.height - 160));
    await expect.poll(async () => {
      const box = await appWindow.boundingBox();
      return Math.abs(box.x - (viewport.width - box.width) / 2);
    }).toBeLessThan(2);
    const box = await appWindow.boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(44);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - 88);
  }
  await page.getByRole("button", { name: "Maximize window", exact: true }).click();
  await expect(page.getByRole("button", { name: "Restore window", exact: true })).toBeVisible();
  expect((await appWindow.boundingBox()).width).toBeGreaterThan(1550);
  await page.getByRole("button", { name: "Restore window", exact: true }).click();
  await expect.poll(async () => Math.round((await appWindow.boundingBox()).width)).toBe(1400);
  await openApp(page, "Projects");
  await expect.poll(async () => Math.round((await appWindow.boundingBox()).width)).toBe(1400);
  expect(await page.locator(".os-content").evaluate((e) => e.scrollWidth <= e.clientWidth + 1)).toBe(true);
  await page.getByRole("button", { name: "Close window", exact: true }).click();
  await page.getByRole("navigation", { name: "App dock" }).getByRole("button", { name: "Open About_Me window", exact: true }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("button", { name: "Restore window", exact: true })).toBeVisible();
  expect((await appWindow.boundingBox()).width).toBeGreaterThan(1400);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.getByRole("button", { name: "Maximize window", exact: true })).toBeVisible();
  await expect.poll(async () => Math.round((await appWindow.boundingBox()).width)).toBe(1400);
});

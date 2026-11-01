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

test("boots as IMKAUNG and opens one About window", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "IMKAUNG", exact: true })).toBeVisible();
  await expect(page.getByText(/KAUNG_SPACE/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "View Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(1);
  await expect(page.getByRole("region", { name: / window$/ }).getByText("IMKAUNG OS · v2.0", { exact: true })).toBeVisible();
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

test("CV downloads as a PDF", async ({ page }) => {
  await visit(page);
  const download = page.waitForEvent("download");
  await page.getByRole("region", { name: / window$/ }).getByRole("link", { name: /Download CV/ }).click();
  expect((await download).suggestedFilename()).toBe("Kaung-Htet-Zaw-CV.pdf");
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

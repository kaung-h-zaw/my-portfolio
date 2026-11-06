import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    json: { current_weather: { temperature: 29, weathercode: 2 } },
  }));
});

const projects = [
  ["qut-research-platform", "Guinea Group Capstone"],
  ["tubeparty", "TubeParty"],
  ["linkfolio", "Linkfolio"],
  ["sendbook", "SendBook"],
];

for (const [id, title] of projects) {
  test(`${title} opens directly on first visit and survives refresh`, async ({ page }) => {
    await page.goto(`/#/projects/${id}`);
    const heading = page.getByRole("heading", { name: title, exact: true, level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toBeFocused();
    await expect(page).toHaveTitle(`${title} | KAUNG`);
    await expect(page.getByRole("button", { name: `Copy link to ${title}`, exact: true })).toBeVisible();
    if (id === "qut-research-platform") {
      await expect(page.getByText("Confidential client project. Screenshots, source code, and live demo links are private.", { exact: true })).toBeVisible();
      await expect(page.getByRole("img", { name: "Guinea Group Capstone application screenshot", exact: true })).toHaveCount(0);
      await expect(page.getByRole("link", { name: /Guinea Group Capstone (live demo|GitHub repository)/ })).toHaveCount(0);
      await expect(page.getByRole("heading", { name: "What the platform supports", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Tools for the research team", exact: true })).toBeVisible();
    }
    await page.reload();
    await expect(heading).toBeVisible();
    await page.getByRole("button", { name: "Back to projects", exact: true }).click();
    await expect(page).toHaveURL(/#\/projects$/);
    await expect(page.getByRole("button", { name: `View ${title} case study`, exact: true })).toBeFocused();
    expect(await page.locator(".os-content").evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  });
}

test("browser Back and Forward restore projects, sections, and closed windows", async ({ page }) => {
  await page.goto("/#/projects");
  await page.getByRole("button", { name: "View TubeParty case study", exact: true }).click();
  await expect(page).toHaveURL(/#\/projects\/tubeparty$/);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Project Archive", exact: true })).toBeVisible();
  await page.goForward();
  await expect(page.getByRole("heading", { name: "TubeParty", exact: true, level: 1 })).toBeVisible();
  await page.getByRole("button", { name: /^Choose section, current:/ }).click();
  await page.locator(".os-titlebar").getByRole("button", { name: /^Contact/ }).click();
  await expect(page.getByRole("heading", { name: "Get In Touch", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "TubeParty", exact: true, level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Close window", exact: true }).click();
  await expect(page).toHaveURL(/#\/home$/);
  await expect(page.getByRole("region", { name: / window$/ })).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole("heading", { name: "TubeParty", exact: true, level: 1 })).toBeVisible();
});

test("invalid project links recover without selector or decoding errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const slug of ["missing-project", "%E0%A4%A", "%22%5D"]) {
    await page.goto(`/#/projects/${slug}`);
    await expect(page.getByRole("heading", { name: "Project not found", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Back to projects", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Project Archive", exact: true })).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("project links copy the current host without tracking parameters", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async (text) => { window.copiedProjectUrl = text; },
    } });
  });
  await page.goto("/?utm_source=test#/projects/tubeparty");
  await page.getByRole("button", { name: "Copy link to TubeParty", exact: true }).click();
  await expect(page.getByText("Project link copied.", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.copiedProjectUrl)).toBe(`${new URL(page.url()).origin}/#/projects/tubeparty`);
});

test("blocked clipboard exposes a selectable project link", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
      writeText: async () => { throw new DOMException("Clipboard blocked", "NotAllowedError"); },
    } });
  });
  await page.goto("/#/projects/qut-research-platform");
  await page.getByRole("button", { name: "Copy link to Guinea Group Capstone", exact: true }).click();
  const link = page.getByRole("textbox", { name: "Guinea Group Capstone share link", exact: true });
  await expect(link).toHaveValue(page.url());
  await expect(link).toHaveAttribute("readonly", "");
});

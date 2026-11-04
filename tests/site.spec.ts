import { expect, test, type Page } from "@playwright/test";

async function noHorizontalOverflow(page: Page) {
  const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  expect(sw, "page should not scroll horizontally").toBeLessThanOrEqual(cw + 1);
}

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  return errors;
}

test.describe("homepage", () => {
  test("renders hero, sections and no errors", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Engineering reliable software");
    for (const id of ["career", "projects", "ai-studio", "arcade", "recruiters", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1); // also guards against duplicate IDs
    }
    await expect(page.getByRole("img", { name: /portrait|headshot/i })).toBeVisible();
    await noHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });

  test("no duplicate element IDs", async ({ page }) => {
    await page.goto("/");
    const dupes = await page.evaluate(() => {
      const seen = new Map<string, number>();
      document.querySelectorAll("[id]").forEach((el) => seen.set(el.id, (seen.get(el.id) ?? 0) + 1));
      return [...seen].filter(([, n]) => n > 1).map(([id]) => id);
    });
    expect(dupes).toEqual([]);
  });

  test("project filtering and search", async ({ page }) => {
    await page.goto("/");
    const count = page.getByTestId("project-count");
    await expect(count).toHaveText(/12 projects/);
    await page.locator("#projects").getByRole("button", { name: "Healthcare", exact: true }).click();
    await expect(count).toHaveText(/3 projects/);
    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.getByPlaceholder("Search by name, org or technology").fill("Spring Batch");
    await expect(count).toHaveText(/^1 project(?!s)/);
    await expect(page.locator("#projects").getByRole("heading", { name: "CFMS 2.0" })).toBeVisible();
    await page.getByPlaceholder("Search by name, org or technology").fill("zzzz-none");
    await expect(page.getByText("No projects match.")).toBeVisible();
  });

  test("card details expand with aria-expanded", async ({ page }) => {
    await page.goto("/");
    const btn = page.locator("#projects").getByRole("button", { name: "Technical details" }).first();
    await btn.scrollIntoViewIfNeeded();
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await btn.click();
    await expect(page.locator("#projects").getByRole("button", { name: "Hide details" }).first()).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("What I did").first()).toBeVisible();
  });

  test("AI studio scoring updates live", async ({ page }) => {
    await page.goto("/");
    await page.locator("#ai-studio").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("weighted-score")).toContainText("76");
    await expect(page.getByTestId("verdict")).toHaveText("Fail: below threshold");
    const sliders = page.locator("#ai-studio input[type=range]");
    for (let i = 0; i < 4; i++) await sliders.nth(i).fill("5");
    await expect(page.getByTestId("weighted-score")).toContainText("100");
    await expect(page.getByTestId("verdict")).toHaveText("Pass");
    await page.getByRole("button", { name: "Apply my evaluation" }).click();
    await expect(page.getByTestId("verdict")).toHaveText("Fail: correctness gate");
    await page.getByRole("tab", { name: "Agent trace" }).click();
    await page.getByRole("button", { name: "Diagnose the trace" }).click();
    await expect(page.getByText(/Correct total is 450 \+ 980 \+ 300/)).toBeVisible();
  });

  test("timeline is keyboard operable", async ({ page }) => {
    await page.goto("/");
    const item = page.locator("#career").getByRole("button", { name: /M\.S\. Information Technology/ });
    await item.focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#career").getByText(/3\.97/).filter({ visible: true }).first()).toBeVisible();
  });

  test("command palette opens with keyboard and navigates", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "keyboard shortcut is desktop-only");
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const input = page.getByRole("dialog").getByRole("textbox", { name: "Search" });
    await expect(input).toBeFocused();
    await input.fill("ibrace");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/case-studies\/ibrace\/$/);
  });

  test("mobile drawer opens, closes with Escape", async ({ page }, info) => {
    test.skip(!/phone|tablet/.test(info.project.name), "drawer is for small screens");
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const drawer = page.getByRole("navigation", { name: "Mobile" });
    await expect(drawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });
});

test.describe("motion and touch", () => {
  test("tilt is disabled under reduced motion", async ({ page }, info) => {
    test.skip(!/laptop|desktop/.test(info.project.name), "pointer test");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const card = page.locator(".v4-card").first();
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.move(box.x + box.width - 10, box.y + 20, { steps: 5 });
    await page.waitForTimeout(300);
    expect(await card.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
  });

  test("tilt responds to the pointer with normal motion", async ({ page }, info) => {
    test.skip(!/laptop|desktop/.test(info.project.name), "pointer test");
    await page.goto("/");
    const card = page.locator(".v4-card").first();
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.move(box.x + box.width - 10, box.y + 20, { steps: 8 });
    await page.waitForTimeout(400);
    const ry = await card.evaluate((el) => el.style.getPropertyValue("--ry"));
    expect(parseFloat(ry)).toBeGreaterThan(0.5);
  });
});

test.describe("other routes", () => {
  test("case studies index and every detail page", async ({ page }) => {
    await page.goto("/case-studies/");
    const links = await page.locator('main a[href^="/case-studies/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
    expect(links.length).toBe(12);
    for (const href of links) {
      const res = await page.goto(href);
      expect(res?.status(), href).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      for (const id of ["problem", "role", "architecture", "testing", "outcomes", "lessons", "related"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
      await noHorizontalOverflow(page);
    }
  });

  test("architecture diagram nodes are selectable by keyboard", async ({ page }) => {
    await page.goto("/case-studies/ibrace/");
    const node = page.getByRole("button", { name: /PostgreSQL \+ RLS/ });
    await node.focus();
    await page.keyboard.press("Enter");
    await expect(node).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Row-level security policies enforce role boundaries.")).toBeVisible();
  });

  test("arcade lists all 16 games and opens one", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/arcade/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Arcade");
    for (const g of ["Star Catcher", "Block Drop", "Lua Lander", "Snake.lua"]) await expect(page.locator("#library").getByText(g).first()).toBeVisible();
    await expect(page.locator("#library canvas, #cabinet canvas").first()).toBeVisible();
    expect(errors.filter((e) => !/AudioContext|autoplay/i.test(e))).toEqual([]);
  });

  test("resume page renders from data", async ({ page }) => {
    await page.goto("/resume/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Adi Narayana Manga");
    await expect(page.getByText("Tata Consultancy Services").first()).toBeVisible();
    await expect(page.getByText(/GPA 3\.97/)).toBeVisible();
    await noHorizontalOverflow(page);
  });

  test("legacy routes forward", async ({ page }) => {
    await page.goto("/dashboard/");
    await expect(page).toHaveURL(/\/arcade\/$/);
    await page.goto("/portfolio-preview/");
    await expect(page).toHaveURL(/localhost:4173\/$/);
  });

  test("manifest is the professional identity", async ({ request }) => {
    const m = await (await request.get("/manifest.json")).json();
    expect(m.name).toContain("Adi Narayana Manga");
    expect(m.name).not.toMatch(/Solar2D/);
    expect(m.start_url).toBe("/");
    for (const icon of m.icons) expect((await request.get(icon.src)).status()).toBe(200);
    const sw = await (await request.get("/service-worker.js")).text();
    expect(sw).toContain("portfolio-v4");
    expect(sw).not.toContain("icon_arcade");
  });

  test("internal links resolve", async ({ page, request }, info) => {
    test.skip(info.project.name !== "desktop-1440", "run once");
    const pages = ["/", "/case-studies/", "/arcade/", "/resume/"];
    const hrefs = new Set<string>();
    for (const p of pages) {
      await page.goto(p);
      for (const h of await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) hrefs.add(h.split("#")[0] || "/");
    }
    for (const h of hrefs) expect((await request.get(h)).status(), h).toBe(200);
  });
});

import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against the real static export in ./out (build first: `npm run build`).
 * Locally you can point at an installed Chrome with PW_CHROME_PATH=/path/to/chrome.
 */
const executablePath = process.env.PW_CHROME_PATH || undefined;
const chromium = { ...devices["Desktop Chrome"], launchOptions: { executablePath, args: ["--no-sandbox"] } };

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: "http://localhost:4173", trace: "retain-on-failure" },
  webServer: {
    command: "npx serve out -l 4173 --no-clipboard",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "unit", testMatch: /unit\.spec\.ts/ },
    { name: "phone-390", testIgnore: /unit\.spec\.ts/, use: { ...chromium, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } },
    { name: "tablet-768", testIgnore: /unit\.spec\.ts/, use: { ...chromium, viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: "laptop-1280", testIgnore: /unit\.spec\.ts/, use: { ...chromium, viewport: { width: 1280, height: 800 } } },
    { name: "desktop-1440", testIgnore: /unit\.spec\.ts/, use: { ...chromium, viewport: { width: 1440, height: 900 } } },
  ],
});

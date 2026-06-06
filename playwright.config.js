const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  // Spin up a tiny static server for the duration of the tests.
  webServer: {
    command: 'npx --yes serve -l 5173 .',
    url: 'http://localhost:5173/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1500, height: 1000 } } },
    { name: 'mobile',  use: { ...devices['Pixel 7'] } },
  ],
});

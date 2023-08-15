import { defineConfig, devices } from '@playwright/test';

import { testConfig } from './tests/testConfig';

const ENV = process.env.npm_config_ENV;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
	console.log(
		`Please provide a correct environment value like "npx cross-env ENV=qa|dev|qaApi|devApi"`
	);
	process.exit();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	/* Global Setup to run before all tests */
	globalSetup: './tests/globalSetup',
	/* Global Teardown to run before all tests */
	globalTeardown: './tests/globalTeardown',
	/* Look for test files in the "tests" directory, relative to this configuration file. */
	testDir: './tests/e2e',
	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: './test-results',
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [
		// ['line'],
		[`./tests/customReporterConfig.ts`],
		[`allure-playwright`],
		[`html`, { outputFolder: 'html-report', open: 'never' }],
	],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},
	/* Configure projects for major browsers */
	projects: [
		// {
		// 	name: 'chromium',
		// 	use: { ...devices['Desktop Chrome'] },
		// },
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: `Chrome`,
			use: {
				// Configure the browser to use.
				browserName: `chromium`,
				// Chrome Browser Config
				channel: `chrome`,
				// Picks Base Url based on User input
				baseURL: testConfig[ENV],
				// Browser Mode
				headless: false,
				// Browser height and width
				viewport: { width: 1500, height: 730 },
				ignoreHTTPSErrors: true,
				// Enable File Downloads in Chrome
				acceptDownloads: true,
				// Artifacts
				screenshot: `only-on-failure`,
				video: `retain-on-failure`,
				trace: `retain-on-failure`,
				// Slows down execution by ms
				launchOptions: {
					slowMo: 0,
				},
			},
		},
		{
			name: `Chromium`,
			use: {
				browserName: `chromium`,
				baseURL: testConfig[ENV],
				headless: true,
				viewport: { width: 1500, height: 730 },
				ignoreHTTPSErrors: true,
				acceptDownloads: true,
				screenshot: `only-on-failure`,
				video: `retain-on-failure`,
				trace: `retain-on-failure`,
				launchOptions: {
					slowMo: 0,
				},
			},
		},
		{
			name: `Firefox`,
			use: {
				browserName: `firefox`,
				baseURL: testConfig[ENV],
				headless: true,
				viewport: { width: 1500, height: 730 },
				ignoreHTTPSErrors: true,
				acceptDownloads: true,
				screenshot: `only-on-failure`,
				video: `retain-on-failure`,
				trace: `retain-on-failure`,
				launchOptions: {
					slowMo: 0,
				},
			},
		},
		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],
	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});

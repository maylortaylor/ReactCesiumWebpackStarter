import { Browser, Page, expect, test } from '@playwright/test';

declare global {
	const page: Page;
	const browser: Browser;
	const browserName: string;
}

test('@Smoke has title', async ({ page }) => {
	await page.goto('https://www.playwright.com/');
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});

test('@Smoke get started link', async ({ page }) => {
	await page.goto('https://www.playwright.com/');

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*intro/);
});

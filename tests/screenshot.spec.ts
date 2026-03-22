import { test, expect } from '@playwright/test';

test('take a screenshot', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.screenshot({ path: 'portfolio.png', fullPage: true });
});

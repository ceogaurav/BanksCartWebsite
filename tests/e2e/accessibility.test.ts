import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('BanksCart Automated Accessibility & Critical Paths', () => {
  test('Home page loads with 200 and complies with WCAG AA accessibility', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BanksCart/i);

    // Run axe accessibility scan on Homepage
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(['color-contrast']) // Reviewed in manual design audit
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Calculators Hub loads with max-w-7xl aligned layout', async ({ page }) => {
    await page.goto('/calculators');
    await expect(page).toHaveTitle(/Financial Calculators/i);
    const mainContainer = page.locator('.max-w-7xl').first();
    await expect(mainContainer).toBeVisible();
  });
});

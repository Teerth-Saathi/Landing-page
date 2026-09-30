import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Teerth Yatra',
    );
    await expect(page.locator('.hero-image img')).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator('#interest').scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.screenshot({
      path: `test-results/site-${width}.png`,
      fullPage: true,
    });
  });
}
async function fillForm(page: import('@playwright/test').Page) {
  await page.getByLabel('Full Name').fill('Test Traveller');
  await page.getByLabel('Phone / WhatsApp Number').fill('9876543210');
  await page.getByLabel('City / Area').fill('Delhi');
  await page.getByLabel('Number of Travellers').selectOption('2');
  await page.getByLabel('Travelling With').selectOption('Family');
  await page.getByLabel('Comfortable Budget').selectOption('₹4,000–₹5,000');
  await page.getByLabel('Comfortable travel', { exact: true }).check();
  await page.getByLabel('Interest Level').selectOption('Definitely interested');
  await page.getByRole('checkbox', { name: /I agree to be contacted/ }).check();
}
test('mobile menu, FAQs and journey navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'FAQs', exact: true })
    .click();
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toHaveCount(0);
  await page
    .locator('summary', { hasText: 'Is ₹5,000 the confirmed price?' })
    .click();
  await expect(
    page.getByText('No. Expected around ₹5,000', { exact: false }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Explore the journey' }).click();
  await expect(page).toHaveURL(/journeys\/mathura-vrindavan/);
});
test('successful submission renders only after server confirms saving (mock)', async ({
  page,
}) => {
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 201,
      json: {
        ok: true,
        message:
          "Thank you. You're now on the TeerthSaathi priority list. We'll contact you when the founding journey opens.",
      },
    }),
  );
  await page.goto('/');
  await fillForm(page);
  await page.getByRole('button', { name: 'Join the Priority List' }).click();
  await expect(
    page.getByRole('heading', { name: 'You’re on the list.' }),
  ).toBeVisible();
});
test('unavailable storage keeps user data and offers WhatsApp (mock)', async ({
  page,
}) => {
  await page.route('**/api/leads', (route) =>
    route.fulfill({
      status: 503,
      json: {
        ok: false,
        message: 'Our interest form is temporarily unavailable.',
      },
    }),
  );
  await page.goto('/');
  await fillForm(page);
  await page.getByRole('button', { name: 'Join the Priority List' }).click();
  await expect(
    page
      .getByRole('alert')
      .filter({ hasText: 'Our interest form is temporarily unavailable.' }),
  ).toBeVisible();
  await expect(page.getByLabel('Full Name')).toHaveValue('Test Traveller');
  await expect(
    page.getByRole('link', { name: 'Register on WhatsApp' }),
  ).toHaveAttribute('href', /wa.me\/918851155104/);
});
test('API rejects malformed, unconsented and cross-origin requests', async ({
  request,
}) => {
  expect((await request.post('/api/leads', { data: {} })).status()).toBe(400);
  expect(
    (
      await request.post('/api/leads', {
        data: 'invalid',
        headers: { 'Content-Type': 'application/json' },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post('/api/leads', {
        data: {},
        headers: { origin: 'https://untrusted.example' },
      })
    ).status(),
  ).toBe(403);
});

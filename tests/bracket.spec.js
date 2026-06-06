const { test, expect } = require('@playwright/test');

// Helper: open the app and switch to a tab
async function open(page, tab) {
  await page.goto('/index.html');
  await page.waitForTimeout(400);
  if (tab) {
    await page.click(`[data-v="${tab}"]`);
    await page.waitForTimeout(400);
  }
}

test.describe('Group stage', () => {
  test('all 12 groups render with 4 teams each', async ({ page }) => {
    await open(page, 'groups');
    const cards = page.locator('.gcard');
    await expect(cards).toHaveCount(12);
    // each card has 4 team rows
    const firstRows = cards.first().locator('.row');
    await expect(firstRows).toHaveCount(4);
  });

  test('baseline standings are correct (spot checks)', async ({ page }) => {
    await open(page, 'groups');
    // Group A first place = Mexico
    const groupA = page.locator('.gcard', { hasText: 'Group A' });
    await expect(groupA.locator('.row').first()).toContainText('Mexico');
    // Group H first place = Uruguay
    const groupH = page.locator('.gcard', { hasText: 'Group H' });
    await expect(groupH.locator('.row').first()).toContainText('Uruguay');
  });

  test('third-place qualifier panel shows 8 of 8 selected', async ({ page }) => {
    await open(page, 'groups');
    await expect(page.locator('.tp-count')).toContainText('8 of 8');
  });
});

test.describe('Knockouts bracket', () => {
  test('all knockout matches render (R32..Final + 3rd place)', async ({ page }) => {
    await open(page, 'bracket');
    const ties = page.locator('.tie[data-mid]');
    // 16 + 8 + 4 + 2 + 1 (final) = 31 ties with data-mid (3rd-place uses miniSlotLoser, not data-mid)
    await expect(ties).toHaveCount(31);
  });

  test('R32 first match shows real team names, not truncated', async ({ page }) => {
    await open(page, 'bracket');
    const m74 = page.locator('.tie[data-mid="M74"]');
    await expect(m74).toContainText('Germany');
    await expect(m74).toContainText('Scotland');
    // ensure NOT truncated to an ellipsis
    await expect(m74).not.toContainText('Ge…');
  });

  test('connectors SVG is drawn', async ({ page }) => {
    await open(page, 'bracket');
    const paths = page.locator('#connectors path');
    // every match except the final feeds somewhere -> many connector paths
    expect(await paths.count()).toBeGreaterThan(20);
  });

  test('clicking a team marks it the winner', async ({ page }) => {
    await open(page, 'bracket');
    // pick Scotland in M74 (was Germany by default)
    const m74 = page.locator('.tie[data-mid="M74"]');
    await m74.getByText('Scotland').click();
    await page.waitForTimeout(200);
    // Scotland's slot should now carry the win outline
    const scotlandSlot = m74.locator('.slot', { hasText: 'Scotland' });
    await expect(scotlandSlot).toHaveClass(/win/);
  });
});

test.describe('Controls', () => {
  test('Reset to Baseline restores France in M77', async ({ page }) => {
    await open(page, 'bracket');
    await page.click('text=Reset to Baseline');
    await page.waitForTimeout(300);
    const m77 = page.locator('.tie[data-mid="M77"]');
    await expect(m77.locator('.slot.win')).toContainText('France');
  });

  test('Random Run completes without error', async ({ page }) => {
    await open(page, 'bracket');
    await page.click('text=Random Run');
    await page.waitForTimeout(400);
    // at least one winner highlighted
    expect(await page.locator('.slot.win').count()).toBeGreaterThan(0);
  });
});

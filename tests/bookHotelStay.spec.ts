import { test } from '@playwright/test';
import { HomePage } from '../src/pages/homePage';

test('Reserve Double Room for 2 Nights', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.reserveDoubleRoomWithDynamicDates(page);
});

test('Use Send us a Message form', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.sendAMessage(page);
});

test('Attempt to login as Admin User', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.attemptAdminLogin(page);
})

test('Homepage should load within 2 seconds and render key content', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.testHomepagePerformance(page);
});

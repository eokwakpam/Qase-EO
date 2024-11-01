import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test.describe('Test suite', () => {
  // This test will fail intentionally, with a screenshot captured on failure
  test('Test with failure and screenshot', async ({ page }) => {
    // Set Qase fields for the test case
    qase.fields({ severity: 'critical', priority: 'high' });
    
    // Test logic that will cause the test to fail
    await page.goto('https://example.com'); // Example URL for the test context
    
    // Intentionally failing assertion
    try {
      expect(await page.textContent('h1')).toBe('Nonexistent Text');
    } catch (error) {
      // Capture a screenshot on failure
      await page.screenshot({ path: 'failed_test_screenshot.png' });
      throw error; // Re-throw the error to mark the test as failed
    }
  });
});

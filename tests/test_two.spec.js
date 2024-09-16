import { qase } from 'playwright-qase-reporter';
const { test, expect } = require('@playwright/test');

test.describe('Test suite', () => {
  test('Simple test', () => {
    qase.id(396);
    qase.title('Example of simple test');
    expect(true).toBe(true);
  });

  test('Test with annotated fields', () => {
    qase.id(398);
    qase.fields({ 'severity': 'high', 'priority': 'medium' });
    expect(true).toBe(true);
  });

  test(qase(2, 'This syntax is still supported'), () => {
    expect(true).toBe(true);
  });

  test('Running, but not reported to Qase', () => {
    qase.ignore();
    expect(true).toBe(true);
  });

  test('Test with steps', async () => {
    await test.step('Step 1', async () => {
      expect(true).toBe(true);
    });
    await test.step('Step 2', async () => {
      expect(true).toBe(true);
    });
    expect(true).toBe(true);
  });

  test.skip(qase(14, 'Skipped test with Qase ID'), () => {
    expect(true).toBe(true);
  });

  // New test case not attached to an existing one
  test('New test case: Search for an order by order number', async ({ page }) => {
    qase.title('Search for an order by order number');
    qase.fields({
      'severity': 'critical',
      'priority': 'high',
      'layer': 'integration',
      'description': 'Verify that a user can search for an order using the order number',
    });

    await test.step('Navigate to order search page', async () => {
      await page.goto('https://example.com/orders');
    });

    await test.step('Fill in the order number', async () => {
      await page.fill('input[name="orderNumber"]', '123456');
    });

    await test.step('Click the search button', async () => {
      await page.click('text=Search');
    });

    await test.step('Verify the order details are displayed', async () => {
      const orderDetails = await page.textContent('.order-details');
      expect(orderDetails).toContain('Order Number: 123456');
    });
  });
});

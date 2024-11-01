import { qase } from 'playwright-qase-reporter';
const { test, expect } = require('@playwright/test');

test.describe('Test suite with failing test cases', () => {
  
  test('Simplified test that passes', () => {
    qase.title('This test will pass');
    expect(true).toBe(true); // Pass
  });

  test('Testing with annotated fields that fails', () => {
    qase.fields({ 'severity': 'critical', 'priority': 'high' });
    expect(true).toBe(false); // Fail
  });

  test('Tests that fails with incorrect expectation', () => {
    qase.title('Failing due to wrong expectation');
    expect(5).toBe(10); // Fail
  });

  test('Running, but still not reported to Qase', () => {
    qase.ignore();
    expect(true).toBe(false); // This will fail but won't be reported
  });

  test('Test without failing steps', async () => {
    await test.step('Step 1', async () => {
      expect(true).toBe(true); // Pass
    });
    await test.step('Step 2', async () => {
      expect(true).toBe(false); // Fail in this step
    });
    expect(true).toBe(true); // Pass but overall test fails due to Step 2
  });

});

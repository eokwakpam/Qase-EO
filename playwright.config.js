require('dotenv').config();

const config = {
  use: {
    screenshot: 'on', // Capture screenshots for all tests
    video: 'on',      // Capture videos for all tests
    trace: 'on',      // Capture trace logs for all tests
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: true,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN, // It's good practice to use environment variables for tokens
          },
          project: process.env.QASE_TESTOPS_PROJECT,   // Use environment variables for project code
          uploadAttachments: true,
          run: {
            id: process.env.QASE_RUN_ID,
            complete: true,
          },
        },
      },
    ],
  ],
  testDir: './tests', // Directory where your tests are located
  testMatch: ['!tests/test_three.spec.js'], // Exclude test_three.spec.js
};

module.exports = config;

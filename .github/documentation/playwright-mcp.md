# Playwright MCP Server

## ABOUTME: Complete guide for using the Playwright MCP server for browser automation and E2E testing
## ABOUTME: Includes testing patterns, debugging techniques, and best practices for reliable test automation

The Playwright MCP server provides powerful browser automation and end-to-end testing capabilities, enabling developers to test their implementations in real browser environments.

## Overview

The Playwright MCP server allows developers to:
- Run automated browser tests across multiple browsers
- Test component implementations in real environments
- Debug issues with visual feedback
- Perform cross-browser compatibility testing
- Automate user interaction testing

## Core Principles

### 1. Real Browser Testing
- Test components in actual browser environments
- Verify functionality across different browsers (Chrome, Firefox, Safari)
- Ensure responsive design works correctly
- Test accessibility features with real assistive technologies

### 2. MCP Server Integration
- **Always use the `playwright-mcp` server** instead of direct Playwright package
- Leverage server capabilities for enhanced testing features
- Maintain consistent testing patterns across projects
- Integrate with existing development workflows

### 3. Test Reliability
- Write deterministic tests that pass consistently
- Use proper waiting strategies for dynamic content
- Implement robust element selection patterns
- Handle asynchronous operations correctly

## Getting Started

### Prerequisites
Before using the Playwright MCP server:

1. **Verify Server Status**: Always ask the user if the server is running
2. **Server Configuration**: Ensure proper MCP server setup
3. **Browser Installation**: Verify required browsers are installed
4. **Test Environment**: Set up appropriate test data and environments

### Server Connection
```typescript
// ✅ DO: Use the playwright-mcp server
const playwright = await connectToMCPServer('playwright-mcp');

// ❌ AVOID: Direct Playwright package usage
import { chromium } from 'playwright'; // Don't do this
```

## Testing Patterns

### Component Testing
```typescript
// Test component rendering and functionality
await playwright.test('Button component renders correctly', async ({ page }) => {
  await page.goto('/components/button');
  
  // Test visual rendering
  const button = page.getByRole('button', { name: 'Primary Button' });
  await expect(button).toBeVisible();
  
  // Test interaction
  await button.click();
  await expect(page.getByText('Button clicked')).toBeVisible();
});
```

### User Journey Testing
```typescript
// Test complete user workflows
await playwright.test('User can complete checkout process', async ({ page }) => {
  // Navigate to product page
  await page.goto('/products/example-product');
  
  // Add to cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Proceed to checkout
  await page.getByRole('link', { name: 'Checkout' }).click();
  
  // Fill checkout form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Name').fill('Test User');
  
  // Complete purchase
  await page.getByRole('button', { name: 'Complete Order' }).click();
  
  // Verify success
  await expect(page.getByText('Order confirmed')).toBeVisible();
});
```

### Accessibility Testing
```typescript
// Test accessibility compliance
await playwright.test('Page meets accessibility standards', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Test keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button').first()).toBeFocused();
  
  // Test screen reader compatibility
  const accessibleName = await page.getByRole('main').getAttribute('aria-label');
  expect(accessibleName).toBeTruthy();
  
  // Test color contrast (if supported)
  await expect(page.locator('.primary-button')).toHaveCSS('background-color', 'rgb(0, 122, 204)');
});
```

## Best Practices

### Element Selection
```typescript
// ✅ DO: Use semantic selectors
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email address')
page.getByText('Welcome message')

// ❌ AVOID: Brittle CSS selectors
page.locator('.btn-primary-submit-form')
page.locator('#email-input-field-id')
```

### Waiting Strategies
```typescript
// ✅ DO: Use appropriate waiting strategies
await page.waitForLoadState('networkidle');
await expect(page.getByText('Loading complete')).toBeVisible();

// ✅ DO: Wait for specific conditions
await page.waitForFunction(() => window.dataLoaded === true);

// ❌ AVOID: Fixed timeouts
await page.waitForTimeout(5000); // Unreliable
```

### Test Data Management
```typescript
// ✅ DO: Use test-specific data
const testUser = {
  email: `test-${Date.now()}@example.com`,
  name: 'Test User'
};

// ✅ DO: Clean up after tests
await playwright.test.afterEach(async ({ page }) => {
  // Clean up test data
  await page.evaluate(() => localStorage.clear());
});
```

## Common Testing Scenarios

### 1. Form Validation Testing
```typescript
await playwright.test('Form validation works correctly', async ({ page }) => {
  await page.goto('/contact-form');
  
  // Test empty form submission
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  
  // Test invalid email
  await page.getByLabel('Email').fill('invalid-email');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Please enter a valid email')).toBeVisible();
  
  // Test successful submission
  await page.getByLabel('Email').fill('valid@example.com');
  await page.getByLabel('Message').fill('Test message');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Message sent successfully')).toBeVisible();
});
```

### 2. Responsive Design Testing
```typescript
await playwright.test('Component is responsive', async ({ page }) => {
  await page.goto('/components/navigation');
  
  // Test desktop view
  await page.setViewportSize({ width: 1200, height: 800 });
  await expect(page.getByRole('navigation')).toHaveCSS('display', 'flex');
  
  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
  
  // Test tablet view
  await page.setViewportSize({ width: 768, height: 1024 });
  // Add tablet-specific assertions
});
```

### 3. Performance Testing
```typescript
await playwright.test('Page loads within performance budget', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000); // 3 second budget
  
  // Test Core Web Vitals if supported
  const metrics = await page.evaluate(() => performance.getEntriesByType('navigation'));
  expect(metrics[0].loadEventEnd - metrics[0].fetchStart).toBeLessThan(2000);
});
```

## Debugging and Troubleshooting

### Visual Debugging
```typescript
// Take screenshots for debugging
await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });

// Record video for complex interactions
const context = await browser.newContext({
  recordVideo: { dir: 'test-videos/' }
});
```

### Console Logging
```typescript
// Monitor console messages
page.on('console', msg => console.log('Browser console:', msg.text()));

// Capture JavaScript errors
page.on('pageerror', error => console.log('Page error:', error.message));
```

### Network Monitoring
```typescript
// Monitor network requests
page.on('request', request => {
  console.log('Request:', request.method(), request.url());
});

page.on('response', response => {
  console.log('Response:', response.status(), response.url());
});
```

## Integration with Development Workflow

### Pre-commit Testing
```typescript
// Run critical path tests before commits
const criticalTests = [
  'User can log in',
  'Payment processing works',
  'Data saves correctly'
];

// Automated testing in CI/CD pipeline
```

### Development Testing
```typescript
// Test component implementations during development
await playwright.test('New feature works as expected', async ({ page }) => {
  await page.goto('/feature-branch-preview');
  // Test new functionality
});
```

## Configuration and Setup

### MCP Server Configuration
```json
{
  "playwright-mcp": {
    "enabled": true,
    "browsers": ["chromium", "firefox", "webkit"],
    "headless": false,
    "slowMo": 100
  }
}
```

### Test Environment Setup
```typescript
// Test configuration
const testConfig = {
  baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
  timeout: 30000,
  retries: 2,
  workers: process.env.CI ? 1 : 3
};
```

## Error Handling and Recovery

### Graceful Failure Handling
```typescript
await playwright.test('Handles errors gracefully', async ({ page }) => {
  try {
    await page.goto('/might-fail');
    // Test primary scenario
  } catch (error) {
    // Handle expected failures
    console.log('Expected failure scenario');
    await page.goto('/fallback-page');
    // Test fallback scenario
  }
});
```

### Retry Strategies
```typescript
// Implement custom retry logic for flaky operations
const retryOperation = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(1000 * (i + 1)); // Exponential backoff
    }
  }
};
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](../prompts/testing.prompt.md)
- [Accessibility Testing Guide](https://playwright.dev/docs/accessibility-testing)
- [Performance Testing Patterns](../prompts/docs/react-optimization.md)

---

For questions or issues with Playwright MCP integration, refer to the main [TypeScript instructions](../typescript.instructions.md) or reach out to [Aditya Sharma](mailto:aditya.sharma@microsoft.com).

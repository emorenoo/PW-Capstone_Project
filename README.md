# PW-Capstone_Project

Test automation framework for [Automation Exercise](https://automationexercise.com/), built with Playwright Test, TypeScript, and npm. It includes UI and API tests, cross-browser configuration, HTML reports, and debugging tools.

## Requirements

- Node.js 20 or later
- npm

## Installation

From the project directory:

```powershell
npm install
npx playwright install
```

On Linux CI, you can also install the system dependencies required by the browsers:

```bash
npx playwright install --with-deps
```

## Configuration

The default base URL is `https://automationexercise.com`. Override it by setting `BASE_URL`.

The login, logout, and cart flows require a test account. Define `EMAIL` and `PASSWORD` as environment variables or in a local `.env` file:

```dotenv
BASE_URL=https://automationexercise.com
EMAIL=test-account@example.com
PASSWORD=your-test-password
```

The `.env` file is excluded from Git; do not commit real credentials to the repository. The API test that creates, retrieves, and deletes an account generates its own unique email and does not depend on these credentials.

You can also set the variables for the current PowerShell session:

```powershell
$env:EMAIL = "test-account@example.com"
$env:PASSWORD = "your-test-password"
$env:BASE_URL = "https://automationexercise.com"
```

## Architecture and Design Decisions

### Page Object Model

Classes in `pages/` encapsulate page locators and actions. Tests describe user flows and delegate interactions to these objects. This separation reduces duplication and makes it possible to update selectors without rewriting each test.

Accessible locators such as `getByRole`, `getByLabel`, and `getByText` are preferred. When the page does not provide a suitable option, stable attributes such as `data-qa` or specific CSS selectors are used.

### Fixtures

`fixtures/FixtureBase.ts` extends Playwright's standard test fixture and creates Page Objects using each test's `page` instance. Playwright manages the lifecycle of the page and browser context; tests request only the objects they need.

### Tests and Test Data

- `tests/` contains the `.spec.ts` files discovered by Playwright.
- `testdata/` separates contact form data from test logic and allows the same flow to run with multiple data sets.
- `utils/` contains shared utilities, such as the unique email generator used for registration and `blockThirdPartyAds.ts`, which aborts requests to selected third-party ad domains in the UI tests.
- `tests/testApi.spec.ts` uses Playwright's `request` fixture to call the real account creation (API 11), user lookup (API 14), and account deletion (API 12) endpoints. The account is deleted in a `finally` block to avoid leaving test data behind if an assertion fails after account creation.

The API test is an integration test against the real service; it does not mock application API responses. The ad helper intercepts and aborts selected third-party ad requests to reduce UI-test interference; it is not an API mock.

### Synchronization

Interactions rely on Playwright's auto-waiting. Web-first assertions such as `expect(locator).toBeVisible()` and `expect(locator).toHaveCount()` are preferred for validating state changes instead of fixed delays. Product search navigates directly to `/products`, then waits for the search field; this avoids depending on a menu click when the external site displays overlays. Cart removal is checked against the Men Tshirt row. The checkout dialog title uses an exact-text locator to avoid matching other checkout-related text.

### Browsers and Isolation

`playwright.config.ts` defines Chromium, Firefox, and WebKit projects. By default, each test receives its own browser context. A single worker is configured because some flows use the same external account, and that account's cart can persist between runs.

The configuration sets `BASE_URL`, prevents `test.only` from running in CI, and enables two retries when `CI` is set. Tests are not retried locally by default.

## Running the Tests

```powershell
npm test
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:headed
npm run test:ui
npm run test:debug
```

To run only the API tests:

```powershell
npx playwright test tests/testApi.spec.ts
```

To check TypeScript types:

```powershell
npx tsc --noEmit
```

## Reports and Debugging

Test results are printed to the console and an HTML report is generated:

```powershell
npm run report
```

The report is saved in `playwright-report/`. Test results and debugging artifacts are saved in `test-results/`. The configuration captures a screenshot for every test, retains video on failure, and records traces on the first retry. In CI, open an available trace with:

```powershell
npx playwright show-trace test-results/<test-folder>/trace.zip
```

The GitHub Actions workflow in `.github/workflows/playwright.yml` installs dependencies and browsers, runs the suite, and publishes the report as an artifact.

## Adding or Updating Tests

Save new tests as `*.spec.ts` files in `tests/`. For UI flows, reuse or extend the Page Objects and their fixtures. Keep variable test data in `testdata/` and shared functions in `utils/`.

To explore selectors and interactions:

```powershell
npm run codegen
```

## Current Scope and Next Steps

The project covers registration, login/logout, cart operations, checkout, contact, and APIs 11, 14, and 12. Cross-browser execution is configured; compatibility should be confirmed by running the suite in each browser.

The most recent reported run before the exact checkout-title locator update had two failures: Firefox remained on the login form during cart-test setup, and WebKit encountered an ambiguous checkout text locator. The WebKit locator was narrowed and TypeScript compilation passed afterward, but the affected browser tests have not yet been rerun. Confirm the test account credentials and status if Firefox still remains on the login form.

Accessibility automation with axe-core and visual regression tests have not been implemented yet. `.vscode/mcp.json` configures the Playwright MCP server for exploration from VS Code; its configuration does not replace tests or validation of generated code.

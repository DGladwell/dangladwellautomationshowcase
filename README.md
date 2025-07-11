# 🧪 Automation Showcase

This project demonstrates test automation skills using [Playwright](https://playwright.dev/) and TypeScript.

It includes both functional (UI) and non-functional tests against the sample website: [https://automationintesting.online](https://automationintesting.online)

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm
- Git

### Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/DGladwell/dangladwellautomationshowcase.git
cd dangladwellautomationshowcase

# 2. Install Playwright and dependencies
npm init playwright@latest
npm install -D @playwright/test
npx playwright install
```

---

## 🚀 Running Tests

To run **all tests**:
```bash
npx playwright test
```

To run a **specific test file**:
```bash
npx playwright test tests/bookHotelStay.spec.ts
```

To run tests in **headed mode** (visible browser):
```bash
npx playwright test --headed
```

---

## 🧠 Design Approach

- **Framework:** Playwright with TypeScript for fast, modern browser automation.
- **Modular Structure:** Tests are grouped and named clearly by feature.
- **Non-Functional Focus:** Includes a lightweight performance test (page load time).
- **Time Efficiency:** Framework and tests created in approx. 2 hours to simulate real-world assessment constraints.

---

## 🧠 Test Plan

### Objective
Validate the critical customer-facing functionality of [https://automationintesting.online](https://automationintesting.online) using automated tests with Playwright and TypeScript. This includes key user interactions and a basic non-functional check of page performance.

### Scope
- Core functional user journeys (booking and messaging)
- Basic security (unauthorised login attempt)
- Non-functional performance (page load speed)

### Test Scenarios
| ID    | Test Description                                      | Type            | Priority |
|-------|-------------------------------------------------------|-----------------|----------|
| TC01  | Book a double room via the booking form (end-to-end)  | Functional (UI) | High     |
| TC02  | Use the Send a Message form to contact the B&B staff  | Functional (UI) | High     |
| TC03  | Attempt to log in as an admin with invalid credentials| Functional (UI) | Medium   |
| TC04  | Measure load time of the main landing page (TTFB check)| Non-functional  | Medium   |

### Tools & Framework
- **Language:** TypeScript
- **Framework:** Playwright
- **Runner:** Playwright Test Runner
- **Environment:** Public site at [https://automationintesting.online](https://automationintesting.online)
- **Execution:** Local with optional headless/headed modes

### Assumptions & Constraints
- The site is a static demo and does not retain form data or booking requests.
- The admin login functionality is non-functional or placeholder (unauthorised login is expected).
- Performance test is simplified and limited to single-metric collection (Time to First Byte).

---

# 🐞 Bug Report

## Summary

The **"Amenities"** navigation button does not function as expected. Clicking the button updates the URL to include `#amenities`, but no visible section or content is displayed, and the page does not scroll or update accordingly.

---

## Steps to Reproduce

1. Navigate to [https://automationintesting.online](https://automationintesting.online)
2. Click the **Amenities** button in the top navigation menu

---

## Expected Result

The page should scroll to or reveal a section titled **"Amenities"** containing relevant content about the B&B's amenities.

---

## Actual Result

- The browser URL updates to:  
  `https://automationintesting.online/#amenities`
- No visible change occurs on the page
- There is no **"Amenities"** section present in the UI, even after scrolling manually

---

## Impact

- Poor user experience due to non-functional navigation
- Potential accessibility/navigation issue
- Possible content omission if the section is missing entirely

---

## Severity

**Medium**  
(Impacts site navigation and may indicate a missing or broken content section)

---

## Environment

- **Browser:** Chrome 125.0.6422.142
- **OS:** macOS Sonoma
- **Device:** Desktop

---

## Notes

- Other navigation buttons (e.g., "Rooms", "Contact") behave as expected

---

## 🔧 Additional Notes: Booking System Issues

During testing, sporadic **500 Internal Server Errors** were encountered when attempting to book rooms. These errors occur when the system attempts to book dates that may already be reserved, and the backend does not handle this gracefully.

**With additional time beyond the 2-hour assessment window, I would:**

1. **Implement comprehensive logging** to capture the exact request/response data when 500 errors occur
2. **Add test data cleanup** to ensure a clean state for each test run
3. **Create a booking availability checker** to verify dates before attempting to book
4. **Implement retry logic** with exponential backoff for transient server errors
5. **Add detailed error reporting** to help identify patterns in the 500 errors
6. **Coordinate with the backend team** to improve error handling for booking conflicts

The current implementation includes basic error handling as a fallback, but with more time and development it would be ideal to implement more robust debugging and error recovery mechanisms.

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

To run tests in **parallel**:
```bash
npx playwright test --workers=4
```

---

## 🧠 Design Approach

- **Framework:** Playwright with TypeScript for fast, modern browser automation.
- **Modular Structure:** Tests are grouped and named clearly by feature.
- **Non-Functional Focus:** Includes a lightweight performance test (page load time).
- **Time Efficiency:** Framework and tests created in approx. 2 hours to simulate real-world assessment constraints.

---

If you have any questions or suggestions, feel free to open an issue or contact me!

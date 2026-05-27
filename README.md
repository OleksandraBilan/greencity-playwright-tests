# GreenCity Automated Testing Project

Automated testing project for GreenCity Web Application using Playwright, TypeScript, Page Object Model and Allure Report.

---

## Project Stack

- Playwright
- TypeScript
- Node.js
- Allure Report

---

# Project Structure

```bash
├── components/
├── fixtures/
├── pages/
├── test-data/
├── tests/
├── utils/
├── playwright.config.ts
├── package.json
└── README.md
```

---

# Architecture

## Page Object Model (POM)

Each page is implemented as a separate class.

Examples:
- Login Page
- News Page
- Create News Page

Tests contain only:
- business logic
- assertions
- page method calls

Direct raw locators inside tests are avoided.

---

## Component-Based Approach

Reusable UI elements are separated into components.

Implemented component:
- Header Component

---

# Implemented Test Cases

- TC-01 Create News Form
- TC-02 Title Validation
- TC-03 Tags Validation
- TC-04 Image Upload Validation
- TC-05 Main Text Validation
- TC-06 Source Field Validation
- TC-07 Cancel Confirmation Modal
- TC-08 Preview Mode
- TC-09 Edit News Button
- TC-10 Edit Existing News

---

# Installation

Clone repository:

```bash
git clone <repository-link>
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

Create `.env` file in project root.

Example:

```env
BASE_URL=https://www.greencity.cx.ua/#/greenCity
EMAIL=your_email
PASSWORD=your_password
```

---

# Run Tests

Run all tests:

```bash
npx playwright test
```

Run specific test:

```bash
npx playwright test tests/tc-04-image-upload.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

---

# Allure Report

Generate Allure results:

```bash
npx playwright test
```

Generate report:

```bash
allure generate allure-results --clean
```

Open report:

```bash
allure open
```

---

# Playwright Configuration

Implemented:
- baseURL configuration
- screenshots on failure
- trace retention on failure
- Allure reporter integration

---

# Notes

Some tests reveal real defects in GreenCity application behavior.

Examples:
- unexpected redirect to `/#/ubs`
- incorrect text length validation
- inconsistent navigation behavior

These failures are related to application issues, not automation implementation.

---

# Author

Oleksandra Bilan
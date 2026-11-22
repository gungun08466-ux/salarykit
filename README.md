# SalaryKit

SalaryKit is a frontend-only global salary and career toolkit for exploring compensation decisions. Its calculators help users explore salary changes, compare currencies using dated reference rates, evaluate job offers, and break annual gross pay into useful periods.

## Current features

- **Salary Hike Calculator** — estimates the increase and new annual and monthly gross salary for INR or USD inputs.
- **Salary Converter** — converts amounts across INR, USD, EUR, GBP, CAD, and AUD using dated Frankfurter reference rates, cached in memory for up to 12 hours. Manual Refresh bypasses the cache.
- **Job Offer Comparison** — compares annual compensation from two offers when both use the same currency.
- **Salary Breakdown Calculator** — estimates annual, monthly, weekly, daily, and hourly gross salary in INR or USD based on a work schedule.
- **Privacy Policy** — describes current data handling and the services used by the site.
- **Contact page** — provides contact guidance. Its support email is currently the `YOUR_SUPPORT_EMAIL` placeholder and must be replaced before publishing.

The site also includes a shared responsive layout and a homepage linking to the tools.

## Technology stack

- React
- Vite
- JavaScript
- Tailwind CSS v4
- React Router DOM
- Lucide React

## Local setup

### Prerequisites

- Node.js with npm

### Install and run

From the project directory, install the dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Vite prints the local development address in the terminal.

## Available scripts

These are the scripts currently defined in `package.json`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run lint` | Run ESLint on JavaScript and JSX files; warnings fail the command. |
| `npm run test` | Run the Vitest unit tests once. |
| `npm run preview` | Preview the production build locally; run `npm run build` first. |

## Production build

Create the production assets with:

```bash
npm run build
```

Vite writes the build output to `dist/`. To serve that build locally, first build and then run:

```bash
npm run preview
```

## Project structure

```text
salarykit/
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
│   ├── salarykit-mark.svg
│   └── vite.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── SiteLayout.jsx
    │   └── ToolCard.jsx
    ├── data/
    │   └── tools.js
    ├── pages/
    │   ├── ContactPage.jsx
    │   ├── HomePage.jsx
    │   ├── JobOfferComparisonPage.jsx
    │   ├── PlaceholderPage.jsx
    │   ├── PrivacyPolicyPage.jsx
    │   ├── SalaryBreakdownCalculatorPage.jsx
    │   ├── SalaryConverterPage.jsx
    │   └── SalaryHikeCalculatorPage.jsx
    └── utils/
        ├── exchangeRates.js
        ├── calculations.js
        ├── calculations.test.js
        └── currency.js
```

- `App.jsx` defines the application routes.
- `components/` contains the shared site layout and reusable tool card.
- `data/` contains tool metadata.
- `pages/` contains the homepage, calculators, policy, contact page, and placeholder page.
- `utils/` contains shared currency formatting, Frankfurter rate requests, and calculator logic with unit tests.

## Important limitations

- SalaryKit is a frontend-only application. It has no backend, database, or user accounts.
- The Salary Converter fetches the latest available dated reference rates from Frankfurter and caches successful currency-pair rates in memory for up to 12 hours. Manual Refresh bypasses the cache. Rates are not live transaction quotes, may differ from rates offered by financial providers, and require an internet connection.
- Salary calculations are gross estimates before taxes and deductions. SalaryKit does not calculate taxes or take-home pay.
- Job Offer Comparison requires both offers to use the same currency; it does not convert between currencies.
- The Contact page has no submission form. Replace `YOUR_SUPPORT_EMAIL` with a monitored support address before publishing.

## Deployment

Vercel is the planned hosting platform. SalaryKit has not yet been deployed, and no production address is available.

## Future improvements

The following are future work, not existing features:

- Complete the planned Vercel deployment.
- Expand automated coverage to include calculator interface interactions and route behavior.
- Replace the Contact page email placeholder and complete the site-owner contact details in the Privacy Policy before publishing.

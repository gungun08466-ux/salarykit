/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  Info,
  RotateCcw,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageMetadata } from '../data/pageMetadata.js'
import { calculateSalaryHike } from '../utils/calculations.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

const currencySettings = {
  INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
  USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
}

const salaryHikeExamples = [
  {
    hike: '5%',
    annualIncrease: '₹40,000',
    newAnnualSalary: '₹8,40,000',
    monthlyIncrease: '₹3,333.33',
  },
  {
    hike: '10%',
    annualIncrease: '₹80,000',
    newAnnualSalary: '₹8,80,000',
    monthlyIncrease: '₹6,666.67',
  },
  {
    hike: '15%',
    annualIncrease: '₹1,20,000',
    newAnnualSalary: '₹9,20,000',
    monthlyIncrease: '₹10,000',
  },
]

function ResultCard({ label, value, description, featured = false, accent = false }) {
  const Icon = featured ? Calculator : TrendingUp

  return (
    <article
      className={`rounded-2xl border p-5 shadow-[0_8px_24px_rgba(16,22,58,0.05)] ${
        featured
          ? 'border-[#10163A] bg-[#10163A] text-white shadow-[0_14px_32px_rgba(16,22,58,0.16)]'
          : accent
            ? 'border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 text-[#10163A]'
            : 'border-slate-200 bg-white text-[#10163A]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-sm font-medium ${
              featured ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            {label}
          </p>
          <p
            className={`mt-3 break-words text-2xl font-bold tracking-tight sm:text-[1.75rem] ${
              featured ? 'text-white' : 'text-[#111827]'
            }`}
          >
            {value}
          </p>
          <p
            className={`mt-2 text-xs leading-5 ${
              featured ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            {description}
          </p>
        </div>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
            featured
              ? 'bg-white/10 text-violet-200'
              : accent
                ? 'bg-white text-[#7047FF] shadow-sm'
                : 'bg-violet-50 text-[#5428F5]'
          }`}
        >
          <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
        </span>
      </div>
    </article>
  )
}

function SalaryHikeCalculatorPage() {
  const [currentSalary, setCurrentSalary] = useState('')
  const [hikePercentage, setHikePercentage] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [touched, setTouched] = useState({
    currentSalary: false,
    hikePercentage: false,
  })

  usePageMetadata(pageMetadata.salaryHike)

  const {
    salaryIsValid,
    hikeIsValid,
    inputsAreValid,
    salaryIncrease,
    newAnnualSalary,
    currentMonthlySalary,
    newMonthlySalary,
    monthlyIncrease,
    calculationIsFinite,
  } = calculateSalaryHike(currentSalary, hikePercentage)

  const currentSalaryError = touched.currentSalary
    ? currentSalary.trim() === ''
      ? 'Enter your current annual salary.'
      : !salaryIsValid
        ? 'Enter a valid salary greater than zero.'
        : ''
    : currentSalary !== '' && !salaryIsValid
      ? 'Enter a valid salary greater than zero.'
      : ''
  const hikePercentageError = touched.hikePercentage
    ? hikePercentage.trim() === ''
      ? 'Enter a hike percentage.'
      : !hikeIsValid
        ? 'Enter a valid percentage of zero or more.'
        : ''
    : hikePercentage !== '' && !hikeIsValid
      ? 'Enter a valid percentage of zero or more.'
      : ''

  const formatter = new Intl.NumberFormat(currencySettings[currency].locale, {
    style: 'currency',
    currency: currencySettings[currency].currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  const formatAmount = (amount) =>
    calculationIsFinite ? formatter.format(amount) : '—'

  function resetCalculator() {
    setCurrentSalary('')
    setHikePercentage('')
    setCurrency('INR')
    setTouched({ currentSalary: false, hikePercentage: false })
  }

  function markTouched(field) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  const resultCards = [
    {
      label: 'New annual salary',
      value: formatAmount(newAnnualSalary),
      description: 'Current salary plus the increase',
      featured: true,
    },
    {
      label: 'Monthly increase',
      value: formatAmount(monthlyIncrease),
      description: 'Additional gross pay per month',
      accent: true,
    },
    {
      label: 'Salary increase amount',
      value: formatAmount(salaryIncrease),
      description: 'Additional gross pay per year',
    },
    {
      label: 'Current monthly salary',
      value: formatAmount(currentMonthlySalary),
      description: 'Current annual salary divided by 12',
    },
    {
      label: 'New monthly salary',
      value: formatAmount(newMonthlySalary),
      description: 'New annual salary divided by 12',
    },
  ]

  return (
    <div className="min-h-full bg-[#F7F8FF]">
      <section className="relative isolate overflow-hidden border-b border-violet-100 bg-gradient-to-br from-white via-[#FAF9FF] to-[#F1F4FF]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-200/50 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5 lg:py-6">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 outline-none transition-colors hover:text-[#5428F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All salary tools
          </Link>
          <div className="mt-3 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5428F5] shadow-sm">
              <Calculator aria-hidden="true" className="h-4 w-4" />
              Salary calculator
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Hike Calculator
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-700 sm:text-base sm:leading-6">
              Estimate a raise, new annual salary, and monthly increase from
              your current gross pay.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-4 sm:px-8 sm:py-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8 lg:py-6">
        <section
          aria-labelledby="calculator-inputs-heading"
          className="h-fit rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_16px_48px_rgba(16,22,58,0.08)] sm:p-7 lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5428F5] text-white shadow-lg shadow-violet-200">
              <Calculator aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="calculator-inputs-heading"
                className="text-lg font-bold tracking-tight text-[#10163A]"
              >
                Your details
              </h2>
              <p className="mt-0.5 text-sm text-slate-600">
                Enter your current pay and planned increase.
              </p>
            </div>
          </div>

          <form
            className="mt-5 space-y-5"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="current-salary"
                className="mb-2 block text-sm font-semibold text-[#10163A]"
              >
                Current annual salary
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base font-semibold text-violet-700"
                >
                  {currencySettings[currency].symbol}
                </span>
                <input
                  id="current-salary"
                  name="currentSalary"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  required
                  value={currentSalary}
                  onChange={(event) => setCurrentSalary(event.target.value)}
                  onBlur={() => markTouched('currentSalary')}
                  aria-invalid={Boolean(currentSalaryError)}
                  aria-describedby={`salary-help${currentSalaryError ? ' salary-error' : ''}`}
                  className={`w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:ring-4 focus:ring-violet-100 ${
                    currentSalaryError
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-[#5428F5]'
                  }`}
                  placeholder="e.g. 800000"
                />
              </div>
              <p id="salary-help" className="mt-2 text-xs leading-5 text-slate-600">
                Enter your annual gross salary in the selected currency.
              </p>
              {currentSalaryError && (
                <p
                  id="salary-error"
                  className="mt-1.5 text-sm text-rose-700"
                  role="alert"
                >
                  {currentSalaryError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="hike-percentage"
                className="mb-2 block text-sm font-semibold text-[#10163A]"
              >
                Hike percentage
              </label>
              <div className="relative">
                <input
                  id="hike-percentage"
                  name="hikePercentage"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  required
                  value={hikePercentage}
                  onChange={(event) => setHikePercentage(event.target.value)}
                  onBlur={() => markTouched('hikePercentage')}
                  aria-invalid={Boolean(hikePercentageError)}
                  aria-describedby={`hike-help${hikePercentageError ? ' hike-error' : ''}`}
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:ring-4 focus:ring-violet-100 ${
                    hikePercentageError
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-[#5428F5]'
                  }`}
                  placeholder="e.g. 10"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-slate-600"
                >
                  %
                </span>
              </div>
              <p id="hike-help" className="mt-2 text-xs leading-5 text-slate-600">
                Use zero or a positive percentage.
              </p>
              {hikePercentageError && (
                <p
                  id="hike-error"
                  className="mt-1.5 text-sm text-rose-700"
                  role="alert"
                >
                  {hikePercentageError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="salary-currency"
                className="mb-2 block text-sm font-semibold text-[#10163A]"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  id="salary-currency"
                  name="currency"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className="w-full appearance-none rounded-2xl border border-violet-200 bg-violet-50/60 px-4 py-3.5 pr-11 text-base font-semibold text-[#10163A] outline-none transition-shadow focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100"
                >
                  <option value="INR">INR — Indian Rupee (₹)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-700"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#5428F5] outline-none transition-colors hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset
            </button>
          </form>
        </section>

        <section aria-labelledby="calculator-results-heading">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#5428F5]">
              Your estimate
            </p>
            <h2
              id="calculator-results-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
            >
              Your salary increase
            </h2>
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {calculationIsFinite
                ? `New annual salary: ${formatAmount(newAnnualSalary)}. Salary increase: ${formatAmount(salaryIncrease)} per year. Monthly increase: ${formatAmount(monthlyIncrease)}.`
                : ''}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {calculationIsFinite
                ? 'Your results update as you change the inputs.'
                : 'Enter a valid salary and hike percentage to see your results.'}
            </p>
          </div>

          {inputsAreValid && !calculationIsFinite && (
            <p
              className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
              role="alert"
            >
              These values are too large to calculate. Enter smaller amounts.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {resultCards.map((result) => (
              <ResultCard key={result.label} {...result} />
            ))}
          </div>

          <div
            role="note"
            className="mt-5 flex gap-3 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 text-sm leading-6 text-[#10163A] shadow-sm sm:p-5"
          >
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#5428F5]"
            />
            <div>
              <p className="font-bold">Gross salary estimate</p>
              <p className="mt-1 text-slate-700">
                Results are before taxes and deductions. Monthly amounts are
                estimates calculated by dividing annual salary by 12.
              </p>
            </div>
          </div>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
            <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
              How the calculation works
            </summary>
            <p className="mt-3 leading-6">
              Salary increase = current annual salary × hike percentage ÷ 100.
              New annual salary = current annual salary + salary increase.
              Monthly amounts are the corresponding annual amounts divided by
              12.
            </p>
          </details>
        </section>
      </div>

      <section
        aria-labelledby="salary-hike-guide-heading"
        className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16"
      >
        <div className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8">
          <h2
            id="salary-hike-guide-heading"
            className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
          >
            Understand your salary hike estimate
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700 sm:text-base">
            A salary hike is also commonly called a salary increment. This
            calculator applies a proposed percentage increase to your current
            annual gross salary to estimate your new salary.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <article>
              <h3 className="font-bold text-[#10163A]">How it works</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Enter your current annual gross salary, select INR or USD, and
                add the proposed raise percentage. The calculator estimates
                your additional annual pay and new salary, then shows monthly
                equivalents.
              </p>
            </article>
            <article>
              <h3 className="font-bold text-[#10163A]">Practical example</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                With an annual salary of ₹800,000 and a 10% hike, the increase
                is ₹80,000 and the new annual salary is ₹880,000. The estimated
                monthly increase is about ₹6,666.67.
              </p>
            </article>
            <article>
              <h3 className="font-bold text-[#10163A]">Interpreting the result</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Compare the new annual salary with your current gross pay.
                Monthly figures divide annual amounts by 12; they do not
                account for taxes, deductions, or a particular payroll
                schedule.
              </p>
            </article>
          </div>
          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-[#10163A]">
              Compare salary hike examples
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Starting with a current annual gross salary of ₹8,00,000:
            </p>
            <div
              aria-label="Salary hike comparison table"
              className="mt-4 overflow-x-auto rounded-2xl border border-slate-200"
              role="region"
              tabIndex={0}
            >
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="sr-only">
                  Salary hike estimates based on a current annual gross salary
                  of ₹8,00,000.
                </caption>
                <thead className="bg-[#F8FAFF] text-[#10163A]">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      Hike
                    </th>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      Annual increase
                    </th>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      New annual salary
                    </th>
                    <th className="px-4 py-3 font-semibold" scope="col">
                      Monthly increase
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {salaryHikeExamples.map((example) => (
                    <tr key={example.hike}>
                      <th
                        className="px-4 py-3 font-semibold text-[#10163A]"
                        scope="row"
                      >
                        {example.hike}
                      </th>
                      <td className="px-4 py-3">{example.annualIncrease}</td>
                      <td className="px-4 py-3">{example.newAnnualSalary}</td>
                      <td className="px-4 py-3">{example.monthlyIncrease}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              These are gross salary estimates. Monthly amounts are annual
              amounts divided by 12. Actual take-home salary may differ because
              of taxes and deductions.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              <Link
                to={pageMetadata.salaryHikeGuide.path}
                className="font-semibold text-[#5428F5] underline decoration-violet-300 underline-offset-4 outline-none hover:text-[#4320D0] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
              >
                Read our Salary Hike Guide to understand salary increase
                formulas and examples.
              </Link>
            </p>
          </div>
          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold text-[#10163A]">
              Salary hike calculator FAQs
            </h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <details className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4">
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  What does the hike percentage apply to?
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  It applies to the current annual salary you enter. For
                  example, a 10% increase on ₹800,000 adds ₹80,000 to annual
                  gross pay.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4">
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  Does this calculator show take-home salary?
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  No. It estimates gross salary before taxes and deductions;
                  your actual take-home pay depends on your payroll and
                  personal circumstances.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4">
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  Can I calculate a 0% salary increase?
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Yes. Enter 0 to see the current annual salary carried through
                  as the new salary, with no additional increase.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4">
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  Why may my monthly pay differ from the estimate?
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  The monthly estimate is annual gross salary divided by 12.
                  Pay dates, deductions, bonuses, and payroll rules can make an
                  actual payslip different.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SalaryHikeCalculatorPage

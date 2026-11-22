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
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 outline-none transition-colors hover:text-[#5428F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All salary tools
          </Link>
          <div className="mt-7 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5428F5] shadow-sm">
              <Calculator aria-hidden="true" className="h-4 w-4" />
              Salary calculator
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Hike Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              See how a raise could change your annual and monthly salary.
              Enter your details to get a clear gross-pay estimate.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8">
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
            className="mt-7 space-y-5"
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
    </div>
  )
}

export default SalaryHikeCalculatorPage

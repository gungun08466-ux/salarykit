/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Clock3,
  Info,
  RotateCcw,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency.js'
import { calculateSalaryBreakdown } from '../utils/calculations.js'

const pageTitle = 'Salary Breakdown Calculator | SalaryKit'
const pageDescription =
  'Break down annual gross salary into estimated monthly, weekly, daily, and hourly amounts based on your work schedule.'

const currencySymbols = {
  INR: '₹',
  USD: '$',
}

function CalculatorInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  helpText,
  error,
  placeholder,
  prefix,
  suffix,
  required = false,
}) {
  const helpId = `${id}-help`
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base font-semibold text-violet-700"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={`${helpId}${error ? ` ${errorId}` : ''}`}
          className={`w-full rounded-xl border bg-white py-3 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:ring-4 focus:ring-violet-100 ${
            prefix ? 'pl-11' : 'pl-4'
          } ${suffix ? 'pr-24' : 'pr-4'} ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-slate-200 focus:border-[#5428F5]'
          }`}
          placeholder={placeholder}
        />
        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-slate-600"
          >
            {suffix}
          </span>
        )}
      </div>
      <p id={helpId} className="mt-2 text-xs leading-5 text-slate-600">
        {helpText}
      </p>
      {error && (
        <p
          id={errorId}
          className="mt-1.5 text-sm text-rose-700"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

function ResultCard({
  label,
  value,
  description,
  Icon,
  featured = false,
  accent = false,
}) {
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
          <h3
            className={`text-sm font-medium ${
              featured ? 'text-slate-200' : 'text-slate-600'
            }`}
          >
            {label}
          </h3>
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

function SalaryBreakdownCalculatorPage() {
  const [annualSalary, setAnnualSalary] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [workingDays, setWorkingDays] = useState('5')
  const [workingHours, setWorkingHours] = useState('8')
  const [touched, setTouched] = useState({
    annualSalary: false,
    workingDays: false,
    workingHours: false,
  })

  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]')
    const previousTitle = document.title
    const previousDescription = descriptionTag?.getAttribute('content')

    document.title = pageTitle
    descriptionTag?.setAttribute('content', pageDescription)

    return () => {
      document.title = previousTitle
      if (descriptionTag && previousDescription !== null) {
        descriptionTag.setAttribute('content', previousDescription)
      }
    }
  }, [])

  const {
    annualSalaryValue,
    annualSalaryIsValid,
    workingDaysAreValid,
    workingHoursAreValid,
    inputsAreValid,
    monthlyGross,
    weeklyGross,
    dailyGross,
    hourlyGross,
    calculationIsFinite,
  } = calculateSalaryBreakdown(annualSalary, workingDays, workingHours)

  const annualSalaryError = touched.annualSalary
    ? annualSalary.trim() === ''
      ? 'Enter your annual gross salary.'
      : !annualSalaryIsValid
        ? 'Enter a valid salary greater than zero.'
        : ''
    : annualSalary !== '' && !annualSalaryIsValid
      ? 'Enter a valid salary greater than zero.'
      : ''
  const workingDaysError = touched.workingDays
    ? workingDays.trim() === ''
      ? 'Enter your working days per week.'
      : !workingDaysAreValid
        ? 'Enter a value between 1 and 7.'
        : ''
    : workingDays !== '' && !workingDaysAreValid
      ? 'Enter a value between 1 and 7.'
      : ''
  const workingHoursError = touched.workingHours
    ? workingHours.trim() === ''
      ? 'Enter your working hours per day.'
      : !workingHoursAreValid
        ? 'Enter a value greater than zero and no more than 24.'
        : ''
    : workingHours !== '' && !workingHoursAreValid
      ? 'Enter a value greater than zero and no more than 24.'
      : ''

  const formatAmount = (amount) =>
    calculationIsFinite ? formatCurrency(amount, currency) : '—'

  function markTouched(field) {
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function resetCalculator() {
    setAnnualSalary('')
    setCurrency('INR')
    setWorkingDays('5')
    setWorkingHours('8')
    setTouched({
      annualSalary: false,
      workingDays: false,
      workingHours: false,
    })
  }

  const resultCards = [
    {
      label: 'Annual gross salary',
      value: formatAmount(annualSalaryValue),
      description: 'Your gross salary for a full year',
      Icon: Wallet,
      featured: true,
    },
    {
      label: 'Monthly gross salary',
      value: formatAmount(monthlyGross),
      description: 'Annual gross salary divided by 12',
      Icon: CalendarDays,
      accent: true,
    },
    {
      label: 'Weekly gross salary',
      value: formatAmount(weeklyGross),
      description: 'Annual gross salary divided by 52',
      Icon: CalendarDays,
    },
    {
      label: 'Daily gross salary',
      value: formatAmount(dailyGross),
      description: 'Weekly gross salary divided by working days',
      Icon: CalendarDays,
    },
    {
      label: 'Hourly gross salary',
      value: formatAmount(hourlyGross),
      description: 'Daily gross salary divided by working hours',
      Icon: Clock3,
    },
  ]

  const primaryResultCards = resultCards.filter(
    (result) => result.featured || result.accent,
  )
  const periodResultCards = resultCards.filter(
    (result) => !result.featured && !result.accent,
  )

  return (
    <div className="min-h-full bg-[#F8FAFF]">
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
              <Wallet aria-hidden="true" className="h-4 w-4" />
              Salary tool
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Breakdown Calculator
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              See how your annual gross salary translates into estimated monthly,
              weekly, daily, and hourly pay based on your work schedule.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-8">
        <section
          aria-labelledby="breakdown-inputs-heading"
          className="h-fit rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_16px_48px_rgba(16,22,58,0.08)] sm:p-7 lg:sticky lg:top-24"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5428F5] text-white shadow-lg shadow-violet-200">
              <Wallet aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="breakdown-inputs-heading"
                className="text-lg font-bold tracking-tight text-[#10163A]"
              >
                Your details
              </h2>
              <p className="mt-0.5 text-sm text-slate-600">
                Add your salary and usual work schedule.
              </p>
            </div>
          </div>

          <form
            className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="sm:col-span-2">
              <CalculatorInput
                id="annual-gross-salary"
                label="Annual gross salary"
                value={annualSalary}
                onChange={setAnnualSalary}
                onBlur={() => markTouched('annualSalary')}
                helpText="Enter your annual salary before taxes and deductions."
                error={annualSalaryError}
                placeholder="e.g. 800000"
                prefix={currencySymbols[currency]}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="breakdown-currency"
                className="mb-2 block text-sm font-semibold text-[#10163A]"
              >
                Currency
              </label>
              <div className="relative">
                <select
                  id="breakdown-currency"
                  name="currency"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-3 pr-11 text-base font-semibold text-[#10163A] outline-none transition-shadow focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100"
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

            <CalculatorInput
              id="working-days"
              label="Working days per week"
              value={workingDays}
              onChange={setWorkingDays}
              onBlur={() => markTouched('workingDays')}
              helpText="Choose a value from 1 to 7; decimals are allowed."
              error={workingDaysError}
              placeholder="5"
              suffix="days / week"
              required
            />

            <CalculatorInput
              id="working-hours"
              label="Working hours per day"
              value={workingHours}
              onChange={setWorkingHours}
              onBlur={() => markTouched('workingHours')}
              helpText="Enter more than 0 and up to 24 hours; decimals are allowed."
              error={workingHoursError}
              placeholder="8"
              suffix="hours / day"
              required
            />

            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button
                type="button"
                onClick={resetCalculator}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#5428F5] outline-none transition-colors hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Reset
              </button>
            </div>
          </form>
        </section>

        <div>
          <section
            aria-labelledby="breakdown-results-heading"
            className="rounded-3xl border border-violet-100 bg-white/80 p-4 shadow-[0_12px_36px_rgba(16,22,58,0.04)] sm:p-6"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#5428F5]">
                Your estimate
              </p>
              <h2
                id="breakdown-results-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
              >
                Salary by period
              </h2>
              <p
                className="sr-only"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {calculationIsFinite
                  ? `Hourly gross salary: ${formatAmount(hourlyGross)}.`
                  : ''}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Results update instantly when you change the salary or schedule.
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

            {calculationIsFinite ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {primaryResultCards.map((result) => (
                    <ResultCard key={result.label} {...result} />
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {periodResultCards.map((result) => (
                    <ResultCard key={result.label} {...result} />
                  ))}
                </div>
              </>
            ) : (
              !inputsAreValid && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
                  Enter a valid annual gross salary and work schedule to see your
                  breakdown.
                </div>
              )
            )}
          </section>

          <div
            role="note"
            className="mt-5 flex items-start gap-3 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 text-sm leading-6 text-[#10163A] sm:p-5"
          >
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#5428F5]"
            />
            <div>
              <p className="font-bold">Gross salary estimate</p>
              <p className="mt-1 text-slate-700">
                Results represent gross salary before taxes and deductions.
                Weekly, daily, and hourly amounts are estimates based on the
                selected working schedule. This is not a payslip or tax calculator.
              </p>
            </div>
          </div>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
            <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
              How the breakdown is calculated
            </summary>
            <p className="mt-3 leading-6">
              Monthly gross salary = annual gross salary ÷ 12. Weekly gross
              salary = annual gross salary ÷ 52. Daily gross salary = weekly
              gross salary ÷ working days per week. Hourly gross salary = daily
              gross salary ÷ working hours per day.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}

export default SalaryBreakdownCalculatorPage

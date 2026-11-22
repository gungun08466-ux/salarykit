/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  Info,
  RotateCcw,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageMetadata } from '../data/pageMetadata.js'
import { currencies, formatCurrency } from '../utils/currency.js'
import { compareJobOffers } from '../utils/calculations.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

const numericFields = [
  {
    key: 'baseSalary',
    label: 'Annual base salary',
    placeholder: 'e.g. 85000',
    required: true,
    helpText: 'Enter an amount greater than zero.',
  },
  {
    key: 'bonus',
    label: 'Annual bonus (optional)',
    placeholder: 'e.g. 5000',
    helpText: 'Leave blank if none; blank is treated as zero.',
  },
  {
    key: 'additional',
    label: 'Other annual benefits or additional compensation (optional)',
    placeholder: 'e.g. 3000',
    helpText: 'Enter your annual estimate, or leave blank for zero.',
  },
]

function createInitialOffer() {
  return {
    company: '',
    jobTitle: '',
    baseSalary: '',
    currency: 'INR',
    bonus: '',
    additional: '',
  }
}

function OfferInputCard({
  offer,
  offerId,
  offerLabel,
  touched,
  validation,
  onChange,
  onBlur,
}) {
  const identity =
    offerId === 'a'
      ? {
          border: 'border-violet-200',
          icon: 'bg-[#5428F5] text-white',
          label: 'text-[#5428F5]',
          header: 'from-violet-50 to-white',
        }
      : {
          border: 'border-indigo-200',
          icon: 'bg-[#7047FF] text-white',
          label: 'text-indigo-800',
          header: 'from-indigo-50 to-white',
        }
  const selectedCurrency = currencies.find(
    (currency) => currency.code === offer.currency,
  )

  return (
    <fieldset
      className={`overflow-hidden rounded-3xl border bg-white shadow-[0_16px_48px_rgba(16,22,58,0.07)] ${identity.border}`}
    >
      <legend className="sr-only">{offerLabel} details</legend>
      <div className={`border-b border-slate-100 bg-gradient-to-br ${identity.header} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className={`grid h-11 w-11 place-items-center rounded-2xl shadow-sm ${identity.icon}`}>
            <Briefcase aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${identity.label}`}>
              {offerLabel}
            </p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-[#10163A]">
              Offer details
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <label
            htmlFor={`${offerId}-company`}
            className="mb-2 block text-sm font-semibold text-[#10163A]"
          >
            Company name
          </label>
          <input
            id={`${offerId}-company`}
            name={`${offerId}-company`}
            type="text"
            autoComplete="organization"
            value={offer.company}
            onChange={(event) => onChange(offerId, 'company', event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100"
            placeholder="e.g. Northstar Labs"
          />
        </div>

        <div>
          <label
            htmlFor={`${offerId}-job-title`}
            className="mb-2 block text-sm font-semibold text-[#10163A]"
          >
            Job title
          </label>
          <input
            id={`${offerId}-job-title`}
            name={`${offerId}-job-title`}
            type="text"
            autoComplete="organization-title"
            value={offer.jobTitle}
            onChange={(event) => onChange(offerId, 'jobTitle', event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100"
            placeholder="e.g. Product Designer"
          />
        </div>

        {numericFields.map((field) => {
          const fieldId = `${offerId}-${field.key}`
          const error = validation.errors[field.key]
          const showError =
            Boolean(error) && (touched[field.key] || offer[field.key] !== '')
          const helpId = `${fieldId}-help`
          const errorId = `${fieldId}-error`

          return (
            <div key={field.key}>
              <label
                htmlFor={fieldId}
                className="mb-2 block text-sm font-semibold text-[#10163A]"
              >
                {field.label}
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold ${identity.label}`}
                >
                  {selectedCurrency.symbol}
                </span>
                <input
                  id={fieldId}
                  name={fieldId}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  required={field.required}
                  value={offer[field.key]}
                  onChange={(event) =>
                    onChange(offerId, field.key, event.target.value)
                  }
                  onBlur={() => onBlur(offerId, field.key)}
                  aria-invalid={showError}
                  aria-describedby={`${helpId}${showError ? ` ${errorId}` : ''}`}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:ring-4 focus:ring-violet-100 ${
                    showError
                      ? 'border-rose-400 focus:border-rose-500'
                      : 'border-slate-200 focus:border-[#5428F5]'
                  }`}
                  placeholder={field.placeholder}
                />
              </div>
              <p id={helpId} className="mt-2 text-xs leading-5 text-slate-600">
                {field.helpText}
              </p>
              {showError && (
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
        })}

        <div>
          <label
            htmlFor={`${offerId}-currency`}
            className="mb-2 block text-sm font-semibold text-[#10163A]"
          >
            Currency
          </label>
          <div className="relative">
            <select
              id={`${offerId}-currency`}
              name={`${offerId}-currency`}
              value={offer.currency}
              onChange={(event) => onChange(offerId, 'currency', event.target.value)}
              aria-describedby="currency-match-note"
              className="w-full appearance-none rounded-xl border border-slate-200 bg-[#F8FAFF] px-4 py-3 pr-11 text-base font-semibold text-[#10163A] outline-none transition-shadow focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} — {currency.name} ({currency.symbol})
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-700"
            />
          </div>
        </div>
      </div>
    </fieldset>
  )
}

function OfferResultCard({
  offer,
  offerLabel,
  validation,
  isHigher,
  isEqual,
}) {
  const identity =
    offerLabel === 'Offer A'
      ? { label: 'text-[#5428F5]', border: 'border-violet-200' }
      : { label: 'text-indigo-800', border: 'border-indigo-200' }
  const badgeLabel = isEqual
    ? 'Equal total'
    : isHigher
      ? 'Higher total'
      : 'Compared offer'

  const results = [
    ['Annual base salary', formatCurrency(validation.baseSalary, offer.currency)],
    ['Annual bonus', formatCurrency(validation.bonus, offer.currency)],
    [
      'Additional compensation',
      formatCurrency(validation.additional, offer.currency),
    ],
  ]

  return (
    <article
      className={`rounded-3xl border bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.06)] sm:p-6 ${
        isHigher ? 'border-violet-300 ring-1 ring-violet-100' : identity.border
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${identity.label}`}>
            {offerLabel}
          </p>
          <h3 className="mt-2 break-words text-xl font-bold tracking-tight text-[#10163A]">
            {offer.company.trim() || offerLabel}
          </h3>
          {offer.jobTitle.trim() && (
            <p className="mt-1 break-words text-sm text-slate-600">
              {offer.jobTitle.trim()}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isHigher
              ? 'bg-violet-100 text-violet-950'
              : isEqual
                ? 'bg-indigo-100 text-indigo-900'
                : 'bg-slate-100 text-slate-700'
          }`}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-2xl p-4 ${
            isHigher
              ? 'bg-[#5428F5] text-white shadow-[0_8px_20px_rgba(84,40,245,0.18)]'
              : 'bg-[#F8FAFF] text-[#10163A]'
          }`}
        >
          <p
            className={`text-xs font-semibold ${
              isHigher ? 'text-violet-100' : 'text-slate-600'
            }`}
          >
            Total annual compensation
          </p>
          <p className="mt-2 break-words text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
            {formatCurrency(validation.total, offer.currency)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-[#F8FAFF] p-4 text-[#10163A]">
          <p className="text-xs font-semibold text-slate-600">
            Monthly compensation
          </p>
          <p className="mt-2 break-words text-xl font-bold tracking-tight tabular-nums sm:text-2xl">
            {formatCurrency(validation.monthly, offer.currency)}
          </p>
          <p className="mt-1 text-xs text-slate-600">Estimated gross</p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
          Compensation breakdown
        </p>
        <dl className="mt-2 divide-y divide-slate-100">
          {results.map(([label, value]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 py-3 text-sm text-slate-700"
            >
              <dt>{label}</dt>
              <dd className="shrink-0 text-right font-medium tabular-nums text-[#10163A]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

function JobOfferComparisonPage() {
  const [offers, setOffers] = useState(() => ({
    a: createInitialOffer(),
    b: createInitialOffer(),
  }))
  const [touched, setTouched] = useState({ a: {}, b: {} })

  usePageMetadata(pageMetadata.jobOfferComparison)

  const {
    offerA,
    offerB,
    currenciesMatch,
    difference,
    percentageDifference,
    comparisonReady,
    calculationsOverflow,
    totalsAreEqual,
    higherOffer,
  } = compareJobOffers(offers.a, offers.b)
  const formattedPercentage = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(
    Number.isFinite(percentageDifference) ? percentageDifference : 0,
  )

  function updateOffer(offerId, field, value) {
    setOffers((previous) => ({
      ...previous,
      [offerId]: { ...previous[offerId], [field]: value },
    }))
  }

  function markTouched(offerId, field) {
    setTouched((previous) => ({
      ...previous,
      [offerId]: { ...previous[offerId], [field]: true },
    }))
  }

  function resetComparison() {
    setOffers({ a: createInitialOffer(), b: createInitialOffer() })
    setTouched({ a: {}, b: {} })
  }

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
              <Briefcase aria-hidden="true" className="h-4 w-4" />
              Career tool
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Job Offer Comparison
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Compare the full compensation picture side by side. Add annual
              salary, bonuses, and other compensation to see clear gross
              estimates for both offers.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section aria-labelledby="offer-inputs-heading">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#5428F5]">
              Compare offers
            </p>
            <h2
              id="offer-inputs-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
            >
              Enter offer details
            </h2>
          </div>
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 text-sm leading-6 text-[#10163A] shadow-sm sm:p-5">
            <Info
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[#5428F5]"
            />
            <div>
              <p className="font-bold">
                Use the same currency for both offers
              </p>
              <p id="currency-match-note" className="mt-1 text-slate-700">
                This tool does not convert currencies. Results are withheld
                until both offers use the same currency.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <OfferInputCard
              offer={offers.a}
              offerId="a"
              offerLabel="Offer A"
              touched={touched.a}
              validation={offerA}
              onChange={updateOffer}
              onBlur={markTouched}
            />
            <OfferInputCard
              offer={offers.b}
              offerId="b"
              offerLabel="Offer B"
              touched={touched.b}
              validation={offerB}
              onChange={updateOffer}
              onBlur={markTouched}
            />
          </div>

          <button
            type="button"
            onClick={resetComparison}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#5428F5] outline-none transition-colors hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Reset comparison
          </button>
        </section>

        <section
          aria-labelledby="comparison-results-heading"
          className="mt-12 rounded-3xl border border-violet-100 bg-white/80 p-4 shadow-[0_12px_36px_rgba(16,22,58,0.04)] sm:p-7"
        >
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#5428F5]">
              Side-by-side results
            </p>
            <h2
              id="comparison-results-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
            >
              Your comparison
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Results update as you edit either offer. Use them as a guide to
              compare the gross figures side by side.
            </p>
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {comparisonReady
                ? totalsAreEqual
                  ? 'Both offers have equal total annual compensation.'
                  : `Offer ${higherOffer.toUpperCase()} has the higher total annual compensation.`
                : ''}
            </p>
          </div>

          {!currenciesMatch && (
            <p
              className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
              role="alert"
            >
              The currencies do not match. Select the same currency for both
              offers to compare them; no currency conversion is performed.
            </p>
          )}

          {calculationsOverflow && currenciesMatch && (
            <p
              className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
              role="alert"
            >
              These compensation amounts are too large to compare. Enter
              smaller amounts.
            </p>
          )}

          {comparisonReady ? (
            <>
              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 text-[#10163A]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#5428F5] shadow-sm">
                  <TrendingUp aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold">
                    {totalsAreEqual
                      ? 'Both offers have equal total compensation.'
                      : `Offer ${higherOffer.toUpperCase()} has the higher annual total.`}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-700">
                    Both offers are shown equally below; the higher total is
                    highlighted for quick reference.
                  </p>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <OfferResultCard
                  offer={offers.a}
                  offerLabel="Offer A"
                  validation={offerA}
                  isHigher={higherOffer === 'a'}
                  isEqual={totalsAreEqual}
                />
                <OfferResultCard
                  offer={offers.b}
                  offerLabel="Offer B"
                  validation={offerB}
                  isHigher={higherOffer === 'b'}
                  isEqual={totalsAreEqual}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-[#5428F5] bg-[#5428F5] p-5 text-white shadow-[0_12px_28px_rgba(84,40,245,0.16)] sm:p-6">
                  <p className="text-sm font-semibold text-violet-100">
                    Difference in annual compensation
                  </p>
                  <p className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                    {formatCurrency(difference, offers.a.currency)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-violet-100">
                    {totalsAreEqual
                      ? 'Both offers are equal.'
                      : `Offer ${higherOffer.toUpperCase()} is higher.`}
                  </p>
                </article>
                <article className="rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-5 text-[#10163A] shadow-sm sm:p-6">
                  <p className="text-sm font-semibold text-violet-900">
                    Percentage difference
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {formattedPercentage}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    Difference relative to the lower total offer.
                  </p>
                </article>
              </div>
            </>
          ) : currenciesMatch && !calculationsOverflow ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm sm:p-6">
              Enter a valid annual base salary greater than zero for both offers.
              Blank bonus and additional compensation fields are treated as zero.
            </div>
          ) : null}

          <div
            role="note"
            className="mt-5 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 text-sm leading-6 text-[#10163A] sm:p-5"
          >
            <p className="font-bold">Gross compensation estimate</p>
            <p className="mt-1 text-slate-700">
              This is a gross compensation comparison before taxes, deductions,
              and personal expenses. Benefits and additional compensation are
              user-entered annual estimates; actual value and take-home pay may
              differ.
            </p>
          </div>

          <details className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
            <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
              How the comparison is calculated
            </summary>
            <p className="mt-3 leading-6">
              Total annual compensation = base salary + annual bonus + other
              annual compensation. Estimated monthly gross compensation is the
              annual total divided by 12. Percentage difference is the annual
              total difference divided by the lower total offer. Both offers
              must use the same currency; the tool does not apply exchange rates.
            </p>
          </details>
        </section>
      </div>
    </div>
  )
}

export default JobOfferComparisonPage

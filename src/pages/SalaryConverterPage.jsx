import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  RefreshCw,
  RotateCcw,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { currencies, formatCurrency } from '../utils/currency.js'
import {
  calculateCurrencyConversion,
  swapCurrencyPair,
} from '../utils/calculations.js'
import { fetchExchangeRate } from '../utils/exchangeRates.js'

const pageTitle = 'Salary Converter | SalaryKit'
const pageDescription =
  'Convert salary amounts between INR, USD, EUR, GBP, CAD, and AUD using dated Frankfurter reference exchange rates.'

function SalaryConverterPage() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [amountTouched, setAmountTouched] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const lastRefreshKey = useRef(0)
  const [rateState, setRateState] = useState({
    base: '',
    quote: '',
    status: 'idle',
    data: null,
    error: '',
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

  useEffect(() => {
    const base = fromCurrency
    const quote = toCurrency
    const forceRefresh = refreshKey !== lastRefreshKey.current
    lastRefreshKey.current = refreshKey

    if (base === quote) {
      setRateState({
        base,
        quote,
        status: 'success',
        data: { base, quote, rate: 1, date: null },
        error: '',
      })
      return undefined
    }

    let isCurrent = true
    setRateState({
      base,
      quote,
      status: 'loading',
      data: null,
      error: '',
    })

    fetchExchangeRate(base, quote, { forceRefresh })
      .then((data) => {
        if (isCurrent) {
          setRateState({
            base,
            quote,
            status: 'success',
            data,
            error: '',
          })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setRateState({
            base,
            quote,
            status: 'error',
            data: null,
            error: error.message,
          })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [fromCurrency, toCurrency, refreshKey])

  const matchingRateState =
    rateState.base === fromCurrency && rateState.quote === toCurrency
      ? rateState
      : null
  const rateStatus =
    fromCurrency === toCurrency
      ? 'success'
      : matchingRateState?.status ?? 'loading'
  const rateData =
    fromCurrency === toCurrency
      ? { base: fromCurrency, quote: toCurrency, rate: 1, date: null }
      : rateStatus === 'success'
        ? matchingRateState?.data
        : null
  const rateError =
    rateStatus === 'error' ? matchingRateState?.error : ''
  const {
    amountValue,
    amountIsValid,
    exchangeRate,
    convertedAmount,
    conversionIsFinite,
  } = calculateCurrencyConversion(
    amount,
    fromCurrency,
    toCurrency,
    rateData?.rate,
  )
  const amountError = amountTouched
    ? amount.trim() === ''
      ? 'Enter an amount to convert.'
      : !amountIsValid
        ? 'Enter a valid amount greater than zero.'
        : ''
    : amount !== '' && !amountIsValid
      ? 'Enter a valid amount greater than zero.'
      : ''

  const fromCurrencyInfo = currencies.find(
    (currency) => currency.code === fromCurrency,
  )
  const formattedAmount = conversionIsFinite
    ? formatCurrency(convertedAmount, toCurrency)
    : '—'
  const formattedRate = `${formatCurrency(1, fromCurrency)} = ${formatCurrency(
    exchangeRate,
    toCurrency,
    4,
  )}`
  const overflowError =
    rateData !== null && amountIsValid && !conversionIsFinite
  const rateStatusMessage =
    rateStatus === 'loading'
      ? 'Fetching the latest available reference rate…'
      : fromCurrency === toCurrency
        ? 'Same currency selected; no API request is needed.'
        : ''

  function swapCurrencies() {
    const swappedPair = swapCurrencyPair(fromCurrency, toCurrency)
    setFromCurrency(swappedPair.fromCurrency)
    setToCurrency(swappedPair.toCurrency)
  }

  function resetConverter() {
    setAmount('')
    setFromCurrency('USD')
    setToCurrency('INR')
    setAmountTouched(false)
  }

  function refreshRate() {
    setRateState({
      base: fromCurrency,
      quote: toCurrency,
      status: 'loading',
      data: null,
      error: '',
    })
    setRefreshKey((key) => key + 1)
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
              <ArrowLeftRight aria-hidden="true" className="h-4 w-4" />
              Salary tool
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Converter
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Compare salary amounts across currencies with dated Frankfurter
              reference rates. Your estimate updates when you change the amount
              or currency pair.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <section
          aria-labelledby="converter-inputs-heading"
          className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_16px_48px_rgba(16,22,58,0.08)] sm:p-7 lg:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5428F5] text-white shadow-lg shadow-violet-200">
              <ArrowLeftRight aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="converter-inputs-heading"
                className="text-lg font-bold tracking-tight text-[#10163A]"
              >
                Convert a salary
              </h2>
              <p className="mt-0.5 text-sm text-slate-600">
                Choose currencies and enter an amount to get started.
              </p>
            </div>
          </div>

          <form
            className="mt-7"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <div className="rounded-2xl border border-blue-100 bg-[#F8FAFF] p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                  From
                </p>
                <label
                  htmlFor="from-currency"
                  className="mb-2 mt-4 block text-sm font-semibold text-[#10163A]"
                >
                  From currency
                </label>
                <select
                  id="from-currency"
                  name="fromCurrency"
                  value={fromCurrency}
                  onChange={(event) => setFromCurrency(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-[#10163A] outline-none transition-shadow focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100 sm:text-base"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} — {currency.name}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="conversion-amount"
                  className="mb-2 mt-5 block text-sm font-semibold text-[#10163A]"
                >
                  Amount to convert
                </label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-base font-semibold text-violet-700"
                  >
                    {fromCurrencyInfo.symbol}
                  </span>
                  <input
                    id="conversion-amount"
                    name="amount"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    required
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    onBlur={() => setAmountTouched(true)}
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={`amount-help${amountError ? ' amount-error' : ''}`}
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-base text-[#10163A] outline-none transition-shadow placeholder:text-slate-500 focus:ring-4 focus:ring-violet-100 ${
                      amountError
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 focus:border-[#5428F5]'
                    }`}
                    placeholder="e.g. 1000"
                  />
                </div>
                <p
                  id="amount-help"
                  className="mt-2 text-xs leading-5 text-slate-600"
                >
                  Use digits and a decimal point; do not enter a currency
                  symbol.
                </p>
                {amountError && (
                  <p
                    id="amount-error"
                    className="mt-1.5 text-sm text-rose-700"
                    role="alert"
                  >
                    {amountError}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={swapCurrencies}
                aria-label="Swap from and to currencies"
                title="Swap currencies"
                className="grid h-12 w-12 place-items-center justify-self-center self-center rounded-2xl border border-violet-200 bg-white text-[#5428F5] shadow-sm outline-none transition-colors hover:border-[#5428F5] hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5] lg:rotate-0"
              >
                <ArrowLeftRight
                  aria-hidden="true"
                  className="h-5 w-5 rotate-90 lg:rotate-0"
                />
              </button>

              <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-800">
                  To
                </p>
                <label
                  htmlFor="to-currency"
                  className="mb-2 mt-4 block text-sm font-semibold text-[#10163A]"
                >
                  To currency
                </label>
                <select
                  id="to-currency"
                  name="toCurrency"
                  value={toCurrency}
                  onChange={(event) => setToCurrency(event.target.value)}
                  className="w-full rounded-xl border border-violet-200 bg-white px-3 py-3 text-sm font-semibold text-[#10163A] outline-none transition-shadow focus:border-[#5428F5] focus:ring-4 focus:ring-violet-100 sm:text-base"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} — {currency.name}
                    </option>
                  ))}
                </select>

                <div
                  aria-labelledby="converted-amount-label"
                  className="mt-5 min-h-[8.25rem] rounded-xl border border-white/90 bg-white/80 p-4 shadow-sm"
                >
                  <p
                    id="converted-amount-label"
                    className="text-sm font-semibold text-slate-600"
                  >
                    Converted amount
                  </p>
                  <p className="mt-2 break-words text-3xl font-bold tracking-tight text-[#10163A] sm:text-4xl">
                    {formattedAmount}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {rateStatus === 'loading'
                      ? 'Fetching the reference rate…'
                      : rateStatus === 'error'
                        ? 'Conversion unavailable. Retry below.'
                        : `${fromCurrency} to ${toCurrency}`}
                  </p>
                </div>
              </div>
            </div>

            {overflowError && (
              <p
                className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                role="alert"
              >
                This amount is too large to convert. Enter a smaller amount.
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                The result updates as you enter an amount or change currencies.
              </p>
              <button
                type="button"
                onClick={resetConverter}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#5428F5] outline-none transition-colors hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
                Reset
              </button>
            </div>

            <p
              className="sr-only"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {conversionIsFinite
                ? `${formatCurrency(amountValue, fromCurrency)} converts to ${formattedAmount} using the reference rate${rateData.date ? ` dated ${rateData.date}` : ''}.`
                : ''}
            </p>
          </form>
        </section>

        <section
          aria-labelledby="converter-results-heading"
          className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.06)] sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5428F5]">
                Frankfurter reference data
              </p>
              <h2
                id="converter-results-heading"
                className="mt-2 text-xl font-bold tracking-tight text-[#10163A]"
              >
                Exchange rate details
              </h2>
            </div>
            <button
              type="button"
              onClick={refreshRate}
              disabled={rateStatus === 'loading' || fromCurrency === toCurrency}
              title={
                fromCurrency === toCurrency
                  ? 'Identical currencies do not require a reference rate.'
                  : undefined
              }
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5428F5] px-4 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-[#4320D0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5] disabled:cursor-not-allowed disabled:bg-violet-300"
            >
              <RefreshCw
                aria-hidden="true"
                className={`h-4 w-4 ${rateStatus === 'loading' ? 'animate-spin' : ''}`}
              />
              {rateStatus === 'loading'
                ? 'Fetching…'
                : rateStatus === 'error'
                  ? 'Retry'
                  : 'Refresh rate'}
            </button>
          </div>

          <div className="mt-5 grid gap-4 rounded-2xl bg-[#F8FAFF] p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <p className="text-sm font-semibold text-slate-600">
                Reference exchange rate
              </p>
              <p className="mt-2 break-words text-lg font-bold text-[#10163A] sm:text-xl">
                {rateData ? formattedRate : '—'}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">
                Last available rate date
              </p>
              <p className="mt-2 text-base font-bold text-[#10163A]">
                {rateData?.date ??
                  (fromCurrency === toCurrency
                    ? 'Not applicable'
                    : 'Not available yet')}
              </p>
            </div>
          </div>

          <p
            className="mt-4 text-sm leading-6 text-slate-700"
            role="status"
            aria-live="polite"
          >
            {rateStatusMessage}
          </p>
          {rateError && (
            <p
              className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800"
              role="alert"
            >
              {rateError}
            </p>
          )}

          <p className="mt-4 rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-xs leading-5 text-slate-700">
            Successful rates are cached in memory for up to 12 hours. Refresh
            bypasses the cache and requests the latest available reference
            rate.
          </p>
        </section>

        <div
          role="note"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-violet-200 bg-gradient-to-br from-white to-violet-50 p-4 text-sm leading-6 text-[#10163A] sm:p-5"
        >
          <AlertTriangle
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-[#5428F5]"
          />
          <p>
            <span className="font-bold">
              Reference rates, not live transaction quotes.
            </span>{' '}
            Frankfurter rates are dated reference data, may differ from offered
            transaction rates, and are not suitable for financial decisions.
            <span className="mt-2 block font-semibold">
              Exchange rates:{' '}
              <a
                href="https://frankfurter.dev/"
                target="_blank"
                rel="noreferrer"
                className="rounded underline decoration-violet-400 underline-offset-2 outline-none hover:text-[#5428F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
              >
                Frankfurter (frankfurter.dev)
              </a>
            </span>
          </p>
        </div>

        <details className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
          <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
            How the conversion is calculated
          </summary>
          <p className="mt-3 leading-6">
            Converted amount = input amount × the Frankfurter reference rate
            returned for the selected source and target currencies. The rate
            date shown is supplied by the API. When both currencies match, the
            rate is 1 and no API request is made.
          </p>
        </details>
      </div>
    </div>
  )
}

export default SalaryConverterPage

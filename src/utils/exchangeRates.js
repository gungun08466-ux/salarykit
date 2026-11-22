import { currencies } from './currency.js'

const supportedCurrencyCodes = new Set(
  currencies.map(({ code }) => code),
)

const rateEndpoint = 'https://api.frankfurter.dev/v2/rate'
const cacheDurationMs = 12 * 60 * 60 * 1000
const rateCache = new Map()
const pendingRequests = new Map()

function isValidRateDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`)
  return (
    Number.isFinite(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  )
}

async function requestExchangeRate(url, fromCurrency, toCurrency) {
  let response

  try {
    response = await fetch(url)
  } catch {
    throw new Error(
      'Unable to reach Frankfurter. Check your connection and retry.',
    )
  }

  if (
    response === null ||
    typeof response !== 'object' ||
    typeof response.ok !== 'boolean'
  ) {
    throw new Error('Frankfurter returned an invalid response. Please retry.')
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `No Frankfurter reference rate is available for ${fromCurrency}/${toCurrency}. Try another currency pair.`,
      )
    }
    throw new Error(
      `Frankfurter request failed (HTTP ${response.status}). Please retry.`,
    )
  }

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Frankfurter returned invalid JSON. Please retry.')
  }

  if (
    data === null ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    data.base !== fromCurrency ||
    data.quote !== toCurrency ||
    !Number.isFinite(data.rate) ||
    data.rate <= 0 ||
    !isValidRateDate(data.date)
  ) {
    throw new Error(
      'Frankfurter returned an invalid reference-rate response. Please retry.',
    )
  }

  return {
    base: data.base,
    quote: data.quote,
    rate: data.rate,
    date: data.date,
  }
}

export function fetchExchangeRate(
  fromCurrency,
  toCurrency,
  { forceRefresh = false, now = Date.now } = {},
) {
  if (
    !supportedCurrencyCodes.has(fromCurrency) ||
    !supportedCurrencyCodes.has(toCurrency)
  ) {
    return Promise.reject(
      new Error('Unsupported currency pair. Select supported currencies.'),
    )
  }

  if (fromCurrency === toCurrency) {
    return Promise.resolve({
      base: fromCurrency,
      quote: toCurrency,
      rate: 1,
      date: null,
    })
  }

  const url = `${rateEndpoint}/${fromCurrency.toLowerCase()}/${toCurrency.toLowerCase()}`
  const cacheKey = `${fromCurrency}/${toCurrency}`
  const currentTime = now()
  const cachedRate = rateCache.get(cacheKey)

  if (!forceRefresh && cachedRate && cachedRate.expiresAt > currentTime) {
    return Promise.resolve(cachedRate.data)
  }
  if (cachedRate && cachedRate.expiresAt <= currentTime) {
    rateCache.delete(cacheKey)
  }

  const pendingRequest = pendingRequests.get(url)
  if (pendingRequest) {
    return pendingRequest
  }

  const request = requestExchangeRate(url, fromCurrency, toCurrency)
    .then((data) => {
      rateCache.set(cacheKey, {
        data,
        expiresAt: now() + cacheDurationMs,
      })
      return data
    })
    .finally(() => {
      if (pendingRequests.get(url) === request) {
        pendingRequests.delete(url)
      }
    })
  pendingRequests.set(url, request)
  return request
}

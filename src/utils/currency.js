export const currencies = [
  { code: 'INR', name: 'Indian Rupee', locale: 'en-IN', symbol: '₹' },
  { code: 'USD', name: 'US Dollar', locale: 'en-US', symbol: '$' },
  { code: 'EUR', name: 'Euro', locale: 'de-DE', symbol: '€' },
  { code: 'GBP', name: 'British Pound', locale: 'en-GB', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', locale: 'en-CA', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', locale: 'en-AU', symbol: 'A$' },
]

const currencyByCode = Object.fromEntries(
  currencies.map((currency) => [currency.code, currency]),
)

export function formatCurrency(amount, currencyCode, maximumFractionDigits = 2) {
  const currency = currencyByCode[currencyCode]
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  })

  if (currencyCode !== 'CAD' && currencyCode !== 'AUD') {
    return formatter.format(amount)
  }

  return formatter
    .formatToParts(amount)
    .map((part) =>
      part.type === 'currency' ? currency.symbol : part.value,
    )
    .join('')
}

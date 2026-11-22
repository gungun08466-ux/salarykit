import { afterEach, describe, expect, it, vi } from 'vitest'
import { currencies } from './currency.js'
import {
  calculateCurrencyConversion,
  calculateSalaryBreakdown,
  calculateSalaryHike,
  calculateOfferCompensation,
  compareJobOffers,
  swapCurrencyPair,
} from './calculations.js'
import { fetchExchangeRate } from './exchangeRates.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('calculateSalaryHike', () => {
  it('calculates the increase, new annual salary, and monthly amounts', () => {
    const result = calculateSalaryHike('800000', '10')

    expect(result.inputsAreValid).toBe(true)
    expect(result.salaryIncrease).toBe(80000)
    expect(result.newAnnualSalary).toBe(880000)
    expect(result.currentMonthlySalary).toBeCloseTo(800000 / 12)
    expect(result.newMonthlySalary).toBeCloseTo(880000 / 12)
    expect(result.monthlyIncrease).toBeCloseTo(80000 / 12)
  })

  it('allows a zero-percent hike but rejects zero salary', () => {
    const noHike = calculateSalaryHike('50000', '0')
    const zeroSalary = calculateSalaryHike('0', '10')

    expect(noHike.inputsAreValid).toBe(true)
    expect(noHike.salaryIncrease).toBe(0)
    expect(noHike.newAnnualSalary).toBe(50000)
    expect(zeroSalary.salaryIsValid).toBe(false)
    expect(zeroSalary.inputsAreValid).toBe(false)
  })

  it.each([
    ['', '10'],
    ['50000', ''],
    ['not a salary', '10'],
    ['50000', 'invalid'],
    ['50000', '-1'],
  ])('rejects invalid input values (%s, %s)', (salary, hike) => {
    expect(calculateSalaryHike(salary, hike).inputsAreValid).toBe(false)
  })

  it('flags arithmetic overflow', () => {
    const result = calculateSalaryHike('1.7e308', '100')

    expect(result.inputsAreValid).toBe(true)
    expect(result.calculationIsFinite).toBe(false)
  })
})

describe('calculateCurrencyConversion', () => {
  it('keeps all six supported currencies available', () => {
    expect(currencies.map(({ code }) => code)).toEqual([
      'INR',
      'USD',
      'EUR',
      'GBP',
      'CAD',
      'AUD',
    ])
  })

  it.each(currencies.map(({ code }) => code))(
    'supports %s currency conversion',
    (currency) => {
      const rate = currency === 'USD' ? undefined : 1.25
      const result = calculateCurrencyConversion(
        '2',
        'USD',
        currency,
        rate,
      )

      expect(result.currenciesAreSupported).toBe(true)
      expect(result.exchangeRate).toBe(currency === 'USD' ? 1 : rate)
      expect(result.convertedAmount).toBe(
        currency === 'USD' ? 2 : 2 * rate,
      )
    },
  )

  it('applies the reference rate returned for the selected pair', () => {
    const result = calculateCurrencyConversion('100', 'USD', 'INR', 92.83)

    expect(result.exchangeRate).toBe(92.83)
    expect(result.convertedAmount).toBe(9283)
    expect(result.conversionIsFinite).toBe(true)
  })

  it('uses the directly returned reverse-pair rate', () => {
    const result = calculateCurrencyConversion(
      '9283',
      'INR',
      'USD',
      1 / 92.83,
    )

    expect(result.convertedAmount).toBeCloseTo(100)
  })

  it('uses a rate of one when source and target currencies match', () => {
    const result = calculateCurrencyConversion('125', 'EUR', 'EUR', undefined)

    expect(result.exchangeRate).toBe(1)
    expect(result.convertedAmount).toBe(125)
  })

  it.each(['', '0', '-5', 'not an amount'])(
    'rejects invalid amount %s',
    (amount) => {
      const result = calculateCurrencyConversion(amount, 'USD', 'INR', 92.83)

      expect(result.amountIsValid).toBe(false)
      expect(result.conversionIsFinite).toBe(false)
    },
  )

  it.each([undefined, null, 0, -1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid reference rate %s',
    (rate) => {
      const result = calculateCurrencyConversion('10', 'USD', 'INR', rate)

      expect(result.conversionIsFinite).toBe(false)
    },
  )

  it('marks unknown currency codes as unsupported', () => {
    const result = calculateCurrencyConversion('10', 'USD', 'XYZ', 1)

    expect(result.currenciesAreSupported).toBe(false)
    expect(result.conversionIsFinite).toBe(false)
  })
})

describe('swapCurrencyPair', () => {
  it('swaps the source and target currencies', () => {
    expect(swapCurrencyPair('USD', 'CAD')).toEqual({
      fromCurrency: 'CAD',
      toCurrency: 'USD',
    })
  })
})

describe('fetchExchangeRate', () => {
  const validRate = {
    date: '2026-11-22',
    base: 'USD',
    quote: 'INR',
    rate: 92.83,
  }

  function mockFetchResponse(data, { ok = true, status = 200 } = {}) {
    return {
      ok,
      status,
      json: vi.fn().mockResolvedValue(data),
    }
  }

  it('fetches and validates the selected pair from Frankfurter', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(mockFetchResponse(validRate))
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      fetchExchangeRate('USD', 'INR', { forceRefresh: true }),
    ).resolves.toEqual(validRate)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.frankfurter.dev/v2/rate/usd/inr',
    )
  })

  it('deduplicates concurrent requests for the same pair', async () => {
    let resolveResponse
    const responsePromise = new Promise((resolve) => {
      resolveResponse = resolve
    })
    const fetchMock = vi.fn().mockReturnValue(responsePromise)
    vi.stubGlobal('fetch', fetchMock)
    const rate = { ...validRate, base: 'EUR', quote: 'CAD' }

    const firstRequest = fetchExchangeRate('EUR', 'CAD', {
      forceRefresh: true,
    })
    const secondRequest = fetchExchangeRate('EUR', 'CAD', {
      forceRefresh: true,
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    resolveResponse(mockFetchResponse(rate))
    await expect(
      Promise.all([firstRequest, secondRequest]),
    ).resolves.toEqual([rate, rate])
  })

  it('does not request a rate for identical currencies', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchExchangeRate('EUR', 'EUR')).resolves.toEqual({
      base: 'EUR',
      quote: 'EUR',
      rate: 1,
      date: null,
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each(currencies.map(({ code }) => code))(
    'accepts %s as a supported Frankfurter currency',
    async (currency) => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(
          mockFetchResponse({ ...validRate, quote: currency }),
        )
      vi.stubGlobal('fetch', fetchMock)

      const result = await fetchExchangeRate('USD', currency, {
        forceRefresh: true,
      })

      expect(result.quote).toBe(currency)
      if (currency === 'USD') {
        expect(fetchMock).not.toHaveBeenCalled()
      } else {
        expect(fetchMock).toHaveBeenCalledTimes(1)
      }
    },
  )

  it.each([
    ['invalid rate', { ...validRate, rate: '92.83' }],
    ['zero rate', { ...validRate, rate: 0 }],
    ['wrong base', { ...validRate, base: 'EUR' }],
    ['wrong quote', { ...validRate, quote: 'CAD' }],
    ['invalid date', { ...validRate, date: '2026-02-31' }],
    ['missing date', { ...validRate, date: undefined }],
  ])('rejects a response with %s', async (_description, data) => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(mockFetchResponse(data)),
    )

    await expect(
      fetchExchangeRate('USD', 'INR', { forceRefresh: true }),
    ).rejects.toThrow('invalid reference-rate response')
  })

  it('reports an invalid JSON response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockRejectedValue(new SyntaxError('invalid JSON')),
      }),
    )

    await expect(
      fetchExchangeRate('USD', 'INR', { forceRefresh: true }),
    ).rejects.toThrow('returned invalid JSON')
  })

  it('reports a malformed HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(null))

    await expect(
      fetchExchangeRate('USD', 'INR', { forceRefresh: true }),
    ).rejects.toThrow('returned an invalid response')
  })

  it('reports HTTP failures so the user can retry', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        mockFetchResponse({}, { ok: false, status: 503 }),
      ),
    )

    await expect(fetchExchangeRate('AUD', 'GBP')).rejects.toThrow('HTTP 503')
  })

  it('reports an unavailable supported currency pair', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        mockFetchResponse({}, { ok: false, status: 404 }),
      ),
    )

    await expect(fetchExchangeRate('GBP', 'AUD')).rejects.toThrow(
      'No Frankfurter reference rate is available',
    )
  })

  it('does not request unsupported currency codes', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchExchangeRate('USD', 'XYZ')).rejects.toThrow(
      'Unsupported currency pair',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports network errors clearly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('network failure')),
    )

    await expect(fetchExchangeRate('EUR', 'AUD')).rejects.toThrow(
      'Unable to reach Frankfurter',
    )
  })

  it('reuses cached rates until 12 hours have elapsed', async () => {
    let currentTime = 0
    const now = () => currentTime
    const firstRate = {
      date: '2026-11-21',
      base: 'CAD',
      quote: 'GBP',
      rate: 0.58,
    }
    const refreshedRate = { ...firstRate, date: '2026-11-22', rate: 0.59 }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(mockFetchResponse(firstRate))
      .mockResolvedValueOnce(mockFetchResponse(refreshedRate))
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      fetchExchangeRate('CAD', 'GBP', { forceRefresh: true, now }),
    ).resolves.toEqual(firstRate)

    currentTime += 12 * 60 * 60 * 1000 - 1
    await expect(
      fetchExchangeRate('CAD', 'GBP', { now }),
    ).resolves.toEqual(firstRate)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    currentTime += 1
    await expect(
      fetchExchangeRate('CAD', 'GBP', { now }),
    ).resolves.toEqual(refreshedRate)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('lets manual refresh bypass and replace a valid cache entry', async () => {
    const now = () => 1000
    const cachedRate = {
      date: '2026-11-21',
      base: 'GBP',
      quote: 'CAD',
      rate: 1.72,
    }
    const refreshedRate = { ...cachedRate, date: '2026-11-22', rate: 1.73 }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(mockFetchResponse(cachedRate))
      .mockResolvedValueOnce(mockFetchResponse(refreshedRate))
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      fetchExchangeRate('GBP', 'CAD', { now }),
    ).resolves.toEqual(cachedRate)
    await expect(
      fetchExchangeRate('GBP', 'CAD', { now }),
    ).resolves.toEqual(cachedRate)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await expect(
      fetchExchangeRate('GBP', 'CAD', { forceRefresh: true, now }),
    ).resolves.toEqual(refreshedRate)
    await expect(
      fetchExchangeRate('GBP', 'CAD', { now }),
    ).resolves.toEqual(refreshedRate)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('does not cache failed or invalid responses', async () => {
    const validAudEurRate = {
      date: '2026-11-22',
      base: 'AUD',
      quote: 'EUR',
      rate: 0.6,
    }
    const validAudCadRate = {
      date: '2026-11-22',
      base: 'AUD',
      quote: 'CAD',
      rate: 0.91,
    }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        mockFetchResponse({}, { ok: false, status: 503 }),
      )
      .mockResolvedValueOnce(mockFetchResponse(validAudEurRate))
      .mockResolvedValueOnce(
        mockFetchResponse({ ...validAudCadRate, rate: 'invalid' }),
      )
      .mockResolvedValueOnce(mockFetchResponse(validAudCadRate))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchExchangeRate('AUD', 'EUR')).rejects.toThrow('HTTP 503')
    await expect(fetchExchangeRate('AUD', 'EUR')).resolves.toEqual(
      validAudEurRate,
    )
    await expect(fetchExchangeRate('AUD', 'CAD')).rejects.toThrow(
      'invalid reference-rate response',
    )
    await expect(fetchExchangeRate('AUD', 'CAD')).resolves.toEqual(
      validAudCadRate,
    )
    expect(fetchMock).toHaveBeenCalledTimes(4)
  })
})

describe('calculateOfferCompensation', () => {
  it('calculates total annual and monthly compensation', () => {
    const result = calculateOfferCompensation({
      baseSalary: '120000',
      bonus: '10000',
      additional: '5000',
    })

    expect(result.isValid).toBe(true)
    expect(result.total).toBe(135000)
    expect(result.monthly).toBe(11250)
  })

  it('treats blank optional compensation as zero', () => {
    const result = calculateOfferCompensation({
      baseSalary: '120000',
      bonus: '',
      additional: '',
    })

    expect(result.isValid).toBe(true)
    expect(result.bonus).toBe(0)
    expect(result.additional).toBe(0)
    expect(result.total).toBe(120000)
  })

  it('rejects zero base salary and negative or invalid extras', () => {
    const result = calculateOfferCompensation({
      baseSalary: '0',
      bonus: '-1',
      additional: 'invalid',
    })

    expect(result.isValid).toBe(false)
    expect(result.errors.baseSalary).not.toBe('')
    expect(result.errors.bonus).not.toBe('')
    expect(result.errors.additional).not.toBe('')
  })
})

describe('compareJobOffers', () => {
  const createOffer = (baseSalary, currency = 'USD') => ({
    baseSalary: String(baseSalary),
    bonus: '',
    additional: '',
    currency,
  })

  it('calculates annual and percentage differences for comparable offers', () => {
    const result = compareJobOffers(
      { ...createOffer(120000), bonus: '10000' },
      createOffer(100000),
    )

    expect(result.comparisonReady).toBe(true)
    expect(result.offerA.total).toBe(130000)
    expect(result.offerA.monthly).toBeCloseTo(130000 / 12)
    expect(result.difference).toBe(30000)
    expect(result.percentageDifference).toBe(0.3)
    expect(result.higherOffer).toBe('a')
  })

  it('reports equal offers with zero difference', () => {
    const result = compareJobOffers(createOffer(90000), createOffer(90000))

    expect(result.comparisonReady).toBe(true)
    expect(result.totalsAreEqual).toBe(true)
    expect(result.difference).toBe(0)
    expect(result.percentageDifference).toBe(0)
    expect(result.higherOffer).toBe(null)
  })

  it('does not compare offers with different currencies', () => {
    const result = compareJobOffers(
      createOffer(90000, 'USD'),
      createOffer(90000, 'INR'),
    )

    expect(result.currenciesMatch).toBe(false)
    expect(result.comparisonReady).toBe(false)
    expect(result.difference).toBe(0)
  })
})

describe('calculateSalaryBreakdown', () => {
  it('calculates annual, monthly, weekly, daily, and hourly values', () => {
    const result = calculateSalaryBreakdown('624000', '5', '8')

    expect(result.inputsAreValid).toBe(true)
    expect(result.monthlyGross).toBe(52000)
    expect(result.weeklyGross).toBe(12000)
    expect(result.dailyGross).toBe(2400)
    expect(result.hourlyGross).toBe(300)
  })

  it('uses the selected working schedule for daily and hourly amounts', () => {
    const result = calculateSalaryBreakdown('624000', '4', '10')

    expect(result.dailyGross).toBe(3000)
    expect(result.hourlyGross).toBe(300)
  })

  it.each([
    ['0', '5', '8'],
    ['invalid', '5', '8'],
    ['624000', '0', '8'],
    ['624000', '8', '8'],
    ['624000', '5', '0'],
    ['624000', '5', '25'],
    ['', '5', '8'],
  ])('rejects invalid salary or schedule values (%s, %s, %s)', (
    salary,
    days,
    hours,
  ) => {
    const result = calculateSalaryBreakdown(salary, days, hours)

    expect(result.inputsAreValid).toBe(false)
    expect(result.calculationIsFinite).toBe(false)
  })
})

import { currencies } from './currency.js'

const supportedCurrencyCodes = new Set(
  currencies.map(({ code }) => code),
)

export function calculateSalaryHike(currentSalary, hikePercentage) {
  const currentSalaryText = String(currentSalary)
  const hikePercentageText = String(hikePercentage)
  const salaryValue = Number(currentSalaryText)
  const hikeValue = Number(hikePercentageText)
  const salaryIsValid =
    currentSalaryText.trim() !== '' &&
    Number.isFinite(salaryValue) &&
    salaryValue > 0
  const hikeIsValid =
    hikePercentageText.trim() !== '' &&
    Number.isFinite(hikeValue) &&
    hikeValue >= 0
  const inputsAreValid = salaryIsValid && hikeIsValid

  const salaryIncrease = inputsAreValid ? salaryValue * (hikeValue / 100) : 0
  const newAnnualSalary = inputsAreValid
    ? salaryValue + salaryIncrease
    : 0
  const currentMonthlySalary = inputsAreValid ? salaryValue / 12 : 0
  const newMonthlySalary = inputsAreValid ? newAnnualSalary / 12 : 0
  const monthlyIncrease = inputsAreValid ? salaryIncrease / 12 : 0
  const calculationIsFinite =
    inputsAreValid &&
    [
      salaryIncrease,
      newAnnualSalary,
      currentMonthlySalary,
      newMonthlySalary,
      monthlyIncrease,
    ].every(Number.isFinite)

  return {
    salaryValue,
    hikeValue,
    salaryIsValid,
    hikeIsValid,
    inputsAreValid,
    salaryIncrease,
    newAnnualSalary,
    currentMonthlySalary,
    newMonthlySalary,
    monthlyIncrease,
    calculationIsFinite,
  }
}

export function calculateCurrencyConversion(
  amount,
  fromCurrency,
  toCurrency,
  providedRate,
) {
  const amountText = String(amount)
  const amountValue = Number(amountText)
  const amountIsValid =
    amountText.trim() !== '' &&
    Number.isFinite(amountValue) &&
    amountValue > 0
  const currenciesAreSupported =
    supportedCurrencyCodes.has(fromCurrency) &&
    supportedCurrencyCodes.has(toCurrency)
  const exchangeRate =
    fromCurrency === toCurrency ? 1 : providedRate
  const exchangeRateIsValid =
    Number.isFinite(exchangeRate) && exchangeRate > 0
  const convertedAmount =
    amountIsValid && currenciesAreSupported && exchangeRateIsValid
      ? amountValue * exchangeRate
      : 0
  const conversionIsFinite =
    amountIsValid &&
    currenciesAreSupported &&
    exchangeRateIsValid &&
    Number.isFinite(convertedAmount)

  return {
    amountValue,
    amountIsValid,
    currenciesAreSupported,
    exchangeRate,
    convertedAmount,
    conversionIsFinite,
  }
}

export function swapCurrencyPair(fromCurrency, toCurrency) {
  return {
    fromCurrency: toCurrency,
    toCurrency: fromCurrency,
  }
}

export function calculateOfferCompensation(offer) {
  const baseSalaryText = offer.baseSalary.trim()
  const bonusText = offer.bonus.trim()
  const additionalText = offer.additional.trim()
  const baseSalary = Number(baseSalaryText)
  const bonus = bonusText === '' ? 0 : Number(bonusText)
  const additional = additionalText === '' ? 0 : Number(additionalText)

  const errors = {
    baseSalary:
      baseSalaryText === ''
        ? 'Enter the annual base salary.'
        : !Number.isFinite(baseSalary) || baseSalary <= 0
          ? 'Enter a valid salary greater than zero.'
          : '',
    bonus:
      bonusText !== '' && (!Number.isFinite(bonus) || bonus < 0)
        ? 'Enter a valid bonus of zero or more.'
        : '',
    additional:
      additionalText !== '' &&
      (!Number.isFinite(additional) || additional < 0)
        ? 'Enter a valid amount of zero or more.'
        : '',
  }

  const isValid = Object.values(errors).every((error) => error === '')
  const total = baseSalary + bonus + additional
  const monthly = total / 12

  return {
    errors,
    isValid,
    baseSalary,
    bonus,
    additional,
    total,
    monthly,
    calculationIsFinite: Number.isFinite(total) && Number.isFinite(monthly),
  }
}

export function compareJobOffers(offerAInput, offerBInput) {
  const offerA = calculateOfferCompensation(offerAInput)
  const offerB = calculateOfferCompensation(offerBInput)
  const currenciesMatch = offerAInput.currency === offerBInput.currency
  const calculationsAreFinite =
    offerA.calculationIsFinite && offerB.calculationIsFinite
  const offersAreComparable =
    currenciesMatch && offerA.isValid && offerB.isValid
  const difference =
    offersAreComparable && calculationsAreFinite
      ? Math.abs(offerA.total - offerB.total)
      : 0
  const lowerTotal =
    offersAreComparable && calculationsAreFinite
      ? Math.min(offerA.total, offerB.total)
      : 0
  const percentageDifference =
    lowerTotal > 0 ? difference / lowerTotal : 0
  const comparisonReady =
    offersAreComparable &&
    calculationsAreFinite &&
    Number.isFinite(percentageDifference)
  const calculationsOverflow =
    offerA.isValid &&
    offerB.isValid &&
    currenciesMatch &&
    (!calculationsAreFinite || !Number.isFinite(percentageDifference))
  const totalsAreEqual = comparisonReady && offerA.total === offerB.total
  const higherOffer = comparisonReady
    ? offerA.total > offerB.total
      ? 'a'
      : offerA.total < offerB.total
        ? 'b'
        : null
    : null

  return {
    offerA,
    offerB,
    currenciesMatch,
    difference,
    percentageDifference,
    comparisonReady,
    calculationsOverflow,
    totalsAreEqual,
    higherOffer,
  }
}

export function calculateSalaryBreakdown(
  annualSalary,
  workingDays,
  workingHours,
) {
  const annualSalaryText = String(annualSalary)
  const workingDaysText = String(workingDays)
  const workingHoursText = String(workingHours)
  const annualSalaryValue = Number(annualSalaryText)
  const workingDaysValue = Number(workingDaysText)
  const workingHoursValue = Number(workingHoursText)

  const annualSalaryIsValid =
    annualSalaryText.trim() !== '' &&
    Number.isFinite(annualSalaryValue) &&
    annualSalaryValue > 0
  const workingDaysAreValid =
    workingDaysText.trim() !== '' &&
    Number.isFinite(workingDaysValue) &&
    workingDaysValue >= 1 &&
    workingDaysValue <= 7
  const workingHoursAreValid =
    workingHoursText.trim() !== '' &&
    Number.isFinite(workingHoursValue) &&
    workingHoursValue > 0 &&
    workingHoursValue <= 24
  const inputsAreValid =
    annualSalaryIsValid && workingDaysAreValid && workingHoursAreValid

  const monthlyGross = inputsAreValid ? annualSalaryValue / 12 : 0
  const weeklyGross = inputsAreValid ? annualSalaryValue / 52 : 0
  const dailyGross = inputsAreValid ? weeklyGross / workingDaysValue : 0
  const hourlyGross = inputsAreValid ? dailyGross / workingHoursValue : 0
  const calculationIsFinite =
    inputsAreValid &&
    [monthlyGross, weeklyGross, dailyGross, hourlyGross].every(Number.isFinite)

  return {
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
  }
}

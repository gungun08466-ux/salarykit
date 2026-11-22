import { useEffect } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  Globe,
  Info,
  LockKeyhole,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ToolCard from '../components/ToolCard.jsx'
import tools from '../data/tools.js'

const previewItems = [
  {
    label: 'USD salary example',
    current: '$85,000',
    afterRaise: '$91,800',
    increase: '+8%',
    currency: 'USD',
  },
  {
    label: 'INR salary example',
    current: '₹18,00,000',
    afterRaise: '₹19,80,000',
    increase: '+10%',
    currency: 'INR',
  },
]

function HeroPreview() {
  return (
    <aside
      aria-labelledby="salary-preview-heading"
      className="relative mx-auto w-full max-w-[36rem] py-4 sm:py-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-4 top-0 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl sm:right-4"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-2 left-0 h-56 w-56 rounded-full bg-violet-200/50 blur-3xl"
      />
      <div className="relative mx-auto max-w-[28rem] rounded-[1.75rem] border border-white/80 bg-white/95 p-5 shadow-[0_24px_70px_rgba(17,24,39,0.14)] backdrop-blur sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <TrendingUp aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Salary preview
              </p>
              <h2
                id="salary-preview-heading"
                className="mt-1 text-base font-semibold tracking-tight text-[#111827]"
              >
                A look at your next step
              </h2>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800">
            Example
          </span>
        </div>

        <div className="mt-6 rounded-2xl bg-[#F8FAFC] p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-600">
                Illustrative annual salary
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                {previewItems[0].current}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-slate-600">
                Example after raise
              </p>
              <p className="mt-1 text-lg font-semibold text-indigo-700">
                {previewItems[0].afterRaise}
              </p>
            </div>
          </div>
          <div
            aria-label="Illustrative salary growth chart"
            className="mt-5 flex h-28 items-end gap-2 border-b border-l border-slate-300 px-3"
            role="img"
          >
            {[35, 48, 42, 63, 58, 76, 68, 92].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className={`flex-1 rounded-t-md ${
                  index === 7 ? 'bg-violet-600' : 'bg-blue-300'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-600">
              Example only · USD
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
              {previewItems[0].increase} illustrative increase
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-600">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-indigo-700"
          />
          <p>
            Figures are examples, not actual user data or a prediction of
            results.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-20 top-1/4 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-[0_14px_35px_rgba(17,24,39,0.12)] xl:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <BriefcaseBusiness className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold text-slate-800">
          Plan your salary
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-20 bottom-1/4 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-[0_14px_35px_rgba(17,24,39,0.12)] xl:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-700">
          <Globe className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold text-slate-800">
          Compare currencies
        </span>
      </div>
    </aside>
  )
}

const highlights = [
  {
    title: 'Quick estimates',
    description: 'Clear results from simple inputs',
    icon: Zap,
    style: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'Free to use',
    description: 'No payment or account required',
    icon: ShieldCheck,
    style: 'bg-emerald-100 text-emerald-800',
  },
  {
    title: 'Global currencies',
    description: 'INR, USD, EUR, GBP and more',
    icon: Globe,
    style: 'bg-blue-100 text-blue-800',
  },
  {
    title: 'Privacy-conscious',
    description: 'Salary inputs stay in your browser',
    icon: LockKeyhole,
    style: 'bg-violet-100 text-violet-800',
  },
]

function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const section = document.getElementById(hash.slice(1))
    section?.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[38rem] w-[38rem] rounded-full bg-indigo-100/70 blur-3xl"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-indigo-950 shadow-sm">
              <span aria-hidden="true">🚀</span>
              Salary &amp; career toolkit
              <span className="text-indigo-300">·</span>
              <span>Global</span>
            </div>
            <h1 className="mt-5 text-[2.7rem] font-bold leading-[1.03] tracking-[-0.05em] text-[#111827] sm:text-5xl lg:text-[3.8rem]">
              Smarter Salary Tools for a{' '}
              <span className="relative inline-block text-[#5B35F5]">
                Better Career
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-1 w-full -rotate-2 rounded-full bg-violet-500"
                />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Calculate, compare and plan your salary with ease. Make informed
              decisions about your career and finances.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#tools"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#5B35F5] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(91,53,245,0.25)] outline-none transition-colors hover:bg-[#4828d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B35F5]"
              >
                <Calculator aria-hidden="true" className="h-4 w-4" />
                Explore Tools
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to="/#about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#5B35F5] bg-white px-6 py-3 text-sm font-semibold text-[#111827] outline-none transition-colors hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B35F5]"
              >
                <span
                  aria-hidden="true"
                  className="grid h-5 w-5 place-items-center rounded-full bg-violet-100 text-violet-800"
                >
                  <ArrowRight className="h-3 w-3" />
                </span>
                Learn more
              </Link>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section
        aria-label="SalaryKit highlights"
        className="relative z-10 mx-auto -mt-5 max-w-7xl px-5 sm:px-8"
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(17,24,39,0.09)] md:grid-cols-4">
          {highlights.map(({ title, description, icon: Icon, style }) => (
            <div
              key={title}
              className="flex min-h-24 items-center gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:p-5 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${style}`}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold text-[#111827]">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-4 text-slate-600">
                  {description}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="scroll-mt-24 bg-white px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#635BFF]">
              Salary tools
            </p>
            <h2
              id="tools-heading"
              className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#111827] sm:text-4xl"
            >
              Popular Tools
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Powerful calculators to help you make sense of salary and career
              decisions.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-14 sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#24269B] via-[#3F48D5] to-[#7653F8] px-6 py-7 text-white shadow-[0_16px_35px_rgba(59,55,190,0.24)] sm:px-9 sm:py-8">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-amber-300">
                  <PieChart aria-hidden="true" className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Plan smart. Grow with confidence.
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-indigo-100">
                    Use clear salary tools to take a closer look at your next
                    career move.
                  </p>
                </div>
              </div>
              <Link
                to="/#tools"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-indigo-950 outline-none transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-24 bg-[#F8FAFC] px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#625BFF]">
              About SalaryKit
            </p>
            <h2
              id="about-heading"
              className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#111827] sm:text-4xl"
            >
              A practical toolkit for your next career decision.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              SalaryKit brings salary and career tools together to make the
              details behind a raise, a new opportunity, or an offer easier to
              understand. The experience is designed to stay focused on the
              numbers that matter to your decision.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-[#111827] p-7 text-white shadow-[0_20px_50px_rgba(17,24,39,0.12)] sm:p-9">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#635BFF]/20 blur-3xl"
            />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-[#14B8A6]">
                <Globe
                  aria-hidden="true"
                  className="h-6 w-6"
                  strokeWidth={1.8}
                />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
                Practical salary tools
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                One toolkit. Clearer choices.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                Explore raises, compare offers, and understand compensation
                with clear, easy-to-use calculators.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-slate-100">
                  Salary hikes
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-slate-100">
                  Currency conversion
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

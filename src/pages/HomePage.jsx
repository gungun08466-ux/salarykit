import { useEffect } from 'react'
import {
  ArrowRight,
  Globe,
  LockKeyhole,
  PieChart,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ToolCard from '../components/ToolCard.jsx'
import { pageMetadata } from '../data/pageMetadata.js'
import tools from '../data/tools.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

const highlights = [
  {
    title: 'Quick estimates',
    icon: Zap,
    iconStyle: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'Free to use',
    icon: ShieldCheck,
    iconStyle: 'bg-emerald-100 text-emerald-800',
  },
  {
    title: 'Global currencies',
    icon: Globe,
    iconStyle: 'bg-blue-100 text-blue-800',
  },
  {
    title: 'Privacy-conscious',
    icon: LockKeyhole,
    iconStyle: 'bg-violet-100 text-violet-800',
  },
]

function HomePage() {
  const { hash } = useLocation()

  usePageMetadata(pageMetadata.home)

  useEffect(() => {
    if (!hash) return

    const section = document.getElementById(hash.slice(1))
    section?.scrollIntoView({ block: 'start' })
  }, [hash])

  return (
    <>
      <section className="bg-[#F8FAFF] px-5 py-7 sm:px-8 sm:py-9 lg:py-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5428F5] shadow-sm">
            FREE SALARY TOOLS
            <span aria-hidden="true" className="text-violet-300">
              ·
            </span>
            GLOBAL
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
            Make Smarter Salary Decisions
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Calculate salary hikes, convert currencies, compare job offers, and
            understand your salary breakdown with easy-to-use free tools.
          </p>
        </div>
      </section>

      <section
        id="tools"
        aria-labelledby="tools-heading"
        className="scroll-mt-24 bg-white px-5 pb-8 pt-3 sm:px-8 sm:pb-10 sm:pt-5 lg:pb-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2
              id="tools-heading"
              className="text-2xl font-bold tracking-[-0.035em] text-[#10163A] sm:text-3xl"
            >
              Choose a Salary Tool
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          <div
            aria-label="SalaryKit benefits"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-slate-100 pt-5"
          >
            {highlights.map(({ title, icon: Icon, iconStyle }) => (
              <div key={title} className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg ${iconStyle}`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {title}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-slate-600">
            Planning a raise?{' '}
            <Link
              to="/guides/salary-hike-guide"
              className="inline-flex items-center gap-1 font-semibold text-[#5428F5] underline decoration-violet-300 underline-offset-4 outline-none hover:text-[#4320D0] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
            >
              Read the salary hike guide
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </p>
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

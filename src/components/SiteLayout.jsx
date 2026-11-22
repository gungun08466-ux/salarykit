/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ArrowRight, Menu, TrendingUp, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Salary Tools', to: '/#tools' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/contact' },
]

function Brand({ inverse = false }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#635BFF]"
      aria-label="SalaryKit home"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          inverse ? 'bg-white/10 text-[#14B8A6]' : 'bg-indigo-50 text-[#635BFF]'
        }`}
      >
        <TrendingUp aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${
          inverse ? 'text-white' : 'text-[#111827]'
        }`}
      >
        Salary<span className={inverse ? 'text-[#14B8A6]' : 'text-[#635BFF]'}>Kit</span>
      </span>
    </Link>
  )
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Brand />

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:gap-9 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-md text-sm font-medium text-slate-600 outline-none transition-colors hover:text-[#635BFF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#635BFF]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 rounded-xl bg-[#635BFF] px-5 py-3 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-[#5148e5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#635BFF]"
          >
            Explore Tools
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-[#111827] outline-none transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#635BFF] md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          className="absolute left-0 right-0 top-full rounded-b-2xl border-b border-slate-200 bg-white px-5 pb-5 pt-3 shadow-xl md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-50 hover:text-[#635BFF] focus-visible:outline-2 focus-visible:outline-[#635BFF]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/#tools"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#635BFF] px-4 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-[#5148e5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#635BFF]"
            >
              Explore Tools
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-[#111827] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Brand inverse />
            <p className="mt-4 text-sm leading-6 text-slate-400">
              A practical toolkit for understanding salary decisions and
              planning your next career move.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Explore
            </p>
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <li><Link className="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#14B8A6]" to="/">Home</Link></li>
              <li><Link className="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#14B8A6]" to="/#tools">Salary Tools</Link></li>
              <li><Link className="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#14B8A6]" to="/#about">About</Link></li>
              <li><Link className="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#14B8A6]" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="rounded outline-none transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#14B8A6]" to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SalaryKit. All rights reserved.</p>
          <p>Salary &amp; career toolkit for compensation decisions worldwide.</p>
        </div>
      </div>
    </footer>
  )
}

function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#111827]">
      <a
        href="#main-content"
        className="skip-link rounded-lg bg-white px-4 py-3 font-semibold text-[#635BFF] shadow-lg"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

export default SiteLayout

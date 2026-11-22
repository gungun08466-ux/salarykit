import { ShieldCheck } from 'lucide-react'
import { pageMetadata } from '../data/pageMetadata.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

function PrivacyPolicyPage() {
  usePageMetadata(pageMetadata.privacy)

  const policySectionClassName =
    'rounded-2xl border border-violet-100 bg-white p-5 shadow-[0_8px_24px_rgba(16,22,58,0.04)] sm:p-7'

  return (
    <div className="min-h-full bg-[#F8FAFF]">
      <article
        aria-labelledby="privacy-policy-title"
        className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12"
      >
        <header className="relative isolate overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-[#FAF9FF] to-[#F1F4FF] p-6 shadow-[0_16px_48px_rgba(16,22,58,0.07)] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-36 -z-10 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl"
          />
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5428F5] shadow-sm">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Your privacy
          </p>
          <h1
            id="privacy-policy-title"
            className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl"
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            Last updated: November 22, 2026
          </p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
            This policy explains how the SalaryKit website currently handles
            information. SalaryKit is a frontend-only salary and career toolkit;
            its calculators run in your browser.
          </p>
        </header>

        <div className="mt-6 space-y-4">
          <section
            aria-labelledby="privacy-scope"
            className={policySectionClassName}
          >
            <h2
              id="privacy-scope"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Introduction and scope
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              This policy applies to the SalaryKit website and its salary
              calculators. It describes the website as it is currently
              implemented. If features or services change, this policy may be
              updated as described below.
            </p>
          </section>

          <section
            aria-labelledby="information-collected"
            className={policySectionClassName}
          >
            <h2
              id="information-collected"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Information the website collects
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              SalaryKit does not currently have user accounts, a backend, or a
              database, and it does not ask you to submit profile information
              through a contact form. Calculator values are handled as
              described below and are not sent to a SalaryKit server by the
              current application.
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              The hosting or delivery provider used to serve the website may
              process basic technical information, such as IP address,
              browser/device details, and request logs, to deliver and protect
              the site. Any such processing and retention is governed by that
              provider&apos;s terms and privacy policy.
            </p>
          </section>

          <section
            aria-labelledby="calculator-processing"
            className={policySectionClassName}
          >
            <h2
              id="calculator-processing"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Calculator inputs and calculations
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Salary amounts, percentages, currency choices, and other values
              you enter are processed in your browser to produce calculator
              results. The current application does not transmit those inputs
              to SalaryKit or store them in a SalaryKit account or database.
              They are held in page memory while you use a calculator and are
              normally discarded when you reload or leave that page.
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              The Salary Converter sends the selected source and target
              currency codes to the Frankfurter API to retrieve the latest
              available dated reference rate. The salary amount you enter is
              not included in that request; conversion is performed in your
              browser. Successful pair rates are cached in page memory for up
              to 12 hours; the Refresh button bypasses this cache. The cache is
              not written to browser storage and is cleared when the page is
              reloaded or closed.
            </p>
          </section>

          <section
            aria-labelledby="cookies-storage"
            className={policySectionClassName}
          >
            <h2
              id="cookies-storage"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Cookies and browser storage
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              The current SalaryKit application does not set or read cookies,
              localStorage, or sessionStorage. A hosting or delivery provider
              may use its own technical mechanisms depending on how the site
              is deployed; consult that provider&apos;s privacy and cookie
              information for details.
            </p>
          </section>

          <section
            aria-labelledby="third-party-services"
            className={policySectionClassName}
          >
            <h2
              id="third-party-services"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Third-party services
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              The Salary Converter uses Frankfurter&apos;s public API at
              api.frankfurter.dev for dated reference exchange rates. Requests
              include the selected currency pair, but not the entered salary
              amount. Frankfurter&apos;s privacy practices may apply to
              request metadata. No analytics, tracking pixels, or advertising
              services are currently configured. The website may also be
              delivered through a hosting provider; that provider&apos;s own
              privacy practices may apply to technical information involved in
              serving the site.
            </p>
          </section>

          <section
            aria-labelledby="advertising"
            className={policySectionClassName}
          >
            <h2
              id="advertising"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Advertising and Google AdSense
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Advertising, including Google AdSense, is not currently
              integrated or active. Analytics or advertising services could be
              added in the future. If that happens, this policy will be
              updated to describe the services in use; those providers&apos;
              own privacy policies and cookie practices may also apply, and
              any required notices or choices will be provided.
            </p>
          </section>

          <section
            aria-labelledby="security-retention"
            className={policySectionClassName}
          >
            <h2
              id="security-retention"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Data security and retention
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Because calculator inputs are processed in your browser and are
              not sent to a SalaryKit backend, SalaryKit does not retain a
              server-side copy of those inputs. Technical logs held by a
              hosting or delivery provider, if any, are subject to that
              provider&apos;s security practices and retention periods.
              Internet services and devices cannot be guaranteed to be
              completely secure.
            </p>
          </section>

          <section
            aria-labelledby="childrens-privacy"
            className={policySectionClassName}
          >
            <h2
              id="childrens-privacy"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Children&apos;s privacy
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              SalaryKit is a salary and career toolkit and is not intended for
              children. The website does not knowingly collect personal
              information from children. If you believe a child has provided
              personal information in connection with the site, please use the
              owner contact details below so the site owner can review the
              concern.
            </p>
          </section>

          <section
            aria-labelledby="policy-changes"
            className={policySectionClassName}
          >
            <h2
              id="policy-changes"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Changes to this policy
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              This policy may be revised when the website or its services
              change. The latest revision date will be shown at the top of
              this page. Please review this page periodically for updates.
            </p>
          </section>

          <section
            aria-labelledby="contact-information"
            className={policySectionClassName}
          >
            <h2
              id="contact-information"
              className="text-lg font-bold tracking-tight text-[#10163A] sm:text-xl"
            >
              Contact information
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              For privacy questions or requests, contact the SalaryKit site
              owner:
            </p>
            <p className="mt-3 rounded-xl border border-violet-200 bg-violet-50/60 px-4 py-3 text-sm font-semibold leading-6 text-[#10163A]">
              quicktools.support1 [at] gmail [dot] com
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              To email us, replace [at] with @ and [dot] with a period.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}

export default PrivacyPolicyPage

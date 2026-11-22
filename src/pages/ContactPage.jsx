import { ArrowLeft, Clock3, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageMetadata } from '../data/pageMetadata.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

function ContactPage() {
  usePageMetadata(pageMetadata.contact)

  return (
    <div className="min-h-full bg-[#F8FAFF]">
      <section className="relative isolate overflow-hidden border-b border-violet-100 bg-gradient-to-br from-white via-[#FAF9FF] to-[#F1F4FF]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-200/50 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 outline-none transition-colors hover:text-[#5428F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to SalaryKit
          </Link>
          <div className="mt-7 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5428F5] shadow-sm">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Get in touch
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Have a question or an idea to share? We welcome your feedback and
              want SalaryKit to be useful and easy to understand.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <section
          aria-labelledby="support-email-heading"
          className="rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_16px_48px_rgba(16,22,58,0.08)] sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#5428F5] text-white shadow-lg shadow-violet-200">
              <Mail aria-hidden="true" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#5428F5]">
                Support
              </p>
              <h2
                id="support-email-heading"
                className="mt-1 text-xl font-bold tracking-tight text-[#10163A]"
              >
                Support email
              </h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-700">
            Contact us with questions, feedback, or to report an issue with a
            calculator.
          </p>
          <p className="mt-5 text-sm font-semibold text-slate-700">
            Email address
          </p>
          <p className="mt-2 break-words rounded-2xl border border-violet-200 bg-violet-50/60 px-4 py-4 text-base font-bold text-[#10163A] sm:text-lg">
            quicktools.support1 [at] gmail [dot] com
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            To email us, replace [at] with @ and [dot] with a period.
          </p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <section
            aria-labelledby="contact-reasons-heading"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-7"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-50 text-[#5428F5]">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2
              id="contact-reasons-heading"
              className="mt-5 text-lg font-bold tracking-tight text-[#10163A]"
            >
              How we can help
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Reach out with a question about SalaryKit, share feedback, or let
              us know if a calculator does not seem to work as expected.
            </p>
          </section>

          <section
            aria-labelledby="response-time-heading"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-7"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-[#7047FF]">
              <Clock3 aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2
              id="response-time-heading"
              className="mt-5 text-lg font-bold tracking-tight text-[#10163A]"
            >
              Response time
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              We aim to respond as soon as reasonably possible. Response times
              may vary depending on the nature and volume of requests.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

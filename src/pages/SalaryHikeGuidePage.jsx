import { ArrowLeft, ArrowRight, BookOpen, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageMetadata } from '../data/pageMetadata.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

const examples = [
  {
    percentage: '10%',
    annualIncrease: '6,000',
    newAnnualSalary: '66,000',
    monthlyIncrease: '500',
    newMonthlySalary: '5,500',
  },
  {
    percentage: '20%',
    annualIncrease: '12,000',
    newAnnualSalary: '72,000',
    monthlyIncrease: '1,000',
    newMonthlySalary: '6,000',
  },
  {
    percentage: '30%',
    annualIncrease: '18,000',
    newAnnualSalary: '78,000',
    monthlyIncrease: '1,500',
    newMonthlySalary: '6,500',
  },
]

const faqs = [
  {
    question: 'How do I calculate a salary hike percentage?',
    answer:
      'Subtract your current salary from the new salary, divide the difference by your current salary, then multiply by 100. Use amounts for the same pay period and currency.',
  },
  {
    question: 'How do I find the raise amount from a percentage?',
    answer:
      'Multiply your current salary by the hike percentage as a decimal. For example, 10% is 0.10, so a 10% raise on 60,000 adds 6,000 per year.',
  },
  {
    question: 'How can I estimate my new monthly salary?',
    answer:
      'First calculate the new annual salary, then divide it by 12. This is a gross monthly estimate and does not subtract taxes or deductions.',
  },
  {
    question: 'Does a 20% or 30% raise always mean better take-home pay?',
    answer:
      'Not necessarily by the same percentage. A raise applies to gross pay, while take-home pay depends on taxes, deductions, benefits, and local payroll rules. This guide does not estimate those items.',
  },
  {
    question: 'How should I ask for a salary increase?',
    answer:
      'Prepare evidence of your contributions, explain the scope of your role, and make a clear request based on relevant compensation information for your role and location. Be ready to discuss the full package.',
  },
]

function SalaryHikeGuidePage() {
  usePageMetadata(pageMetadata.salaryHikeGuide)

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
              <BookOpen aria-hidden="true" className="h-4 w-4" />
              Salary &amp; career guide
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Hike Guide: Calculate and Negotiate Your Raise
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Learn the salary hike percentage formula, see annual and monthly
              raise examples, and prepare for a thoughtful compensation
              conversation.
            </p>
            <Link
              to="/tools/salary-hike"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#5428F5] px-5 py-3 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-[#4320D0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
            >
              Open Salary Hike Calculator
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 sm:py-12">
        <section
          aria-labelledby="hike-formula-heading"
          className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8"
        >
          <h2
            id="hike-formula-heading"
            className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
          >
            How to calculate a salary hike percentage
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-700 sm:text-base">
            Compare the old and new salary for the same time period and in the
            same currency. The percentage shows how large the increase is
            relative to the original salary.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                When you know both salaries
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Salary hike percentage = ((new salary − current salary) ÷
                current salary) × 100
              </p>
            </div>
            <div className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                When you know the proposed percentage
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Increase amount = current salary × hike percentage ÷ 100.
                Add that amount to the current salary to get the new salary.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            For example, moving from 50,000 to 55,000 is a 10% increase:
            (55,000 − 50,000) ÷ 50,000 × 100 = 10%.
          </p>
        </section>

        <section
          aria-labelledby="hike-examples-heading"
          className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8"
        >
          <h2
            id="hike-examples-heading"
            className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
          >
            10%, 20%, and 30% salary increase examples
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            These examples start with a gross salary of 60,000 per year, or
            5,000 per month. Amounts are shown in the same currency as the
            starting salary and are before deductions.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {examples.map((example) => (
              <article
                key={example.percentage}
                className="rounded-2xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-5"
              >
                <h3 className="text-lg font-bold text-[#5428F5]">
                  {example.percentage} increase
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">Annual increase</dt>
                    <dd className="font-semibold text-[#10163A]">
                      {example.annualIncrease}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">New annual salary</dt>
                    <dd className="font-semibold text-[#10163A]">
                      {example.newAnnualSalary}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">Monthly increase</dt>
                    <dd className="font-semibold text-[#10163A]">
                      {example.monthlyIncrease}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">New monthly salary</dt>
                    <dd className="font-semibold text-[#10163A]">
                      {example.newMonthlySalary}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="negotiate-hike-heading"
          className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-[#5428F5]">
              <MessageSquareText aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="negotiate-hike-heading"
                className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
              >
                How to negotiate a salary hike
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                A clear request is easier to discuss when it is supported by
                evidence and framed around the work you do.
              </p>
            </div>
          </div>
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                1. Gather specific evidence
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Note measurable results, added responsibilities, and skills
                applied since your last compensation review.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                2. Research relevant pay information
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Compare roles with similar responsibilities, experience, and
                location. Treat published ranges as context, not a guaranteed
                rate.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                3. Choose a clear request
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Decide on a reasonable target and explain how you reached it.
                Consider the full compensation package as well as base pay.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">
                4. Set a conversation and listen
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Ask for a dedicated discussion, make your case calmly, and
                invite a response. If the answer is no, ask what goals or timing
                could support a future review.
              </p>
            </li>
          </ol>
          <p className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-6 text-[#10163A]">
            One way to open the discussion: “I’d like to review my compensation
            in light of the responsibilities and results we’ve discussed. Could
            we talk about an adjustment and the expectations for the role?”
          </p>
        </section>

        <section
          aria-labelledby="salary-hike-faq-heading"
          className="rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8"
        >
          <h2
            id="salary-hike-faq-heading"
            className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl"
          >
            Salary hike FAQs
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <details
                key={question}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4"
              >
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="hike-guide-calculator-heading"
          className="rounded-3xl border border-violet-100 bg-gradient-to-r from-[#24269B] via-[#3F48D5] to-[#7653F8] p-6 text-white shadow-[0_16px_35px_rgba(59,55,190,0.2)] sm:p-8"
        >
          <h2
            id="hike-guide-calculator-heading"
            className="text-2xl font-bold tracking-tight"
          >
            Estimate your own raise
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
            Enter your current annual salary and a proposed percentage to see
            the estimated increase and new monthly and annual gross pay.
          </p>
          <Link
            to="/tools/salary-hike"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-950 outline-none transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Try the Salary Hike Calculator
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </section>
      </article>
    </div>
  )
}

export default SalaryHikeGuidePage

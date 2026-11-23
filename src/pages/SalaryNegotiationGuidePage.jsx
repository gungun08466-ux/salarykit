import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pageMetadata } from '../data/pageMetadata.js'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

const faqs = [
  {
    question: 'When is the right time to negotiate a job offer?',
    answer:
      'After you receive a written offer and have reviewed the full package, but before you accept or sign. Ask for time to consider it, then raise your questions in one organized conversation. If an employer asks for your expectations earlier, share a researched range and clarify the role scope first.',
  },
  {
    question: 'Should I give a salary range or a single number?',
    answer:
      'A thoughtful range can show flexibility, but employers may focus on its lower end. Set a floor you would genuinely accept and make the range narrow enough to be meaningful. If the role and compensation structure are clear, a well-supported target can also work.',
  },
  {
    question: 'What if the employer asks for my current salary?',
    answer:
      'You can redirect the conversation to the role and your expectations: “I would prefer to focus on the responsibilities and the budgeted range for this position. Based on what I know so far, I am targeting…” Rules on salary-history questions differ by location, so check the requirements where you are applying.',
  },
  {
    question: 'Can I negotiate benefits if the base salary is fixed?',
    answer:
      'Yes. Ask whether there is flexibility in a signing payment, annual bonus, equity, leave, relocation support, professional development, work location, or a review date. Confirm eligibility rules, timing, and any conditions in writing; a potential bonus is not the same as guaranteed base pay.',
  },
  {
    question: 'How do I negotiate when changing countries or working remotely?',
    answer:
      'Confirm which country’s payroll, currency, employment status, and pay practices apply. Compare roles in the relevant labor market and account for taxes, benefits, working hours, and currency risk separately. A remote job may use location-based pay bands, so ask how the employer sets its range.',
  },
  {
    question: 'What should I do if the employer says the offer is final?',
    answer:
      'Stay professional and ask whether any other package elements can move or when compensation can next be reviewed. If nothing can change, compare the offer with your minimum acceptable terms and alternatives. You can accept, decline, or request a short time to decide; avoid accepting terms you already know you cannot meet.',
  },
]

const emailExamples = [
  {
    title: 'Ask for the salary range early',
    text: `Hello [Name],

Thank you for discussing the [Role] opportunity with me. Before we move further, could you share the budgeted compensation range and how the overall package is structured? I want to make sure our expectations are aligned as I learn more about the role.

Best,
[Your Name]`,
  },
  {
    title: 'Counter a written offer',
    text: `Hello [Name],

Thank you for the offer to join [Company] as [Role]. I am excited about [specific responsibility or team goal]. Based on the role's scope and the market information I reviewed for comparable positions in [location], would you be able to consider [target amount] in [currency] as annual base salary?

I am open to discussing the overall package, including [relevant benefit or bonus]. Please let me know if a conversation would be helpful. I appreciate your consideration.

Best,
[Your Name]`,
  },
  {
    title: 'Follow up after a verbal discussion',
    text: `Hello [Name],

Thank you for speaking with me about the compensation package. To make sure I understood correctly, the proposed terms are [summarize base pay, variable pay, benefits, and any review date]. We discussed [requested change], and you will confirm [next step] by [date].

I remain interested in the role and appreciate your help. Please let me know if I have missed anything.

Best,
[Your Name]`,
  },
]

const sectionClassName =
  'scroll-mt-24 rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_12px_36px_rgba(16,22,58,0.05)] sm:p-8'

function SalaryNegotiationGuidePage() {
  usePageMetadata(pageMetadata.salaryNegotiationGuide)

  return (
    <div className="min-h-full bg-[#F8FAFF]">
      <section className="relative isolate overflow-hidden border-b border-violet-100 bg-gradient-to-br from-white via-[#FAF9FF] to-[#F1F4FF]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-200/50 blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 sm:py-8 lg:py-10">
          <Link
            to="/#tools"
            className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 outline-none transition-colors hover:text-[#5428F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All salary tools
          </Link>
          <div className="mt-5 max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#5428F5] shadow-sm">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
              Salary &amp; career guide
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#10163A] sm:text-4xl lg:text-5xl">
              Salary Negotiation Guide
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              A practical, respectful approach to researching pay, setting a
              target, and discussing compensation with confidence—whether
              you&apos;re interviewing, reviewing an offer, or changing
              countries.
            </p>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-7xl space-y-5 px-5 py-6 sm:px-8 sm:py-9">
        <nav
          aria-label="Guide contents"
          className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-bold text-[#10163A]">In this guide</h2>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['market-research', 'Research market salary'],
              ['salary-target', 'Set your expected salary'],
              ['interview-negotiation', 'Negotiate during interviews'],
              ['low-offer', 'Respond to a low offer'],
              ['email-examples', 'Email examples'],
              ['mistakes', 'Common mistakes'],
              ['negotiation-faqs', 'FAQs'],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded text-[#5428F5] underline decoration-violet-200 underline-offset-4 outline-none hover:text-[#4320D0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5428F5]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="market-research" aria-labelledby="market-research-title" className={sectionClassName}>
          <h2 id="market-research-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            1. Research your market salary
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
            A useful benchmark is a range for comparable work—not a single
            number from a generic salary page. Compensation depends on the
            responsibilities, seniority, industry, location, employer size, and
            the way pay is structured.
          </p>
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Define the work precisely</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Compare the role&apos;s actual scope, level, decision-making,
                team size, specialist skills, and experience requirements.
                Titles vary widely between employers; match responsibilities
                before matching job titles.
              </p>
            </li>
            <li className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Use several relevant sources</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Look at recent salary surveys, reputable local job postings,
                professional associations, recruiter conversations, and
                trusted peers. Favor sources that explain their sample,
                location, pay period, and date.
              </p>
            </li>
            <li className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Match location and currency</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the employer&apos;s hiring location or pay band, especially
                for remote roles. Separate cost of living from market value,
                and do not compare currencies using an exchange rate alone:
                taxes, benefits, and local pay practices also differ.
              </p>
            </li>
            <li className="rounded-2xl border border-violet-100 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Compare like with like</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Check whether figures mean base salary, total cash, or total
                compensation; whether they are annual or hourly; and whether
                variable pay is guaranteed. Note how current the information is.
              </p>
            </li>
          </ol>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-slate-800">
            <h3 className="font-bold text-[#10163A]">Build a usable benchmark</h3>
            <p className="mt-2">
              Suppose three recent sources for comparable roles in your hiring
              market show annual base-pay ranges of 68,000–82,000, 72,000–86,000,
              and 70,000–80,000 in the same currency. Treat these as a
              hypothetical illustration, not a market quote: record the overlap
              (about 72,000–80,000), then adjust your own target for fit, scope,
              and evidence rather than claiming the midpoint is automatically
              your worth.
            </p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Keep a short evidence sheet with links, dates, role matches, and
            notes about what each figure includes. That makes your ask easier
            to explain and helps you spot unreliable outliers.
          </p>
        </section>

        <section id="salary-target" aria-labelledby="salary-target-title" className={sectionClassName}>
          <h2 id="salary-target-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            2. Decide your expected salary
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            Choose a target you can justify and a private minimum you can
            accept. These are planning tools, not numbers you need to disclose
            together. Consider the value of the whole package as well as what
            you need to make the move worthwhile.
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
            <li><strong className="text-[#10163A]">Set your floor:</strong> account for your current commitments, the costs of changing jobs or locations, and the alternatives available to you. Do not count uncertain bonuses as guaranteed income.</li>
            <li><strong className="text-[#10163A]">Choose a target:</strong> place it within a defensible market range, with a reason tied to the role&apos;s scope, relevant experience, or scarce expertise.</li>
            <li><strong className="text-[#10163A]">Decide your flexibility:</strong> identify which terms matter most—base pay, bonus, equity, leave, flexibility, relocation, or a scheduled review—and which you can trade.</li>
            <li><strong className="text-[#10163A]">Normalize the numbers:</strong> compare the same currency and time period, and distinguish gross pay from take-home pay. Local tax and payroll rules vary; a gross salary estimate is not a net-pay estimate.</li>
          </ul>
          <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
            <h3 className="font-bold text-[#10163A]">A concrete way to prepare</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              If your current annual base is 70,000 and you are considering
              78,000, that is an 8,000 increase, or about 11.4% before tax.
              This arithmetic does not establish a fair market rate; use it to
              understand the change, then compare the offer and benefits on
              their merits. Try the{' '}
              <Link className="font-semibold text-[#5428F5] underline underline-offset-4 hover:text-[#4320D0]" to="/tools/salary-hike">
                Salary Hike Calculator
              </Link>{' '}
              to calculate the percentage and estimated gross pay.
            </p>
          </div>
        </section>

        <section id="interview-negotiation" aria-labelledby="interview-negotiation-title" className={sectionClassName}>
          <h2 id="interview-negotiation-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            3. Negotiate during an interview
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            You do not have to settle every compensation detail in the first
            conversation. Learn the role and its range, then discuss
            expectations when both sides have enough context. Be direct, calm,
            and curious.
          </p>
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Ask about the range</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                “Could you share the budgeted range and how you determine
                placement within it?” This helps establish whether your
                expectations align before either side invests more time.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Connect your ask to the role</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Explain briefly how your relevant experience, results, or the
                responsibilities discussed support your target. Use evidence;
                avoid making the conversation a personal-budget appeal.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Give a researched range</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If asked for expectations, name the currency and pay period.
                Give a range whose lower end you would consider, and signal
                that the final fit depends on the full package and scope.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">Listen and clarify</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Ask what success looks like, whether compensation includes
                variable pay, and when the employer needs a decision. A
                genuine discussion is more useful than guessing at unstated
                assumptions.
              </p>
            </li>
          </ol>
          <p className="mt-4 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-sm leading-6 text-[#10163A]">
            Example: “Based on the responsibilities we discussed and my
            experience leading similar projects, I am targeting 78,000 to
            84,000 in annual base salary. I would be glad to understand how
            that fits your range and the full package.”
          </p>
        </section>

        <section id="low-offer" aria-labelledby="low-offer-title" className={sectionClassName}>
          <h2 id="low-offer-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            4. Respond to a low salary offer
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            An offer below your target is a reason to clarify and discuss—not
            proof that the employer will or will not move. Avoid an immediate
            yes or no if you need time to assess the whole proposal.
          </p>
          <ol className="mt-5 space-y-4">
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">1. Thank them and request time</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Express appreciation, ask for the offer in writing, and confirm
                when you will respond. Review the base, variable compensation,
                benefits, eligibility, and decision deadline.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">2. Identify the gap precisely</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Is base pay below your researched target, or is the total
                package unclear? Confirm whether bonus is guaranteed, how
                equity vests, and when benefits begin. Do not compare a
                possible payout with guaranteed salary as if they were equal.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">3. Make one clear counter</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                State the amount or term you are requesting, the currency and
                pay period, and a concise reason based on role scope and
                relevant market evidence. Ask whether they can meet it or
                discuss alternatives.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
              <h3 className="font-bold text-[#10163A]">4. Explore options and decide</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                If base pay is constrained, ask about other terms or a written
                review date with clear criteria. Compare the revised package
                against your private minimum and priorities. Accept only if
                the complete terms work for you.
              </p>
            </li>
          </ol>
          <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-5">
            <h3 className="font-bold text-[#10163A]">Compare the full offers</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Put base salary, bonus, extra compensation, and gross monthly
              estimates side by side before deciding. SalaryKit&apos;s{' '}
              <Link className="font-semibold text-[#5428F5] underline underline-offset-4 hover:text-[#4320D0]" to="/tools/job-offer-comparison">
                Job Offer Comparison Calculator
              </Link>{' '}
              can organize parts of that comparison. It does not value every
              benefit or calculate local after-tax income, so review those
              separately.
            </p>
          </div>
        </section>

        <section id="email-examples" aria-labelledby="email-examples-title" className={sectionClassName}>
          <h2 id="email-examples-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            5. Salary negotiation email examples
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Adapt these templates to your situation. Replace every bracketed
            field, check the currency and period, and keep the tone
            collaborative. Do not claim market research you have not done.
          </p>
          <div className="mt-5 space-y-4">
            {emailExamples.map(({ title, text }) => (
              <section key={title} aria-label={title} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5 sm:p-6">
                <h3 className="font-bold text-[#10163A]">{title}</h3>
                <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-700">
                  {text}
                </pre>
              </section>
            ))}
          </div>
        </section>

        <section id="mistakes" aria-labelledby="mistakes-title" className={sectionClassName}>
          <h2 id="mistakes-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            6. Common negotiation mistakes
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ['Using a guess as a benchmark', 'A single online figure may combine different locations, seniority levels, and pay types. Check several current sources and explain what is comparable.'],
              ['Naming a range with an unworkable floor', 'The employer may focus on the lower number. Set a range only after deciding what you would actually accept.'],
              ['Comparing only headline salary', 'A larger variable component may not be guaranteed. Compare base pay, conditions, benefits, and timing separately.'],
              ['Making an ultimatum too early', 'A firm boundary can be appropriate, but threats can close a conversation. State your needs clearly and ask what flexibility exists.'],
              ['Negotiating against yourself', 'Do not lower your request before the employer responds. Make your case, then give the other person room to answer.'],
              ['Relying on verbal promises', 'Confirm material terms, eligibility rules, and review dates in writing before accepting.'],
              ['Treating the conversation as a contest', 'Negotiation is a joint decision about fit. Stay respectful, truthful, and ready to walk away if the terms do not meet your needs.'],
              ['Ignoring local context', 'Salary-history laws, employment terms, tax treatment, and customary benefits vary by country and sometimes by region. Check reliable local guidance.'],
            ].map(([title, detail]) => (
              <li key={title} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5">
                <h3 className="font-bold text-[#10163A]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="negotiation-faqs" aria-labelledby="negotiation-faqs-title" className={sectionClassName}>
          <h2 id="negotiation-faqs-title" className="text-2xl font-bold tracking-tight text-[#10163A] sm:text-3xl">
            7. Salary negotiation FAQs
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] px-4 py-4">
                <summary className="cursor-pointer font-semibold text-[#10163A] outline-none focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5428F5]">
                  {question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="negotiation-guide-next-step"
          className="rounded-3xl border border-violet-100 bg-gradient-to-r from-[#24269B] via-[#3F48D5] to-[#7653F8] p-6 text-white shadow-[0_16px_35px_rgba(59,55,190,0.2)] sm:p-8"
        >
          <h2 id="negotiation-guide-next-step" className="text-2xl font-bold tracking-tight">
            Prepare your numbers before the conversation
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-indigo-100">
            Estimate how a proposed raise changes gross pay, then compare
            offers across the compensation details that matter to you.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/tools/salary-hike"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-950 outline-none transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Salary Hike Calculator
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/tools/job-offer-comparison"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/50 px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Compare Job Offers
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 text-xs leading-5 text-indigo-100">
            This guide provides general educational information, not legal,
            tax, or financial advice. Compensation rules and market practices
            vary by location; verify terms and local requirements for your
            situation.
          </p>
        </section>
      </article>
    </div>
  )
}

export default SalaryNegotiationGuidePage

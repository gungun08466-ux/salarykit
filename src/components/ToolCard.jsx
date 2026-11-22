/* eslint-disable react/prop-types */
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function ToolCard({ tool }) {
  const Icon = tool.icon

  return (
    <article className={`group relative flex h-full min-h-48 flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_8px_24px_rgba(17,24,39,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${tool.cardStyle}`}>
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -right-7 h-28 w-28 rounded-full bg-white/45"
      />
      <div className="relative mb-4 flex items-center gap-3">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-sm ${tool.iconStyle}`}>
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
        </span>
      </div>
      <h3 className="relative text-base font-bold tracking-[-0.02em] text-[#111827]">
        {tool.title}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-5 text-slate-700">
        {tool.description}
      </p>
      <Link
        to={`/tools/${tool.slug}`}
        className={`relative mt-4 inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-bold outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111827] ${tool.linkStyle}`}
        aria-label={`Use ${tool.title}`}
      >
        Try now
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </article>
  )
}

export default ToolCard

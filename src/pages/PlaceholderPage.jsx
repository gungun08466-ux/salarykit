/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import tools from '../data/tools.js'

function PlaceholderPage({ title, notFound = false }) {
  const { toolId } = useParams()
  const tool = tools.find((item) => item.slug === toolId)
  const pageTitle = title || tool?.title || 'Page not found'
  const pageNotFound = notFound || (!title && !tool)

  return (
    <section className="grid min-h-[55vh] place-items-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-[0_12px_36px_rgba(15,35,65,0.06)] sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          <Clock3 aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          {pageNotFound ? 'Not found' : 'Coming soon'}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          {pageTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          {pageNotFound
            ? 'We could not find that page. Head back to SalaryKit to explore the available tools.'
            : 'This is a placeholder for now. SalaryKit tools and pages will be added here as the toolkit grows.'}
        </p>
        <Link
          to="/#tools"
          className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white outline-none hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {pageNotFound ? (
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          ) : null}
          Back to SalaryKit
          {!pageNotFound ? (
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          ) : null}
        </Link>
      </div>
    </section>
  )
}

export default PlaceholderPage

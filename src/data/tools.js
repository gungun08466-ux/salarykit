import {
  ArrowLeftRight,
  Briefcase,
  Calculator,
  PieChart,
} from 'lucide-react'

const tools = [
  {
    slug: 'salary-hike',
    title: 'Salary Hike Calculator',
    description:
      'Find out how a raise could change your salary with a clear before-and-after estimate.',
    icon: Calculator,
    iconStyle: 'bg-blue-600 text-white',
    cardStyle: 'border-blue-100 bg-gradient-to-br from-sky-50 to-blue-100',
    linkStyle: 'text-blue-800 hover:text-blue-950',
  },
  {
    slug: 'salary-converter',
    title: 'Salary Converter',
    description:
      'Convert amounts across six currencies using dated reference rates.',
    icon: ArrowLeftRight,
    iconStyle: 'bg-emerald-600 text-white',
    cardStyle: 'border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-100',
    linkStyle: 'text-emerald-800 hover:text-emerald-950',
  },
  {
    slug: 'job-offer-comparison',
    title: 'Job Offer Comparison',
    description:
      'Compare compensation details side by side before choosing an offer.',
    icon: Briefcase,
    iconStyle: 'bg-violet-600 text-white',
    cardStyle: 'border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-100',
    linkStyle: 'text-violet-800 hover:text-violet-950',
  },
  {
    slug: 'salary-breakdown',
    title: 'Salary Breakdown Calculator',
    description:
      'See how an annual salary translates into common pay periods.',
    icon: PieChart,
    iconStyle: 'bg-orange-500 text-white',
    cardStyle: 'border-orange-100 bg-gradient-to-br from-orange-50 to-amber-100',
    linkStyle: 'text-orange-800 hover:text-orange-950',
  },
]

export default tools

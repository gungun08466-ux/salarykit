import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import JobOfferComparisonPage from './pages/JobOfferComparisonPage.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import SalaryBreakdownCalculatorPage from './pages/SalaryBreakdownCalculatorPage.jsx'
import SalaryHikeCalculatorPage from './pages/SalaryHikeCalculatorPage.jsx'
import SalaryHikeGuidePage from './pages/SalaryHikeGuidePage.jsx'
import SalaryConverterPage from './pages/SalaryConverterPage.jsx'

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tools/salary-hike"
          element={<SalaryHikeCalculatorPage />}
        />
        <Route
          path="/guides/salary-hike-guide"
          element={<SalaryHikeGuidePage />}
        />
        <Route
          path="/tools/salary-converter"
          element={<SalaryConverterPage />}
        />
        <Route
          path="/tools/job-offer-comparison"
          element={<JobOfferComparisonPage />}
        />
        <Route
          path="/tools/salary-breakdown"
          element={<SalaryBreakdownCalculatorPage />}
        />
        <Route path="/tools/:toolId" element={<PlaceholderPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="*"
          element={<PlaceholderPage title="Page not found" notFound />}
        />
      </Routes>
    </SiteLayout>
  )
}

export default App

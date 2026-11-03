import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import IntroLoader from './IntroLoader'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Layout from './components/Layout'
import WorkplaceWellbeing from './pages/WorkplaceWellbeing'
import ChildrenWellbeing from './pages/ChildrenWellbeing'
import Tranquillium from './pages/Tranquillium'
import About from './pages/About'
import Resources from './pages/Resources'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminLayout from './admin/components/Layout'
import AdminLogin from './admin/pages/Login'
import AdminDashboard from './admin/pages/Dashboard'
import AdminBookings from './admin/pages/Bookings'
import AdminEnquiries from './admin/pages/Enquiries'
import AdminArticles from './admin/pages/Articles'
import AdminServices from './admin/pages/Services'
import AdminAvailability from './admin/pages/Availability'
import AdminSettings from './admin/pages/Settings'


export default function App() {
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem('introShown'))
  useEffect(() => {
    if (showLoader) {
      const t = setTimeout(() => {
        setShowLoader(false)
        sessionStorage.setItem('introShown', '1')
      }, 2000)
      return () => clearTimeout(t)
    }
  }, [showLoader])
  return (
    <>
      <AnimatePresence>{showLoader && <IntroLoader onComplete={() => { setShowLoader(false); sessionStorage.setItem('introShown','1') }} />}</AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workplace-wellbeing" element={<Layout><WorkplaceWellbeing /></Layout>} />
          <Route path="/children-wellbeing" element={<Layout><ChildrenWellbeing /></Layout>} />
          <Route path="/tranquillium" element={<Layout><Tranquillium /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/resources/:slug" element={<Layout><Article /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
<Route path="/book-appointment" element={<Layout><Booking /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="availability" element={<AdminAvailability />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

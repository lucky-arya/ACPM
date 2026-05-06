import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RevealOverlay from './components/RevealOverlay';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import MembershipPage from './pages/MembershipPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import AdminPanel from './pages/AdminPanel';
import NotFoundPage from './pages/NotFoundPage';

const EventsPage = lazy(() => import('./pages/EventsPage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col">
      <RevealOverlay />
      <ScrollToTop />
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center bg-gray-50 text-gray-600">
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HardwareStats from './components/HardwareStats';
import PricingGrid from './components/PricingGrid';
import ReviewsTicker from './components/ReviewsTicker';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import EmailConfirmation from './components/EmailConfirmation';

type ConfirmationType = 'register' | 'subscribe' | null;

function App() {
  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);
  const [confirmationType, setConfirmationType] = useState<ConfirmationType>(null);

  useEffect(() => {
    // Check for confirmation token in URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // Determine confirmation type from current path
      const path = window.location.pathname;
      if (path.includes('confirm-register')) {
        setConfirmationType('register');
      } else if (path.includes('confirm-email')) {
        setConfirmationType('subscribe');
      } else {
        // Default to subscribe for backwards compatibility
        setConfirmationType('subscribe');
      }
      
      setConfirmationToken(token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (confirmationToken) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <EmailConfirmation token={confirmationToken} type={confirmationType} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />
      <HeroSection />
      <HardwareStats />
      <PricingGrid />
      <ReviewsTicker />
      <FAQAccordion />
      <Footer />
    </div>
  );
}

export default App;

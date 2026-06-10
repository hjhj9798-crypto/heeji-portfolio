
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Project, AboutData, HomeData, ContactData } from './types';
import { INITIAL_PROJECTS, INITIAL_ABOUT, INITIAL_HOME, INITIAL_CONTACT } from './data';

// Pages
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const sectionRatios = useRef<Record<string, number>>({});

  // Handle Navbar Visibility on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // If at the very top, always show
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, do not auto-show when scrolling up
        if (currentScrollY > lastScrollY.current && !isScrollingRef.current) {
          setIsVisible(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        sectionRatios.current[entry.target.id] = entry.intersectionRatio;
      });

      const entriesList = Object.entries(sectionRatios.current) as [string, number][];
      
      const winner = entriesList.reduce<{ id: string; ratio: number }>(
        (max, [id, ratio]) => (ratio > max.ratio ? { id, ratio } : max),
        { id: 'home', ratio: 0 }
      );

      if (winner.ratio > 0) {
        setActiveSection(winner.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionIds = ['home', 'showreel', 'projects', 'about', 'contact'];
    
    const timeoutId = setTimeout(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  const scrollToSection = useCallback((id: string) => {
    const performScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        let offsetPosition;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        
        if (id === 'home') {
          offsetPosition = 0;
        } else if (id === 'showreel') {
          const viewportHeight = window.innerHeight;
          const elementHeight = el.clientHeight;
          offsetPosition = elementPosition - (viewportHeight - elementHeight) / 2;
        } else {
          const offset = 100; 
          offsetPosition = elementPosition - offset;
        }
        
        isScrollingRef.current = true;
        setActiveSection(id);
        setIsVisible(true); 
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = window.setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }
  }, [location.pathname, navigate]);

  const navLinkClass = (id: string) => {
    const isActive = activeSection === id;
    return `${isActive ? 'text-blue-500 scale-110' : 'text-gray-500'} hover:text-white transition-all duration-300 uppercase cursor-pointer relative h-full flex items-center px-2 md:px-4 lg:px-8 text-[14px] md:text-[16px] lg:text-[20px] font-bold tracking-[0.1em] md:tracking-[0.15em] outline-none`;
  };

  const pdfLinkClass = () => {
    return 'text-gray-500 hover:text-white transition-all duration-300 uppercase cursor-pointer relative h-full flex items-center px-2 md:px-4 lg:px-8 text-[14px] md:text-[16px] lg:text-[20px] font-bold tracking-[0.1em] md:tracking-[0.15em] outline-none';
  };

  const navTransform = (isVisible || isHoveringTrigger) ? 'translateY(0)' : 'translateY(-100%)';

  return (
    <>
      {/* Invisible Trigger Area at Top */}
      <div 
        className="hidden md:block fixed top-0 left-0 w-full h-12 z-[60] pointer-events-auto"
        onMouseEnter={() => setIsHoveringTrigger(true)}
        onMouseLeave={() => setIsHoveringTrigger(false)}
      />
      
      <nav 
        className={`hidden md:flex fixed top-0 left-0 w-full z-[70] h-20 md:h-24 transition-all duration-500 ease-in-out ${
          (isVisible || isHoveringTrigger) ? 'pointer-events-auto' : 'pointer-events-none'
        } ${
          isScrolled ? 'bg-[#0b0e14]/80 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ transform: navTransform }}
        onMouseEnter={() => setIsHoveringTrigger(true)}
        onMouseLeave={() => setIsHoveringTrigger(false)}
      >
        <div className="max-w-[1920px] mx-auto w-full h-full px-4 md:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          {/* Mobile Logo/Name */}
          <div className={`md:hidden transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-blue-500 font-bold tracking-tighter text-sm uppercase">H.WOO</span>
          </div>

          {/* Left Side: Desktop PDF Links */}
          <div className="hidden md:flex items-stretch h-full">
            <button 
              onClick={() => {
                if (INITIAL_HOME.portfolioPdfUrl) {
                  window.open(INITIAL_HOME.portfolioPdfUrl, '_blank');
                }
              }} 
              className={pdfLinkClass()}
            >
              PORTFOLIO PDF
            </button>
            <button 
              onClick={() => {
                if (INITIAL_HOME.resumePdfUrl) {
                  window.open(INITIAL_HOME.resumePdfUrl, '_blank');
                }
              }} 
              className={pdfLinkClass()}
            >
              RESUME
            </button>
          </div>

          <div className="flex gap-2 md:gap-4 lg:gap-8 items-stretch h-full">
            <button onClick={() => scrollToSection('home')} className={navLinkClass('home')}>HOME</button>
            <button onClick={() => scrollToSection('showreel')} className={navLinkClass('showreel')}>SHOWREEL</button>
            <button onClick={() => scrollToSection('projects')} className={navLinkClass('projects')}>PROJECTS</button>
            <button onClick={() => scrollToSection('about')} className={navLinkClass('about')}>ABOUT</button>
            <button onClick={() => scrollToSection('contact')} className={navLinkClass('contact')}>CONTACT</button>
          </div>
        </div>
      </nav>
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="py-20 px-8 md:px-16 border-t border-white/5 bg-[#0b0e14]">
    <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="space-y-2 text-center md:text-left">
        <p className="text-blue-500 font-bold tracking-tight text-2xl uppercase">HEEJI WOO</p>
        <p className="text-gray-600 text-[16px] uppercase tracking-[0.15em] font-bold">© HEEJI WOO. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  // Use data from INITIAL constants directly to avoid stale localStorage issues
  const projects = INITIAL_PROJECTS;
  const about = INITIAL_ABOUT;
  const home = INITIAL_HOME;
  const contact = INITIAL_CONTACT;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home projects={projects} about={about} home={home} contact={contact} />} />
            <Route path="/projects/:id" element={<ProjectDetail projects={projects} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;

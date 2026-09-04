import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_PROJECTS, INITIAL_ABOUT, INITIAL_HOME, INITIAL_CONTACT } from './data';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import './portfolio.css';
import './refinements.css';

function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash, location.key]);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="downloads"><a href={INITIAL_HOME.portfolioPdfUrl} target="_blank" rel="noopener noreferrer">Portfolio PDF</a><a href={INITIAL_HOME.resumePdfUrl} target="_blank" rel="noopener noreferrer">Resume</a></div>
    <Link to="/" className="wordmark">HEEJI WOO</Link>
    <nav aria-label="Main navigation"><Link to="/#home">Home</Link><Link to="/#projects">Work</Link><Link to="/#about">About</Link><Link to="/#contact">Contact</Link></nav>
  </header>;
}
export default function App() {
  return <HashRouter><Navigation/><main><Routes>
    <Route path="/" element={<Home projects={INITIAL_PROJECTS} about={INITIAL_ABOUT} home={INITIAL_HOME} contact={INITIAL_CONTACT}/>}/>
    <Route path="/projects/:id" element={<ProjectDetail projects={INITIAL_PROJECTS}/>}/>
    <Route path="*" element={<div className="not-found"><h1>Page not found</h1><Link to="/">Back to home</Link></div>}/>
  </Routes></main><footer className="site-footer"><Link to="/">HEEJI WOO</Link><span>© {new Date().getFullYear()} Heeji Woo</span></footer></HashRouter>;
}

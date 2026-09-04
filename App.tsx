import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigationType } from 'react-router-dom';
import { INITIAL_PROJECTS, INITIAL_ABOUT, INITIAL_HOME, INITIAL_CONTACT } from './data';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import './portfolio.css';
import './refinements.css';

const savedPositions = new Map<string, number>();
let lastHomePosition: number | undefined;
function Navigation() {
  const navigationType = useNavigationType();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const saved = savedPositions.get(location.key);
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (location.pathname === '/' && location.state?.restoreHome && lastHomePosition !== undefined) window.scrollTo({top:lastHomePosition,behavior:'instant'});
    else if (navigationType === 'POP' && saved !== undefined) window.scrollTo({top:saved,behavior:'instant'});
    else if (target) target.scrollIntoView({behavior:'instant'});
    else window.scrollTo({top:0,behavior:'instant'});
    const remember = () => { savedPositions.set(location.key, window.scrollY); if(location.pathname === '/') lastHomePosition = window.scrollY; };
    window.addEventListener('scroll', remember, {passive:true});
    return () => { window.removeEventListener('scroll', remember); history.scrollRestoration = previous; };
  }, [location.pathname, location.search, location.hash, location.key, navigationType]);
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

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADDITIONAL_WORK_EXTRA_PROJECTS } from './extraProjects';

export const additionalThumbnails: Record<string, string> = {
  architect: 'Architect_Thumbnail.png', raven: 'Raven2_Deathbringer_Thumbnail.png', valhalla_survival: 'Valhalla_Thumbnail.png',
  'raven2-warlord': 'Raven2_Warlord_Thumbnail.png', 'vampir-cinematic-01': 'Vampir_Cinematic01_Thumbnail.png',
  'vampir-cinematic-02': 'Vampir_Cinematic02_Thumbnail.png', zeus: 'Zeus_Thumbnail.png'
};
export default function AdditionalCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setBounds({ start: element.scrollLeft < 2, end: element.scrollLeft >= element.scrollWidth - element.clientWidth - 2 });
    update(); const observer = new ResizeObserver(update); observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener('scroll', update); };
  }, []);
  const move = (direction: number) => {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * (element.firstElementChild?.getBoundingClientRect().width || element.clientWidth), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <section className="additional-section" id="additional-work" aria-labelledby="additional-heading">
    <div className="carousel-controls"><button aria-label="Previous additional project" disabled={bounds.start} onClick={() => move(-1)}>‹</button><button aria-label="Next additional project" disabled={bounds.end} onClick={() => move(1)}>›</button></div>
    <div className="additional-label"><h2 id="additional-heading">ADDITIONAL<br/>WORK</h2></div>
    <div className="carousel-track" ref={track} tabIndex={0} role="region" aria-label="Additional projects" onKeyDown={e => { if(e.target === e.currentTarget && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); } }}>
      {ADDITIONAL_WORK_EXTRA_PROJECTS.map(project => <Link className="additional-card" key={project.id} to={`/projects/additional-work?work=${encodeURIComponent(project.id)}`}><img src={`/images/redesign-20260903/${additionalThumbnails[project.id]}`} alt={project.title} loading="lazy" decoding="async"/><span className="card-caption">{project.title}</span></Link>)}
    </div>
  </section>;
}

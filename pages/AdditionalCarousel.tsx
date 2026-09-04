import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADDITIONAL_WORK_EXTRA_PROJECTS } from './extraProjects';

export const additionalThumbnails: Record<string, string> = {
  architect: 'Architect_Thumbnail.png', raven: 'Raven2_Deathbringer_Thumbnail.png', valhalla_survival: 'Valhalla_Thumbnail.png',
  'raven2-warlord': 'Raven2_Warlord_Thumbnail.png', 'vampir-cinematic-01': 'Vampir_Cinematic01_Thumbnail.png',
  'vampir-cinematic-02': 'Vampir_Cinematic02_Thumbnail.png', zeus: 'Zeus_Thumbnail.png'
};
let savedCarouselLeft = 0;
export default function AdditionalCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);
  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    element.scrollLeft = savedCarouselLeft;
    const update = () => {
      savedCarouselLeft = element.scrollLeft;
      const max = element.scrollWidth - element.clientWidth;
      setBounds({ start: element.scrollLeft < 2, end: element.scrollLeft >= max - 2 });
      setProgress(max > 0 ? element.scrollLeft / max * 1000 : 0);
    };
    const wheel = (event: WheelEvent) => {
      if(event.ctrlKey) return;
      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const delta = raw * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1);
      const max = element.scrollWidth - element.clientWidth;
      if((delta > 0 && element.scrollLeft < max - 1) || (delta < 0 && element.scrollLeft > 1)) {
        event.preventDefault(); element.scrollLeft = Math.max(0, Math.min(max, element.scrollLeft + delta));
      }
    };
    update(); const observer = new ResizeObserver(update); observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    element.addEventListener('wheel', wheel, { passive: false });
    return () => { observer.disconnect(); element.removeEventListener('scroll', update); element.removeEventListener('wheel', wheel); };
  }, []);
  const move = (direction: number) => {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * (element.firstElementChild?.getBoundingClientRect().width || element.clientWidth), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <section className="additional-section" id="additional-work" aria-labelledby="additional-heading">
    <div className="carousel-controls"><button aria-label="Previous additional project" disabled={bounds.start} onClick={() => move(-1)}>‹</button><button aria-label="Next additional project" disabled={bounds.end} onClick={() => move(1)}>›</button></div>
    <div className="additional-label"><h2 id="additional-heading">ADDITIONAL<br/>WORK</h2></div>
    <div className="carousel-track" ref={track} tabIndex={0} role="region" aria-label="Additional projects" onKeyDown={e => { if(e.target === e.currentTarget && ['ArrowLeft','ArrowRight'].includes(e.key)) { e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); } }}>
      {[...ADDITIONAL_WORK_EXTRA_PROJECTS].sort((a,b) => ['extra01','extra02','valhalla_survival','vampir-cinematic-01','architect','zeus','raven2-warlord','raven','vampir-cinematic-02'].indexOf(a.id) - ['extra01','extra02','valhalla_survival','vampir-cinematic-01','architect','zeus','raven2-warlord','raven','vampir-cinematic-02'].indexOf(b.id)).map(project => <Link className="additional-card" key={project.id} to={`/projects/additional-work?work=${encodeURIComponent(project.id)}`}><img src={project.id === 'extra01' || project.id === 'extra02' ? `/images/polish-20260904/Sol_Extra${project.id === 'extra01' ? '01' : '02'}_Thumbnail.png` : additionalThumbnails[project.id] ? `/images/redesign-20260903/${additionalThumbnails[project.id]}` : project.images.find(image => image.category === 'Beauty')?.url} alt={project.title} loading="lazy" decoding="async"/><span className="card-caption">{project.title}</span></Link>)}
    </div>
    <input className="carousel-slider" type="range" min="0" max="1000" step="1" value={progress} aria-label="Additional work scroll position" onChange={event => {
      const element = track.current;
      if(element) element.scrollLeft = Number(event.target.value) / 1000 * (element.scrollWidth - element.clientWidth);
    }}/>
  </section>;
}

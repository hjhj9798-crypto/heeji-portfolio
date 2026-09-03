import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ADDITIONAL_WORK_EXTRA_PROJECTS } from './ProjectDetail';

const AdditionalCarousel: React.FC = () => {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false, progress: 0 });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setPosition({ start: element.scrollLeft <= 2, end: max <= 2 || element.scrollLeft >= max - 2, progress: max > 0 ? element.scrollLeft / max : 0 });
    };
    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);

  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : element.clientWidth;
    element.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <section id="additional-work" aria-labelledby="additional-heading" className="relative mt-12 md:mt-20 py-8 md:py-12 overflow-hidden scroll-mt-24">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.64), rgba(0,0,0,.18) 55%, transparent)' }} />
      <div className="relative flex items-center justify-between gap-4 px-4 md:px-6 mb-6 md:mb-8">
        <h3 id="additional-heading" className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">ADDITIONAL WORK</h3>
        <div className="flex gap-2 shrink-0">
          <button type="button" aria-label="Previous additional project" disabled={position.start} onClick={() => move(-1)} className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-blue-400/50 text-blue-300 text-2xl hover:bg-blue-500/10 disabled:opacity-25 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">←</button>
          <button type="button" aria-label="Next additional project" disabled={position.end} onClick={() => move(1)} className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-blue-400/50 text-blue-300 text-2xl hover:bg-blue-500/10 disabled:opacity-25 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">→</button>
        </div>
      </div>
      <div ref={track} role="region" aria-label="Additional work projects" tabIndex={0} onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }} className="relative flex gap-5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-4 md:px-6 pb-4 scroller-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400" style={{ scrollbarWidth: 'none' }}>
        {ADDITIONAL_WORK_EXTRA_PROJECTS.map(extra => {
          const thumbnail = extra.id === 'architect' ? '/images/architect/Book_AI.png' : extra.images.find(image => image.category === 'Beauty')?.url;
          return (
            <Link key={extra.id} to={`/projects/additional-work?work=${encodeURIComponent(extra.id)}`} className="group block flex-none w-[82%] sm:w-[46%] lg:w-[30%] snap-start rounded-xl border border-white/10 overflow-hidden bg-[#11161e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
              <div className="aspect-[4/3] overflow-hidden bg-[#161b22]">
                <img src={thumbnail} alt={extra.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105" />
              </div>
              <div className="px-4 py-5 bg-gradient-to-r from-black/50 to-transparent">
                <h4 className="font-bold text-sm sm:text-base md:text-lg text-white uppercase tracking-tight group-hover:text-blue-300">{extra.title}</h4>
              </div>
            </Link>
          );
        })}
      </div>
      <div aria-hidden="true" className="relative mt-5 mx-auto h-0.5 w-40 md:w-72 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-blue-400 rounded-full" style={{ transform: `translateX(${position.progress * 200}%)` }} />
      </div>
    </section>
  );
};

export default AdditionalCarousel;

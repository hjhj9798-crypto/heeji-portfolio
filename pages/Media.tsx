import React, { useEffect, useRef, useState } from 'react';

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  let src = url;
  try {
    const parsed = new URL(url);
    const id = parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v');
    if (id) src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    else if (parsed.hostname.includes('youtube.com')) src = url.replace('www.youtube.com', 'www.youtube-nocookie.com');
  } catch { /* Local media URLs are handled below. */ }
  if (/\.(mp4|webm)(\?|$)/i.test(url)) return <video className="reel-player" src={url} controls playsInline preload="metadata" aria-label={title}/>;
  return <iframe className="reel-player" src={src} title={title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>;
}

export function LoopingVideo({ src, label, className = '', expandable = false }: { src: string; label: string; className?: string; expandable?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const fullscreen = useRef<HTMLDialogElement>(null);
  const expandedVideo = useRef<HTMLVideoElement>(null);
  const playbackTime = useRef(0);
  useEffect(() => {
    if(!expanded) return;
    const modal = fullscreen.current;
    if(!modal) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const playing = Array.from(document.querySelectorAll('video')).filter(video => video !== expandedVideo.current && !video.paused);
    playing.forEach(video => video.pause());
    modal.showModal();
    const close = () => setExpanded(false);
    const key = (event: KeyboardEvent) => { if(event.key === 'Escape') { event.preventDefault(); close(); } };
    const fsChange = () => { if(!document.fullscreenElement) close(); };
    document.addEventListener('keydown',key);
    document.addEventListener('fullscreenchange',fsChange);
    modal.requestFullscreen?.().catch(() => { /* The full-window dialog remains available. */ });
    return () => {
      document.removeEventListener('keydown',key); document.removeEventListener('fullscreenchange',fsChange);
      if(expandedVideo.current) playbackTime.current = expandedVideo.current.currentTime;
      if(document.fullscreenElement === modal) document.exitFullscreen().catch(() => {});
      modal.close(); document.body.style.overflow = previous;
      if(ref.current) ref.current.currentTime = playbackTime.current;
      playing.forEach(video => { const rect = video.getBoundingClientRect(); if(rect.bottom > 0 && rect.top < innerHeight) video.play().catch(() => {}); });
    };
  }, [expanded]);
  const [loaded, setLoaded] = useState(false);
  const [controls, setControls] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setControls(reduced);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        if (!reduced && video.currentSrc) video.play().catch(() => setControls(true));
      } else video.pause();
    }, { threshold: 0.05 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [src]);
  return <div className={`loop-media ${className}`}><video ref={ref} src={loaded ? src : undefined} muted loop playsInline controls={controls && !expandable} preload="none" aria-label={label} onLoadedData={() => {
    const video = ref.current;
    if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = video.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) video.play().catch(() => setControls(true));
    }
  }} onError={() => setFailed(true)}/>{expandable && <button className="video-expand" aria-label={`View ${label} fullscreen`} onClick={() => { playbackTime.current = ref.current?.currentTime || 0; setExpanded(true); }}><span>↗</span></button>}{failed && <a className="media-error" href={src}>Open video ↗</a>}
    {expanded && <dialog ref={fullscreen} className="video-fullscreen" aria-label={`${label} fullscreen; click anywhere or press Escape to close`} onCancel={() => setExpanded(false)} onClick={() => { playbackTime.current = expandedVideo.current?.currentTime || playbackTime.current; setExpanded(false); }}>
      <video ref={expandedVideo} src={src} muted loop playsInline autoPlay onLoadedMetadata={() => { if(expandedVideo.current) expandedVideo.current.currentTime = playbackTime.current; }}/>
      <button className="fullscreen-close" autoFocus aria-label="Close fullscreen video">×</button><span className="fullscreen-hint">Click anywhere or press Esc to close</span>
    </dialog>}
  </div>;
}

export function ImageGallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const isUV = title.toLowerCase().startsWith('uv');
  const [columns, setColumns] = useState(Math.max(1, Math.ceil(Math.sqrt(images.length))));
  useEffect(() => {
    if(!isUV || !grid.current) return;
    const element = grid.current;
    const update = () => {
      const width = element.clientWidth, height = element.clientHeight;
      let best = 1, size = 0;
      for(let c = 1; c <= images.length; c++) {
        const cell = Math.min((width - (c - 1) * 8) / c, (height - (Math.ceil(images.length / c) - 1) * 8) / Math.ceil(images.length / c));
        if(cell > size) {size = cell; best = c;}
      }
      setColumns(best);
    };
    const observer = new ResizeObserver(update); observer.observe(element); update();
    return () => observer.disconnect();
  }, [isUV, images.length]);
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = previous; };
  }, [index === null]);
  if (!images.length) return null;
  const step = (direction: number) => setIndex(current => current === null ? null : (current + direction + images.length) % images.length);
  return <section className={`media-section ${isUV ? 'uv-section' : ''}`}><h2>{title}</h2><div ref={grid} className={`image-grid ${isUV ? 'uv-grid' : ''}`} style={isUV ? {gridTemplateColumns:`repeat(${columns}, minmax(0, 1fr))`,gridTemplateRows:`repeat(${Math.ceil(images.length / columns)}, minmax(0, 1fr))`} : undefined}>{images.map((url, i) => <button className="gallery-image" type="button" key={`${url}-${i}`} onClick={() => setIndex(i)} aria-label={`Enlarge ${title} image ${i + 1}`}><img src={url} alt={`${title} — ${i + 1}`} loading="lazy" decoding="async"/></button>)}</div>
    {index !== null && <dialog ref={dialog} className="lightbox" aria-label={`${title} enlarged image`} onCancel={() => setIndex(null)} onClick={e => { if(e.target === e.currentTarget) setIndex(null); }} onKeyDown={e => { if(e.key === 'ArrowRight') step(1); if(e.key === 'ArrowLeft') step(-1); }}>
      <button className="lightbox-close" aria-label="Close image" onClick={() => setIndex(null)} autoFocus>×</button><img src={images[index]} alt={`${title} — ${index + 1}`}/>
      {images.length > 1 && <><button className="lightbox-prev" aria-label="Previous image" onClick={() => step(-1)}>‹</button><button className="lightbox-next" aria-label="Next image" onClick={() => step(1)}>›</button></>}<span className="image-counter">{index + 1} / {images.length}</span>
    </dialog>}
  </section>;
}

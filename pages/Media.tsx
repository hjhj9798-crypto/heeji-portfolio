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

export function LoopingVideo({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
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
  return <div className={`loop-media ${className}`}><video ref={ref} src={loaded ? src : undefined} muted loop playsInline controls={controls} preload="none" aria-label={label} onLoadedData={() => {
    const video = ref.current;
    if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = video.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) video.play().catch(() => setControls(true));
    }
  }} onError={() => setFailed(true)}/>{failed && <a className="media-error" href={src}>Open video ↗</a>}</div>;
}

export function ImageGallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = previous; };
  }, [index === null]);
  if (!images.length) return null;
  const step = (direction: number) => setIndex(current => current === null ? null : (current + direction + images.length) % images.length);
  return <section className="media-section"><h2>{title}</h2><div className="image-grid">{images.map((url, i) => <button className="gallery-image" type="button" key={`${url}-${i}`} onClick={() => setIndex(i)} aria-label={`Enlarge ${title} image ${i + 1}`}><img src={url} alt={`${title} — ${i + 1}`} loading="lazy" decoding="async"/></button>)}</div>
    {index !== null && <dialog ref={dialog} className="lightbox" aria-label={`${title} enlarged image`} onCancel={() => setIndex(null)} onClick={e => { if(e.target === e.currentTarget) setIndex(null); }} onKeyDown={e => { if(e.key === 'ArrowRight') step(1); if(e.key === 'ArrowLeft') step(-1); }}>
      <button className="lightbox-close" aria-label="Close image" onClick={() => setIndex(null)} autoFocus>×</button><img src={images[index]} alt={`${title} — ${index + 1}`}/>
      {images.length > 1 && <><button className="lightbox-prev" aria-label="Previous image" onClick={() => step(-1)}>‹</button><button className="lightbox-next" aria-label="Next image" onClick={() => step(1)}>›</button></>}<span className="image-counter">{index + 1} / {images.length}</span>
    </dialog>}
  </section>;
}

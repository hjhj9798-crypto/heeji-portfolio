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
  const optimized = src.startsWith('/video/');
  const previewSrc = src.startsWith('/video/batch-20260904/') ? src : optimized ? src.replace('/video/', '/video/polish-20260904/') : src;
  const fullSrc = optimized && !src.endsWith('/main.mp4') ? previewSrc.replace(/\.mp4$/, '-hd.mp4') : previewSrc;
  const poster = optimized ? previewSrc.replace(/\.mp4$/, '.jpg') : undefined;
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
        if (!reduced && video.currentSrc && !document.hidden && !document.querySelector('dialog[open]')) video.play().catch(() => setControls(true));
      } else video.pause();
    }, { threshold: 0.05 });
    const preloader = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) { setLoaded(true); preloader.disconnect(); }
    }, {rootMargin:'400px'});
    const visibility = () => {
      if(document.hidden) video.pause();
      else { const rect=video.getBoundingClientRect(); if(!reduced && rect.bottom>0 && rect.top<innerHeight && !document.querySelector('dialog[open]')) video.play().catch(()=>{}); }
    };
    preloader.observe(video); observer.observe(video);
    document.addEventListener('visibilitychange',visibility);
    return () => { preloader.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange',visibility); video.pause(); };
  }, [src]);
  return <div className={`loop-media ${className}`}><video ref={ref} src={loaded ? previewSrc : undefined} poster={poster} muted loop playsInline controls={controls && !expandable} preload="auto" aria-label={label} onLoadedData={() => {
    const video = ref.current;
    if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = video.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0 && !document.hidden && !document.querySelector('dialog[open]')) video.play().catch(() => setControls(true));
    }
  }} onError={() => setFailed(true)}/>{expandable && <button className="video-expand" aria-label={`View ${label} fullscreen`} onClick={() => { playbackTime.current = ref.current?.currentTime || 0; setExpanded(true); }}><span>↗</span></button>}{failed && <a className="media-error" href={src}>Open video ↗</a>}
    {expanded && <dialog ref={fullscreen} className="video-fullscreen" aria-label={`${label} fullscreen; click anywhere or press Escape to close`} onCancel={() => setExpanded(false)} onClick={() => { playbackTime.current = expandedVideo.current?.currentTime || playbackTime.current; setExpanded(false); }}>
      <video ref={expandedVideo} src={fullSrc} poster={poster} muted loop playsInline autoPlay onLoadedMetadata={() => { if(expandedVideo.current) expandedVideo.current.currentTime = playbackTime.current; }}/>
      <button className="fullscreen-close" autoFocus aria-label="Close fullscreen video">×</button><span className="fullscreen-hint">Click anywhere or press Esc to close</span>
    </dialog>}
  </div>;
}

export function ImageGallery({ title, images, firstFull = false }: { title: string; images: string[]; firstFull?: boolean }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isUV = title.toLowerCase().startsWith('uv');
  const [ratios, setRatios] = useState<Record<string, number>>({});
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { dialog.current?.close(); document.body.style.overflow = previous; };
  }, [index === null]);
  if (!images.length) return null;
  const step = (direction: number) => setIndex(current => current === null ? null : (current + direction + images.length) % images.length);
  const renderImage = (url: string, i: number) => <button className="gallery-image" type="button" key={url + i} style={!isUV ? {flex: `${ratios[url] || 1.77778} 1 0`} : undefined} onClick={() => setIndex(i)} aria-label={`Enlarge ${title} image ${i+1}`}><img src={url} alt={`${title} — ${i+1}`} loading="lazy" decoding="async" onLoad={event => {
    const image=event.currentTarget;
    if(image.naturalHeight) setRatios(current => ({...current,[url]:image.naturalWidth/image.naturalHeight}));
  }}/></button>;
  const rows: number[][] = [];
  for(let i=0;i<images.length;) { const size=firstFull && i===0 ? 1 : 2; rows.push(Array.from({length:Math.min(size,images.length-i)},(_,j)=>i+j)); i+=size; }
  return <section className={`media-section ${isUV ? 'uv-section' : ''}`}><h2>{title}</h2><div className={isUV ? 'image-grid uv-grid' : 'image-rows'}>{isUV ? images.map(renderImage) : rows.map((row,i) => <div className={`gallery-row ${images.length === 1 || (firstFull && i === 0) ? 'single-media' : row.length === 1 ? 'odd-row' : ''}`} key={i}>{row.map(index=>renderImage(images[index],index))}</div>)}</div>
    {index !== null && <dialog ref={dialog} className="lightbox" aria-label={`${title} enlarged image`} onCancel={() => setIndex(null)} onClick={e => { if(e.target === e.currentTarget) setIndex(null); }} onKeyDown={e => { if(e.key === 'ArrowRight') step(1); if(e.key === 'ArrowLeft') step(-1); }}>
      <button className="lightbox-close" aria-label="Close image" onClick={() => setIndex(null)} autoFocus>×</button><img src={originalImage(images[index])} onError={event => { if(event.currentTarget.src !== images[index]) event.currentTarget.src = images[index]; }} onClick={() => setIndex(null)} alt={`${title} — ${index + 1}`}/>
      {images.length > 1 && <><button className="lightbox-prev" aria-label="Previous image" onClick={() => step(-1)}>‹</button><button className="lightbox-next" aria-label="Next image" onClick={() => step(1)}>›</button></>}<span className="image-counter">{index + 1} / {images.length}</span>
    </dialog>}
  </section>;
}

function originalImage(url: string) {
  const file = url.match(/hj_w-(sol01-(?:butty01|butty03|butty04|wire01|uv))\.jpg/i)?.[1];
  const originals: Record<string,string> = {'sol01-butty01':'Sol01_Butty01.png','sol01-butty03':'Sol01_Butty03.png','sol01-butty04':'Sol01_Butty04.png','sol01-wire01':'Sol01_Wire01.png','sol01-uv':'Sol01_UV.png'};
  return file ? `/images/fullsize-20260904/${originals[file.toLowerCase()]}` : url;
}

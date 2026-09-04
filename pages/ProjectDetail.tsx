import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Project } from '../types';
import { ADDITIONAL_WORK_EXTRA_PROJECTS, ExtraProjectData } from './extraProjects';
import AdditionalCarousel from './AdditionalCarousel';
import { ImageGallery, LoopingVideo, VideoEmbed } from './Media';
export { ADDITIONAL_WORK_EXTRA_PROJECTS } from './extraProjects';

function ProjectHero({title, image, role, year, tools, duration, description, credit}: {title:string;image?:string;role:string;year:string;tools:string;duration?:string;description:string;credit?:{name:string;url:string}}) {
  return <header className="detail-hero">{image && <img className="detail-cover" src={image} alt="" fetchPriority="high"/>}<div className="detail-shade"/><div className="project-info"><h1>{title}</h1><dl><div><dt>Role</dt><dd>{role}</dd></div><div><dt>Year</dt><dd>{year}</dd></div><div><dt>Tools</dt><dd>{tools}</dd></div>{duration && <div><dt>Duration</dt><dd>{duration}</dd></div>}</dl><p>{description}</p>{credit && <a className="credit-link" href={credit.url} target="_blank" rel="noopener noreferrer">Original concept: {credit.name} ↗</a>}</div></header>;
}
function Clips({title, sources}: {title:string;sources?:string[]}) {
  return sources?.length ? <section className="media-section"><h2>{title}</h2><div className="video-grid">{sources.map((src,i) => <LoopingVideo expandable key={src} src={src} label={`${title} ${i + 1}`}/>)}</div></section> : null;
}
function ExtraContent({project, supporting = false}: {project:ExtraProjectData;supporting?:boolean}) {
  const beauty = project.images.filter(image => image.category === 'Beauty').map(image => image.url);
  return <article className={supporting ? 'supporting-project' : ''}>
    {supporting ? <div className="supporting-info"><h2>{project.title}</h2><p>{project.role} · {project.year}</p><p>{project.tools}</p>{project.duration && <p>{project.duration}</p>}<p>{project.description}</p></div> : <ProjectHero title={project.title} image={project.id === 'extra01' ? '/images/hero-20260904/Sol01_Butty03.png' : project.id === 'architect' ? '/images/architect/Book_AI.png' : beauty[0]} role={project.role} year={project.year} tools={project.tools} duration={project.duration} description={project.description}/>}
    {project.youtubeUrl && <section className="media-section reel-section"><h2>Official Teaser</h2><VideoEmbed url={project.youtubeUrl} title={`${project.title} — Official Teaser`}/></section>}
    <ImageGallery title="Beauty" images={beauty} firstFull={project.id === 'raven'}/><Clips title="Beauty" sources={project.beautyVideos}/>
    <ImageGallery title="Clay & ZBrush" images={project.images.filter(image => image.category === 'Clay & Zbrush').map(image => image.url)}/>
    <ImageGallery title="Wireframe" images={project.images.filter(image => image.category === 'Wireframe').map(image => image.url)}/>
    <ImageGallery title="UV Layout" images={project.images.filter(image => image.category === 'UV layout').map(image => image.url)}/>
    <Clips title="Hair Simulation" sources={project.hairVideos}/><Clips title="Video Capture" sources={project.videoClips}/>
  </article>;
}
export default function ProjectDetail({projects}: {projects:Project[]}) {
  const {id} = useParams();
  const location = useLocation();
  const work = new URLSearchParams(location.search).get('work');
  if(id === 'additional-work') {
    const selected = ADDITIONAL_WORK_EXTRA_PROJECTS.find(project => project.id === work);
    if(!work) return <div className="additional-index"><h1>ADDITIONAL WORK</h1><AdditionalCarousel/></div>;
    if(!selected) return <div className="not-found"><h1>Project not found</h1><Link to="/#additional-work">Back to Additional Work</Link></div>;
    return <div className="project-detail" key={selected.id}><ExtraContent project={selected}/><div className="back-link"><Link to="/#additional-work" state={{restoreHome:true}}>← All Additional Work</Link></div></div>;
  }
  const project = projects.find(item => item.id === id);
  if(!project) return <div className="not-found"><h1>Project not found</h1><Link to="/#projects">Back to work</Link></div>;
  const reels = [project.mainVideoUrl, ...(project.additionalVideoUrls || [])].filter(Boolean) as string[];
  return <div className="project-detail" key={project.id}><ProjectHero title={project.title} image={project.id === '5' ? '/images/polish-20260904/Sol_Thumbnail.png' : project.thumbnail} role={project.role} year={project.year} tools={project.toolsUsed.join(' / ')} duration={project.workTime} description={project.description} credit={project.descriptionCredit}/>
    {reels.length > 0 && <section className="media-section reel-section"><h2>Reel</h2>{reels.map((url,i) => <VideoEmbed key={url} url={url} title={`${project.title} — Reel ${i + 1}`}/>)}</section>}
    <ImageGallery title="Beauty" images={project.detailRenders}/><ImageGallery title="Clay & ZBrush" images={project.clayRenders}/><ImageGallery title="Wireframe" images={project.wireframes}/><ImageGallery title="UV Layout" images={project.uvLayouts}/>
    {project.turntableVideoUrl && <section className="media-section"><h2>Turntable</h2><VideoEmbed url={project.turntableVideoUrl} title={`${project.title} — Turntable`}/></section>}
    <ImageGallery title="References" images={project.references}/>{project.technicalBreakdown && <section className="technical-section"><h2>Technical Breakdown</h2><p>{project.technicalBreakdown}</p></section>}

    <div className="back-link"><Link to="/#projects" state={{restoreHome:true}}>← All Work</Link></div>
  </div>;
}

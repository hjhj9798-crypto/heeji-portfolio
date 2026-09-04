import React from 'react';
import { Link } from 'react-router-dom';
import { Project, AboutData, HomeData, ContactData } from '../types';
import AdditionalCarousel from './AdditionalCarousel';
import { LoopingVideo, VideoEmbed } from './Media';

export default function Home({ projects, about, home, contact }: {projects: Project[]; about: AboutData; home: HomeData; contact: ContactData}) {
  return <>
    <section className="home-hero" id="home" aria-label="Heeji Woo portfolio"><h1 className="sr-only">{home.name} — {home.professionalTitle}</h1><LoopingVideo src="/video/refinement-20260904/main.mp4" label="Portfolio cinematic background"/><div className="hero-shade"/></section>
    <section className="showreel" id="showreel" aria-label="Showreel"><VideoEmbed url={home.heroVideoUrl} title="Heeji Woo — Showreel"/></section>
    <section className="project-grid" id="projects" aria-label="Selected work">{projects.filter(p => p.id !== 'additional-work').map(project => <Link key={project.id} className="project-card" to={`/projects/${project.id}`}><img src={project.id === '5' ? '/images/redesign-20260903/Sol_Thumbnail.png' : project.thumbnail} alt={project.title} loading="lazy" decoding="async"/><span className="card-caption">{project.title}<small>{project.role}</small></span></Link>)}</section>
    <AdditionalCarousel/>
    <section className="about-section" id="about"><h2>ABOUT</h2><p className="about-intro">{about.intro}</p><div className="about-columns">
      <section><h3 className="section-label">Work Experience</h3>{about.experience.map(item => <article className="cv-item" key={item.id}><div className="cv-title"><h4>{item.company}</h4><span>{item.period}</span></div><p className="muted">{item.role}{item.location && ` | ${item.location}`}</p><p>{item.description}</p></article>)}</section>
      <div><section><h3 className="section-label">Education</h3>{about.education.map(item => <article className="cv-item" key={item.institution}><div className="cv-title"><h4>{item.institution}</h4><span>{item.year}</span></div><p className="muted">{item.degree}{item.location && ` | ${item.location}`}</p></article>)}</section>
      <section className="tools-section"><h3 className="section-label">Tools</h3><div className="tools-grid">{about.tools.map(category => <div key={category.category}><h4>{category.category}</h4><ul>{category.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section></div>
    </div></section>
    <section className="contact-section" id="contact"><h2>CONTACT</h2><a className="email-link" href={`mailto:${contact.email}`}>{contact.email} ↗</a><div><a href={contact.artstationUrl} target="_blank" rel="noopener noreferrer">ArtStation ↗</a><a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></section>
  </>;
}

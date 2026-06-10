
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { useReveal } from '../hooks/useReveal';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  useReveal();

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 md:py-24">
      <div className="mb-10 md:mb-20 reveal">
        <p className="text-[16px] tracking-[0.5em] text-gray-500 uppercase font-bold mb-4">Portfolio</p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase text-white">Selected Works</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 md:gap-y-20">
        {projects.map((project, idx) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="group reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
            <div className="relative aspect-video bg-[#111] mb-8 overflow-hidden border border-white/5 img-hover-container">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold text-2xl tracking-tight group-hover:text-gray-300 transition-colors uppercase">{project.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-[14px] text-gray-500 uppercase tracking-[0.3em] font-bold">{project.role}</span>
                <span className="h-[1px] w-8 bg-white/10"></span>
                <span className="text-[14px] text-gray-400 font-mono">{project.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;

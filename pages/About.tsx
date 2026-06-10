
import React from 'react';
import { AboutData } from '../types';
import { useReveal } from '../hooks/useReveal';

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  useReveal();

  return (
    <div className="max-w-7xl mx-auto px-10 py-12 md:py-24">
      <div className="space-y-12 md:space-y-24 reveal">
        {/* Added ABOUT label matching CONTACT style */}
        <div className="space-y-4">
          <p className="text-[12px] tracking-[0.5em] text-blue-500 uppercase font-bold">ABOUT</p>
        </div>

        {/* Top Section: Profile and Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] bg-[#111] border border-white/5 overflow-hidden img-hover-container">
              <img 
                src={data.profileImage} 
                alt="Heeji Woo Profile" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[12px] text-gray-600 uppercase tracking-[0.5em] font-bold">Bio</h2>
            <p className="text-gray-300 leading-relaxed text-lg md:text-2xl font-light italic">
              "{data.intro}"
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Left: Work Experience & Education */}
          <div className="lg:col-span-8 space-y-12 md:space-y-24">
            {/* Work Experience */}
            <section className="space-y-10">
              <h3 className="text-[12px] text-gray-600 uppercase tracking-[0.5em] font-bold pb-4 border-b border-white/5">Work Experience</h3>
              <div className="space-y-12">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="space-y-3 group">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg md:text-2xl font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{exp.company}</h4>
                      <span className="text-[11px] text-gray-600 font-mono font-bold tracking-widest">{exp.period}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                      {exp.role} {exp.location && <span className="text-gray-600 ml-2 font-normal">/ {exp.location}</span>}
                    </p>
                    <p className="text-base text-gray-400 leading-relaxed mt-4 max-w-xl font-light">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Education */}
            <section className="space-y-10 pb-12 md:pb-24">
              <h3 className="text-[12px] text-gray-600 uppercase tracking-[0.5em] font-bold pb-4 border-b border-white/5">Education</h3>
              <div className="space-y-12">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="space-y-3 group">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-lg md:text-2xl font-bold text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">{edu.institution}</h4>
                      <span className="text-[11px] text-gray-600 font-mono font-bold tracking-widest">{edu.year}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                      {edu.degree} {edu.location && <span className="text-gray-600 ml-2 font-normal">/ {edu.location}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Skills */}
          <div className="lg:col-span-4">
            <section className="space-y-10">
              <h3 className="text-[12px] text-gray-600 uppercase tracking-[0.5em] font-bold pb-4 border-b border-white/5">Skills</h3>
              <div className="space-y-12">
                {data.tools.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-[11px] text-blue-500 uppercase tracking-[0.3em] font-bold">{cat.category}</h4>
                    <ul className="space-y-3">
                      {cat.items.map((item, i) => (
                        <li key={i} className="text-gray-400 font-light hover:text-white transition-colors flex items-center gap-3">
                          <span className="w-1 h-1 bg-blue-600"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

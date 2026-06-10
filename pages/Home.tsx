
import React from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { Project, AboutData, HomeData, ContactData } from '../types';

interface HomeProps {
  projects: Project[];
  about: AboutData;
  home: HomeData;
  contact: ContactData;
}

const Home: React.FC<HomeProps> = ({ projects, about, home, contact }) => {
  useReveal();

  const handleOpenLink = (url: string) => {
    if (!url || url === '#') {
      alert('Link has not been set by the admin yet.');
      return;
    }
    window.open(url, '_blank');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const width = 600;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`,
      'GmailCompose',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="space-y-16 md:space-y-64 pb-16 md:pb-32">
      {/* 1. HERO SECTION */}
      <section 
        id="home" 
        className="relative flex flex-col items-center justify-center min-h-[95vh] w-full mx-auto px-8 md:px-12 lg:px-16 overflow-hidden scroll-mt-32 pt-20 pb-20 md:pt-24 md:pb-24 transition-all duration-500 bg-[#07090e]"
      >
        {home.backgroundGifUrl && (
          home.backgroundGifUrl.includes('.mp4') || home.backgroundGifUrl.includes('.webm') ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
              <source src={home.backgroundGifUrl} type="video/mp4" />
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
              style={{ backgroundImage: `url(${home.backgroundGifUrl})` }}
            />
          )
        )}
        
        {home.backgroundGifUrl && (
<>
  <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.68) 18%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0) 68%)'
    }}
  />
</>
        )}
        <div className="hero-glow z-0"></div>
        
        <div className="relative text-center space-y-2 md:space-y-2.5 reveal z-10 w-full max-w-7xl select-none">
          <p className="text-[18px] md:text-[24px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-blue-500 font-bold justify-center flex items-center">
            3D MODELER
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6.75rem] xl:text-[8.1rem] 2xl:text-[9.9rem] font-bold tracking-tighter text-white uppercase leading-none whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {home.name}
          </h1>
        </div>
      </section>

      {/* SHOWREEL SECTION */}
      <section id="showreel" className="w-full max-w-[1920px] mx-auto px-0 reveal py-12 md:py-24">
        <div className="space-y-8 w-full">
          <div className="flex items-center justify-center gap-4 px-8 md:px-16">
            <p className="text-[16px] md:text-[24px] uppercase tracking-[0.15em] text-blue-500 font-bold text-center">Show reel</p>
          </div>
          <div className="w-full aspect-video bg-black overflow-hidden relative shadow-2xl">
            <iframe 
              className="absolute inset-0 w-full h-full border-0"
              src={home.heroVideoUrl} 
              title={`${home.name} Showreel`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION */}
      <section id="projects" className="max-w-[1920px] mx-auto px-8 md:px-16 pt-16 md:pt-32 scroll-mt-32">
        <div className="mb-12 reveal">
          <div className="flex items-center gap-6">
            <p className="text-[20px] tracking-[0.15em] text-blue-500 uppercase font-bold">Projects</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-10">
          {projects.map((project, idx) => {
            const isAdditional = project.id === 'additional-work';
            return (
              <Link key={project.id} to={`/projects/${project.id}`} className="group reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className={`relative aspect-video bg-[#161b22] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 ${isAdditional ? 'flex items-center justify-center hover:border-blue-500/30' : 'img-hover-container'}`}>
                  {isAdditional ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center z-10">
                      <h3 className="text-white group-hover:text-blue-500 font-bold text-2xl md:text-5xl tracking-tight uppercase transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="w-16 h-[2px] bg-blue-500/20 group-hover:bg-blue-500 transform scale-x-50 group-hover:scale-x-100 transition-all duration-500 mt-6"></div>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-30 group-hover:scale-105 group-hover:brightness-50 group-hover:saturate-[0.8] transition-all duration-700" 
                      />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 text-center z-10">
                        <h3 
                          className="text-white font-bold text-2xl md:text-5xl tracking-tight uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 mb-4"
                          style={{ textShadow: '0 10px 30px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.5)' }}
                        >
                          {project.title}
                        </h3>
                        <div className="w-16 h-[2px] bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-150 mb-4"></div>
                        <span 
                          className="text-[20px] text-blue-400 uppercase tracking-[0.15em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100"
                          style={{ textShadow: '0 5px 15px rgba(0,0,0,1)' }}
                        >
                          {project.year}
                        </span>
                        <p 
                          className="text-[14px] text-gray-300 uppercase tracking-widest mt-4 max-w-[85%] transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 opacity-0 group-hover:opacity-100 flex flex-col gap-1.5"
                          style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                        >
                          <span className="font-semibold">{project.role}</span>
                          <span className="text-[12px] text-gray-400 font-medium tracking-[0.08em]">{project.projectType}</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="max-w-[1920px] mx-auto px-8 md:px-16 pt-16 md:pt-32 scroll-mt-32">
        <div className="space-y-16 reveal">
          <div className="space-y-4">
            <p className="text-[20px] tracking-[0.15em] text-blue-500 uppercase font-bold">ABOUT</p>
          </div>

          <div className="max-w-4xl">
            <p className="text-gray-300 leading-relaxed text-xl md:text-4xl font-light border-l-2 border-blue-600/30 pl-8">{about.intro}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-24 items-start pt-12">
            <div className="space-y-24">
              <section className="space-y-10">
                <h3 className="text-[12px] text-gray-500 uppercase tracking-[0.15em] font-bold pb-4 border-b border-white/5">Work Experience</h3>
                <div className="space-y-12">
                  {about.experience.map((exp) => (
                    <div key={exp.id} className="space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-0">
                        <h4 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{exp.company}</h4>
                        <span className="text-[12px] md:text-[18px] text-blue-600 font-mono font-bold tracking-widest">{exp.period}</span>
                      </div>
                      <p className="text-[12px] md:text-[18px] text-gray-500 uppercase tracking-[0.08em] font-bold flex flex-col md:flex-row md:items-center">
                        <span>{exp.role}</span>
                        {exp.location && <span className="text-gray-600 md:ml-2 font-normal">/ {exp.location}</span>}
                      </p>
                      <p className="text-xl text-gray-400 leading-relaxed mt-4 max-w-2xl font-light">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10">
                <h3 className="text-[12px] text-gray-500 uppercase tracking-[0.15em] font-bold pb-4 border-b border-white/5">Education</h3>
                <div className="space-y-12">
                  {about.education.map((edu, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 md:gap-0">
                        <h4 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{edu.institution}</h4>
                        <span className="text-[12px] md:text-[18px] text-blue-600 font-mono font-bold tracking-widest">{edu.year}</span>
                      </div>
                      <p className="text-[12px] md:text-[18px] text-gray-500 uppercase tracking-[0.08em] font-bold flex flex-col md:flex-row md:items-center">
                        <span>{edu.degree}</span>
                        {edu.location && <span className="text-gray-600 md:ml-2 font-normal">/ {edu.location}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="space-y-10">
              <h3 className="text-[12px] text-gray-500 uppercase tracking-[0.15em] font-bold pb-4 border-b border-white/5">Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {about.tools.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-[18px] text-blue-500 uppercase tracking-[0.12em] font-bold">{cat.category}</h4>
                    <ul className="space-y-3">
                      {cat.items.map((item, i) => (
                        <li key={i} className="text-gray-400 font-light flex items-center gap-3 text-lg">
                          <span className="w-1 h-1 bg-blue-600"></span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section id="contact" className="max-w-[1920px] mx-auto px-8 md:px-16 pt-16 md:pt-32 scroll-mt-[150px] reveal pb-24 md:pb-48 min-h-[60vh] flex flex-col justify-center">
        <div className="text-center space-y-24 relative overflow-hidden">
          <div className="space-y-6">
            <p className="text-[20px] tracking-[0.15em] text-blue-500 uppercase font-bold">CONTACT</p>
          </div>
          <div className="space-y-16">
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`}
              onClick={handleEmailClick}
              className="text-4xl md:text-5xl font-bold text-gray-300 pb-4 inline-block tracking-tight hover:text-blue-500 transition-all hover:scale-105 transform"
            >
              {contact.email}
            </a>
            <div className="flex flex-wrap justify-center gap-12 md:gap-x-20 gap-y-6 text-[14px] md:text-[22px] font-bold tracking-[0.15em]">
              <a href={home.resumePdfUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all hover:scale-110 transform inline-block">RESUME</a>
              <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all hover:scale-110 transform inline-block">LINKEDIN</a>
              <a href={contact.artstationUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-all hover:scale-110 transform inline-block">ARTSTATION</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

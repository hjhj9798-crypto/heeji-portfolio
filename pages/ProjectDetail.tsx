
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { useReveal } from '../hooks/useReveal';

interface ProjectDetailProps {
  projects: Project[];
}

const Lightbox: React.FC<{ 
  images: string[], 
  isOpen: boolean, 
  onClose: () => void, 
  initialIndex: number 
}> = ({ images, isOpen, onClose, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-12 transition-all backdrop-blur-sm select-none"
    >
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 text-white/40 hover:text-white text-4xl z-[210] transition-colors p-4 cursor-pointer"
        aria-label="Close Lightbox"
      >
        &times;
      </button>
      
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/10 hover:text-blue-500 text-5xl md:text-7xl z-[210] transition-colors p-6 cursor-pointer" aria-label="Previous">&lsaquo;</button>
          <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/10 hover:text-blue-500 text-5xl md:text-7xl z-[210] transition-colors p-6 cursor-pointer" aria-label="Next">&rsaquo;</button>
        </>
      )}
      
      <div 
        className="w-full h-full flex items-center justify-center animate-fade-in overflow-hidden" 
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Render ${currentIndex + 1}`} 
          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
        />
      </div>
      
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[11px] tracking-[0.15em] uppercase font-bold">
          {currentIndex + 1} <span className="text-white/10 mx-3">/</span> {images.length}
        </div>
      )}
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-12 pt-16 md:pt-32 border-t border-white/5 first:pt-0 first:border-0 reveal flex items-center gap-6">
    <h3 className="text-[10px] md:text-[20px] text-blue-500 uppercase tracking-[0.15em] font-bold">{children}</h3>
    <div className="flex-grow h-[1px] bg-white/5"></div>
  </div>
);

interface ExtraImage {
  category: 'Beauty' | 'Clay & Zbrush' | 'Wireframe' | 'UV layout';
  url: string;
}

interface ExtraProjectData {
  id: string;
  title: string;
  role: string;
  year: string;
  tools: string;
  duration: string;
  description: string;
  images: ExtraImage[];
  youtubeUrl?: string;
}

const EXTRA_PROJECTS: ExtraProjectData[] = [
  {
    id: 'extra01',
    title: 'SOL: Enchant - Extra01',
    role: 'Character Design & Facial Modeling & Texturing',
    year: '2025',
    tools: 'Maya / ZBrush / Substance 3D Painter / Unreal Engine 5',
    duration: 'Modelling - 3 Days / Texturing - 1 Day',
    description: 'Supporting character facial model for the SOL: Enchant cinematic trailer. The character was designed and developed by me, with a focus on realistic anatomy, skin detail, and battle-worn surface treatment.',
    images: [
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/718/896/large/hj_w-1.jpg?1780776058' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/704/large/hj_w-sol01-butty01.jpg?1780260797' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/710/large/hj_w-sol01-butty03.jpg?1780260807' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/799/large/hj_w-sol01-butty04.jpg?1780261073' },
      { category: 'Clay & Zbrush', url: 'https://cdna.artstation.com/p/assets/images/images/099/721/344/large/hj_w-.jpg?1780784892' },
      { category: 'Wireframe', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/750/large/hj_w-sol01-wire01.jpg?1780260904' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/747/large/hj_w-sol01-uv.jpg?1780260853' }
    ]
  },
  {
    id: 'extra02',
    title: 'SOL: Enchant - Extra02',
    role: 'Armor & Costume Modeling',
    year: '2025',
    tools: 'Maya / ZBrush / Unreal Engine 5',
    duration: 'Modelling - 1 Week',
    description: 'Armor and costume model rebuilt from a client-provided game asset for the SOL: Enchant cinematic trailer. Focused on form refinement, secondary detail enhancement, and cinematic-quality asset development.',
    images: [
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/718/743/large/hj_w-5.jpg?1780775568' },
      { category: 'Clay & Zbrush', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/990/large/hj_w-clray.jpg?1780261576' },
      { category: 'Wireframe', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/983/large/hj_w-sol02-wire.jpg?1780261562' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/963/large/hj_w-sol02-uv01.jpg?1780261535' },
      { category: 'UV layout', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/968/large/hj_w-sol02-uv02.jpg?1780261541' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/971/large/hj_w-sol02-uv03.jpg?1780261549' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/975/large/hj_w-sol02-uv04.jpg?1780261556' }
    ]
  }
];

const ADDITIONAL_WORK_EXTRA_PROJECTS: ExtraProjectData[] = [
  {
    id: 'raven',
    title: 'Raven 2',
    role: 'Asset Modeling & Texturing',
    year: '2025',
    tools: 'Maya / Substance 3D Painter / Unreal Engine 5',
    duration: 'Modelling - 2 Days / Texturing - 1 Day',
    description: 'Fantasy shield created for a cinematic trailer, with a focus on ornamental modeling, surface detailing, and material readability.',
    images: [
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/176/large/hj_w-.jpg?1780794018' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/258/large/hj_w-3.jpg?1780794377' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/723/253/large/hj_w-4.jpg?1780794362' }
    ],
    youtubeUrl: 'https://youtu.be/3cZzkhyeNJM?si=E4JO3QbJj8XDL2KN'
  },
  {
    id: 'valhalla_survival',
    title: 'Valhalla survival',
    role: 'Ornament Modeling & Hair Simulation',
    year: '2025',
    tools: 'Maya / Unreal Engine 5',
    duration: 'Modelling - 3 Days',
    description: 'Created high-poly ornamental accessories and footwear for a cinematic character, with an emphasis on intricate detailing and clean topology.',
    images: [
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/818/301/small/hj_w-4.jpg?1781054921' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/014/large/hj_w-1.jpg?1780793490' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/723/013/large/hj_w-3.jpg?1780793481' },
      { category: 'Clay & Zbrush', url: 'https://cdnb.artstation.com/p/assets/images/images/099/722/993/large/hj_w-clay.jpg?1780793395' },
      { category: 'Wireframe', url: 'https://cdna.artstation.com/p/assets/images/images/099/722/992/large/hj_w-wire01.jpg?1780793386' }
    ],
    youtubeUrl: 'https://youtu.be/ZXod-0yUYfU?si=WS8RdCB7qCYfaFlv'
  }
];

const ExtraProjectCard: React.FC<{ 
  extra: ExtraProjectData; 
  onImageClick: (images: string[], index: number) => void;
}> = ({ extra, onImageClick }) => {
  const firstCategory = extra.images[0]?.category || 'Beauty';
  const [activeTab, setActiveTab] = useState<string>(firstCategory);
  
  const tabs = ['Beauty', 'Clay & Zbrush', 'Wireframe', 'UV layout'];
  
  const filteredImages = extra.images.filter(img => img.category === activeTab);

  return (
    <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 reveal">
      {/* Visual Info Block (4 cols on lg, full on mobile) */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-8 select-none">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] md:text-xs text-blue-500 tracking-[0.15em] font-bold uppercase block">SUPPORTING ASSET</span>
            <h4 className="text-xl md:text-3xl font-bold tracking-tight text-white uppercase">{extra.title}</h4>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed border-l-2 border-blue-500/20 pl-4">
            {extra.description}
          </p>
          {extra.youtubeUrl && (
            <div className="pt-4">
              <a 
                href={extra.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-500 hover:text-white transition-all duration-300 font-bold text-xs tracking-wider uppercase border border-blue-500/30 hover:border-white/30 bg-blue-500/5 hover:bg-white/5 py-2 px-4 rounded-xl cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" />
                </svg>
                OFFICIAL TEASER
              </a>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5 text-sm md:text-[15px]">
          <div>
            <span className="text-[10px] md:text-xs text-blue-500 uppercase tracking-[0.15em] font-bold block mb-1">Role</span>
            <span className="text-gray-300 font-medium">{extra.role}</span>
          </div>
          <div>
            <span className="text-[10px] md:text-xs text-blue-500 uppercase tracking-[0.15em] font-bold block mb-1">Year / Duration</span>
            <span className="text-gray-300 font-medium">{extra.year} <span className="text-white/10 mx-2">|</span> {extra.duration}</span>
          </div>
          <div>
            <span className="text-[10px] md:text-xs text-blue-500 uppercase tracking-[0.15em] font-bold block mb-1">Tools</span>
            <span className="text-gray-300 font-medium">{extra.tools}</span>
          </div>
        </div>
      </div>

      {/* Interactive Gallery Block (8 cols on lg, full on mobile) */}
      <div className="lg:col-span-8 flex flex-col h-full space-y-6">
        {/* Gallery Tabs */}
        <div className="flex gap-2 border-b border-white/5 pb-2 overflow-x-auto scroller-hidden">
          {tabs.map((tab) => {
            // Count items in this tab
            const count = extra.images.filter(img => img.category === tab).length;
            if (count === 0) return null; // Hide tabs that have no images
            
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-500 border-blue-600/30 shadow-[0_0_12px_rgba(59,130,246,0.1)] outline-none' 
                    : 'text-gray-500 hover:text-white border-transparent hover:bg-white/[0.02] outline-none'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Gallery Display */}
        <div className="flex-grow">
          {filteredImages.length === 1 ? (
            <div
              onClick={() => onImageClick(filteredImages.map(item => item.url), 0)}
              className="w-full h-[240px] sm:h-[350px] md:h-[400px] lg:h-[440px] bg-[#161b22]/30 border border-white/5 overflow-hidden rounded-xl cursor-zoom-in group relative shadow-md flex items-center justify-center"
            >
              <img 
                src={filteredImages[0].url} 
                alt={`${extra.title} - ${filteredImages[0].category}`} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Thin overlay on hover */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-blue-500/20 rounded-xl" />
            </div>
          ) : activeTab === 'UV layout' ? (
            <div className={`grid gap-3 h-[240px] sm:h-[350px] md:h-[400px] lg:h-[440px] w-full ${
              filteredImages.length <= 2 ? 'grid-cols-2 grid-rows-1' :
              filteredImages.length <= 4 ? 'grid-cols-2 grid-rows-2' :
              filteredImages.length <= 6 ? 'grid-cols-3 grid-rows-2' :
              'grid-cols-4 grid-rows-2'
            }`}>
              {filteredImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => onImageClick(filteredImages.map(item => item.url), idx)}
                  className="bg-[#161b22]/30 border border-white/5 overflow-hidden rounded-xl cursor-zoom-in group relative shadow-md w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={img.url} 
                    alt={`${extra.title} - ${img.category}`} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Thin overlay on hover */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-blue-500/20 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid gap-3 h-[240px] sm:h-[350px] md:h-[400px] lg:h-[440px] w-full ${
              filteredImages.length === 2 ? 'grid-cols-2 grid-rows-1' :
              filteredImages.length === 3 ? 'grid-cols-3 grid-rows-1' :
              'grid-cols-2 grid-rows-2'
            }`}>
              {filteredImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => onImageClick(filteredImages.map(item => item.url), idx)}
                  className="bg-[#161b22]/30 border border-white/5 overflow-hidden rounded-xl cursor-zoom-in group relative shadow-md w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={img.url} 
                    alt={`${extra.title} - ${img.category}`} 
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {/* Thin overlay on hover */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-blue-500/20 rounded-xl" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  useReveal();

  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; index: number }>({
    isOpen: false,
    images: [],
    index: 0
  });

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, [id]);

  if (!project) {
    return (
      <div className="max-w-[1920px] mx-auto px-10 py-48 text-center reveal">
        <h2 className="text-2xl mb-8 font-light">Project not found</h2>
        <Link to="/" className="text-xs uppercase tracking-[0.1em] hover:text-blue-500 text-gray-700 transition-colors underline underline-offset-8">Back to projects</Link>
      </div>
    );
  }

  const openLightbox = (sectionImages: string[], index: number) => {
    setLightbox({ isOpen: true, images: sectionImages, index });
  };

  return (
    <div className="relative">
      {/* 1. FULLSCREEN HERO SECTION */}
      {project.id !== 'additional-work' && (
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Image Container */}
          <div 
            className="absolute inset-0 group"
          >
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            {/* Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 via-40% to-black/30 transition-opacity duration-700 group-hover:opacity-90"></div>
          </div>



          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-16 max-w-[1920px] mx-auto w-full z-10 pointer-events-none">
            <div className="max-w-6xl reveal active space-y-6 md:space-y-12 pointer-events-auto">
              <div className="space-y-2 md:space-y-4">
                {project.projectType && (
                  <span className="text-xs md:text-lg text-blue-500 uppercase tracking-[0.15em] font-bold block">
                    {project.projectType}
                  </span>
                )}
                <h1 className="text-xl md:text-3xl xl:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9] drop-shadow-2xl">
                  {project.title}
                </h1>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 border-t border-white/10 pt-6 md:pt-10 backdrop-blur-[2px]">
                <div>
                  <p className="text-[15px] md:text-[18px] text-blue-500 uppercase tracking-[0.15em] mb-1 md:mb-3 font-bold">Role</p>
                  <p className="text-base md:text-xl text-gray-200 font-medium tracking-wide">{project.role}</p>
                </div>
                <div>
                  <p className="text-[15px] md:text-[18px] text-blue-500 uppercase tracking-[0.15em] mb-1 md:mb-3 font-bold">Year</p>
                  <p className="text-base md:text-xl text-gray-200 font-medium tracking-wide">{project.year}</p>
                </div>
                <div>
                  <p className="text-[15px] md:text-[18px] text-blue-500 uppercase tracking-[0.15em] mb-1 md:mb-3 font-bold">Tools</p>
                  <p className="text-base md:text-xl text-gray-200 font-medium tracking-wide">
                    {project.toolsUsed?.join(' / ')}
                  </p>
                </div>
                <div>
                  <p className="text-[15px] md:text-[18px] text-blue-500 uppercase tracking-[0.15em] mb-1 md:mb-3 font-bold">Duration</p>
                  <p className="text-base md:text-xl text-gray-200 font-medium tracking-wide whitespace-pre-line">{project.workTime || 'N/A'}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-base md:text-2xl font-light max-w-4xl border-l-2 border-blue-600/40 pl-4 md:pl-8 drop-shadow-md">
                {project.description}
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/20 text-[16px] tracking-[0.15em] uppercase font-bold hidden md:block">
            Scroll to explore
          </div>
        </section>
      )}

      {/* 2. PROJECT CONTENT SECTIONS */}
      <div className="max-w-[1920px] mx-auto px-8 md:px-16 py-32 space-y-32 md:space-y-64">
        
        {(project.mainVideoUrl || (project.additionalVideoUrls && project.additionalVideoUrls.length > 0)) && (
          <section className="reveal">
            <SectionTitle>REEL</SectionTitle>
            <div className="max-w-[1500px] mx-auto space-y-12">
              {project.mainVideoUrl && (
                <div className="aspect-video bg-black overflow-hidden img-hover-container border border-white/5 rounded-2xl">
                  <iframe 
                    className="w-full h-full"
                    src={project.mainVideoUrl} 
                    title={`${project.title} Main Video`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {project.additionalVideoUrls && project.additionalVideoUrls.map((videoUrl, idx) => (
                <div key={idx} className="aspect-video bg-black overflow-hidden img-hover-container border border-white/5 rounded-2xl">
                  <iframe 
                    className="w-full h-full"
                    src={videoUrl} 
                    title={`${project.title} Additional Video ${idx + 1}`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.detailRenders && project.detailRenders.length > 0 && (
          <section className="reveal">
            <SectionTitle>Beauty</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.detailRenders.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-video bg-[#161b22] overflow-hidden cursor-zoom-in group img-hover-container shadow-2xl rounded-2xl"
                  onClick={() => openLightbox(project.detailRenders, idx)}
                >
                  <img src={img} alt="Detail render" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.clayRenders && project.clayRenders.length > 0 && (
          <section className="reveal">
            <SectionTitle>Clay & Zbrush</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.clayRenders.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-video bg-[#161b22] overflow-hidden cursor-zoom-in group img-hover-container shadow-2xl rounded-2xl"
                  onClick={() => openLightbox(project.clayRenders, idx)}
                >
                  <img src={img} alt="Clay render" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.wireframes && project.wireframes.length > 0 && (
          <section className="reveal">
            <SectionTitle>Wireframe</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.wireframes.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-video bg-[#161b22] overflow-hidden cursor-zoom-in group img-hover-container shadow-2xl rounded-2xl"
                  onClick={() => openLightbox(project.wireframes, idx)}
                >
                  <img src={img} alt="Wireframe" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.uvLayouts && project.uvLayouts.length > 0 && (
          <section className="reveal">
            <SectionTitle>UV layout</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2">
              {project.uvLayouts.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square bg-[#161b22] overflow-hidden cursor-zoom-in group img-hover-container shadow-lg rounded-md md:rounded-lg"
                  onClick={() => openLightbox(project.uvLayouts, idx)}
                >
                  <img src={img} alt="UV Layout" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 animate-fade-in" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.references && project.references.length > 0 && (
          <section className="reveal">
            <SectionTitle>Reference</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.references.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-video bg-[#161b22] overflow-hidden cursor-zoom-in group img-hover-container shadow-2xl rounded-2xl"
                  onClick={() => openLightbox(project.references, idx)}
                >
                  <img src={img} alt="Reference" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.turntableVideoUrl && (
          <section className="reveal pb-24">
            <SectionTitle>TURNTABLE</SectionTitle>
            <div className="max-w-[1500px] mx-auto space-y-20">
              <div className="aspect-video bg-black overflow-hidden img-hover-container border border-white/5 rounded-2xl">
                <iframe 
                  className="w-full h-full"
                  src={project.turntableVideoUrl} 
                  title={`${project.title} Turntable`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              {project.technicalBreakdown && (
                <div className="max-w-4xl mx-auto">
                  <p className="text-[10px] md:text-[20px] text-blue-500 uppercase tracking-[0.15em] mb-8 font-bold">Technical Specifications</p>
                  <div className="text-gray-400 leading-relaxed font-light text-2xl border-l-2 border-blue-600/30 pl-12">
                    {project.technicalBreakdown}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SUPPORTING/SECONDARY PROJECTS (EXTRA WORK) */}
        {project.id === '5' && (
          <section className="reveal">
            <SectionTitle>Additional Work</SectionTitle>
            <div className="space-y-16">
              {EXTRA_PROJECTS.map((extra) => (
                <ExtraProjectCard 
                  key={extra.id} 
                  extra={extra} 
                  onImageClick={openLightbox} 
                />
              ))}
            </div>
          </section>
        )}

        {/* ADDITIONAL WORK PROJECT SPECIFIC INNER RENDERS */}
        {project.id === 'additional-work' && (
          <section className="reveal">
            <SectionTitle>production work</SectionTitle>
            <div className="space-y-16">
              {ADDITIONAL_WORK_EXTRA_PROJECTS.map((extra) => (
                <ExtraProjectCard 
                  key={extra.id} 
                  extra={extra} 
                  onImageClick={openLightbox} 
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FOOTNOTE AT THE END OF THE PAGE */}
      {(project.id === '5' || project.id === '4' || project.id === 'additional-work') && (
        <div className="max-w-[1920px] mx-auto px-8 md:px-16 pb-16 text-center select-none reveal">
          <p className="text-xs md:text-sm text-gray-500 font-light tracking-[0.1em] uppercase italic">
            Production work and technical breakdowns shown with studio permission.
          </p>
        </div>
      )}

      <Lightbox 
        images={lightbox.images} 
        isOpen={lightbox.isOpen} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
        initialIndex={lightbox.index} 
      />
    </div>
  );
};

export default ProjectDetail;


import React, { useState } from 'react';
import { Project, AboutData, HomeData, ContactData, Experience } from '../types';

interface AdminProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  about: AboutData;
  setAbout: React.Dispatch<React.SetStateAction<AboutData>>;
  home: HomeData;
  setHome: React.Dispatch<React.SetStateAction<HomeData>>;
  contact: ContactData;
  setContact: React.Dispatch<React.SetStateAction<ContactData>>;
}

const Label = ({ children }: { children?: React.ReactNode }) => (
  <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2 font-bold">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`w-full bg-[#111] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 rounded-xl ${props.className || ''}`} />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`w-full bg-[#111] border border-white/10 p-4 text-gray-300 focus:outline-none focus:border-blue-500/30 text-sm leading-relaxed rounded-xl ${props.className || ''}`} />
);

const sanitizeVideoUrl = (url: string): string => {
  if (!url) return '';
  let cleanUrl = url.trim();
  
  // Vimeo handling
  const vimeoMatch = cleanUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  const ytMatch = cleanUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  if (cleanUrl.includes('drive.google.com')) {
    const driveMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  if (cleanUrl.includes('dropbox.com')) return cleanUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0];
  return cleanUrl;
};

const sanitizeImageUrl = (url: string): string => {
  if (!url) return '';
  let cleanUrl = url.trim();
  if (cleanUrl.includes('dropbox.com')) cleanUrl = cleanUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0];
  if (cleanUrl.includes('drive.google.com')) {
    const driveMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return cleanUrl;
};

const Admin: React.FC<AdminProps> = ({ projects, setProjects, about, setAbout, home, setHome, contact, setContact }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'hero' | 'contact' | 'deploy'>('projects');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin9987') setIsAuthorized(true);
    else alert('Incorrect Password');
  };

  // --- Utility for Generating data.ts Code ---
  const generateDataTsCode = () => {
    return `import { Project, AboutData, HomeData, ContactData } from './types';

export const INITIAL_HOME: HomeData = ${JSON.stringify(home, null, 2)};

export const INITIAL_PROJECTS: Project[] = ${JSON.stringify(projects, null, 2)};

export const INITIAL_ABOUT: AboutData = ${JSON.stringify(about, null, 2)};

export const INITIAL_CONTACT: ContactData = ${JSON.stringify(contact, null, 2)};
`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('Source code copied! Paste this into your data.ts file and re-deploy.'));
  };

  const handleReset = () => {
    if (confirm('Reset all changes to site defaults? This will clear your local edits.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  // --- State Setters (Using Functional Updates) ---
  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== id) return p;
      let finalValue = value;
      if (field === 'turntableVideoUrl' || field === 'mainVideoUrl') finalValue = sanitizeVideoUrl(value);
      else if (field === 'thumbnail') finalValue = sanitizeImageUrl(value);
      else if (Array.isArray(value) && ['detailRenders', 'clayRenders', 'wireframes', 'uvLayouts', 'references'].includes(field)) {
        finalValue = value.map(url => sanitizeImageUrl(url));
      }
      return { ...p, [field]: finalValue };
    }));
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 fade-in pt-40">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 bg-white/5 p-8 border border-white/10 rounded-2xl">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 text-center text-blue-500">Admin Console</h2>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111] border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-white/30 text-center text-white" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors rounded-xl">Unlock</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-40 fade-in pb-48">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-white/5 pb-8 gap-6">
        <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-blue-500">MANAGEMENT</h1>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {(['projects', 'hero', 'about', 'contact', 'deploy'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`text-[10px] uppercase tracking-widest font-bold pb-2 transition-all ${activeTab === tab ? 'border-b border-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab === 'hero' ? 'home' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'deploy' && (
        <div className="max-w-4xl mx-auto p-10 bg-white/5 border border-white/10 rounded-2xl space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-xl font-bold uppercase text-blue-500">Deploy Changes Permanently</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              브라우저에서 수정한 내용은 현재 기기에만 저장됩니다. <b>모든 방문자에게 수정한 내용을 보여주려면</b> 아래 코드를 복사하여 프로젝트의 <code className="text-blue-400">data.ts</code> 파일 내용과 교체한 후 다시 배포(Deploy)해야 합니다.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => copyToClipboard(generateDataTsCode())}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl"
              >
                Copy Code
              </button>
            </div>
            <pre className="bg-black/50 p-6 rounded-xl text-gray-400 text-[11px] font-mono overflow-auto max-h-[500px] border border-white/5">
              {generateDataTsCode()}
            </pre>
          </div>
          <div className="pt-8 border-t border-white/5 flex justify-center">
            <button onClick={handleReset} className="text-red-900 hover:text-red-500 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors">Reset Local Cache</button>
          </div>
        </div>
      )}

      {activeTab === 'hero' && (
        <div className="max-w-4xl mx-auto p-10 bg-white/5 border border-white/10 rounded-2xl space-y-8 animate-fade-in">
          <h2 className="text-xl font-bold uppercase text-white border-b border-white/5 pb-4">Home Section Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><Label>Display Name</Label><Input value={home.name || ''} onChange={e => setHome(prev => ({ ...prev, name: e.target.value }))} /></div>
            <div><Label>Professional Title</Label><Input value={home.professionalTitle || ''} onChange={e => setHome(prev => ({ ...prev, professionalTitle: e.target.value }))} /></div>
          </div>
          <div><Label>Hero Description</Label><Textarea rows={4} value={home.description || ''} onChange={e => setHome(prev => ({ ...prev, description: e.target.value }))} /></div>
          <div><Label>Hero Video URL</Label><Input value={home.heroVideoUrl || ''} onChange={e => setHome(prev => ({ ...prev, heroVideoUrl: sanitizeVideoUrl(e.target.value) }))} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            <div><Label>Portfolio PDF Link</Label><Input value={home.portfolioPdfUrl || ''} onChange={e => setHome(prev => ({ ...prev, portfolioPdfUrl: e.target.value }))} /></div>
            <div><Label>Resume PDF Link</Label><Input value={home.resumePdfUrl || ''} onChange={e => setHome(prev => ({ ...prev, resumePdfUrl: e.target.value }))} /></div>
          </div>
          <div><Label>Background GIF / Image URL</Label><Input value={home.backgroundGifUrl || ''} onChange={e => setHome(prev => ({ ...prev, backgroundGifUrl: sanitizeImageUrl(e.target.value) }))} placeholder="Paste your background GIF or Image URL here" /></div>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="max-w-4xl mx-auto p-10 bg-white/5 border border-white/10 rounded-2xl space-y-8 animate-fade-in">
          <h2 className="text-xl font-bold uppercase text-white border-b border-white/5 pb-4">Contact Info Settings</h2>
          <div><Label>Public Email</Label><Input value={contact.email || ''} onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><Label>ArtStation URL</Label><Input value={contact.artstationUrl || ''} onChange={e => setContact(prev => ({ ...prev, artstationUrl: e.target.value }))} /></div>
            <div><Label>LinkedIn URL</Label><Input value={contact.linkedinUrl || ''} onChange={e => setContact(prev => ({ ...prev, linkedinUrl: e.target.value }))} /></div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-12 animate-fade-in">
          <button 
            onClick={() => setProjects(prev => [{
              id: Date.now().toString(),
              title: 'New Project',
              role: '3D Modeler',
              year: new Date().getFullYear().toString(),
              workTime: '4 Weeks',
              toolsUsed: [],
              thumbnail: '',
              description: '',
              detailRenders: [],
              clayRenders: [],
              wireframes: [],
              uvLayouts: [],
              references: []
            }, ...prev])} 
            className="w-full border border-dashed border-white/20 py-10 text-gray-500 hover:text-blue-500 hover:border-blue-500/40 transition-all uppercase tracking-[0.3em] text-[10px] font-bold rounded-2xl"
          >
            + Register New Project
          </button>
          {projects.map((p) => (
            <div key={p.id} className="p-10 bg-white/5 border border-white/10 space-y-8 relative group rounded-2xl shadow-2xl">
              <button 
                onClick={() => { if(confirm('Delete project?')) setProjects(prev => prev.filter(proj => proj.id !== p.id)) }} 
                className="absolute top-6 right-8 text-red-900 hover:text-red-500 transition-colors uppercase text-[10px] font-bold tracking-widest"
              >
                [REMOVE]
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div><Label>Title</Label><Input value={p.title || ''} onChange={e => updateProject(p.id, 'title', e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Role</Label><Input value={p.role || ''} onChange={e => updateProject(p.id, 'role', e.target.value)} /></div>
                    <div><Label>Year</Label><Input value={p.year || ''} onChange={e => updateProject(p.id, 'year', e.target.value)} /></div>
                  </div>
                  <div><Label>Duration (Multi-line)</Label><Textarea rows={3} value={p.workTime || ''} onChange={e => updateProject(p.id, 'workTime', e.target.value)} /></div>
                </div>
                <div className="space-y-6">
                  <div><Label>Thumbnail URL</Label><Input value={p.thumbnail || ''} onChange={e => updateProject(p.id, 'thumbnail', e.target.value)} /></div>
                  <div className="grid grid-cols-1 gap-4">
                    <div><Label>MAIN REEL URL</Label><Input value={p.mainVideoUrl || ''} onChange={e => updateProject(p.id, 'mainVideoUrl', e.target.value)} /></div>
                    <div><Label>Turntable Video URL</Label><Input value={p.turntableVideoUrl || ''} onChange={e => updateProject(p.id, 'turntableVideoUrl', e.target.value)} /></div>
                  </div>
                </div>
              </div>
              <div><Label>Overview</Label><Textarea rows={4} value={p.description || ''} onChange={e => updateProject(p.id, 'description', e.target.value)} /></div>
              <div><Label>Tools (Comma separated)</Label><Input value={p.toolsUsed?.join(', ') || ''} onChange={e => updateProject(p.id, 'toolsUsed', e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                <div><Label>Renders (URL per line)</Label><Textarea rows={6} value={p.detailRenders?.join('\n') || ''} onChange={e => updateProject(p.id, 'detailRenders', e.target.value.split('\n').filter(s=>s!==''))} /></div>
                <div><Label>Clay (URL per line)</Label><Textarea rows={6} value={p.clayRenders?.join('\n') || ''} onChange={e => updateProject(p.id, 'clayRenders', e.target.value.split('\n').filter(s=>s!==''))} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                <div><Label>Wireframes (URL per line)</Label><Textarea rows={6} value={p.wireframes?.join('\n') || ''} onChange={e => updateProject(p.id, 'wireframes', e.target.value.split('\n').filter(s=>s!==''))} /></div>
                <div><Label>References (URL per line)</Label><Textarea rows={6} value={p.references?.join('\n') || ''} onChange={e => updateProject(p.id, 'references', e.target.value.split('\n').filter(s=>s!==''))} /></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-12 animate-fade-in">
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl">
            <Label>Intro Summary</Label>
            <Textarea rows={6} value={about.intro || ''} onChange={e => setAbout(prev => ({ ...prev, intro: e.target.value }))} />
          </div>
          
          <div className="space-y-8">
            <div className="flex justify-between items-center"><h3 className="font-bold uppercase tracking-widest text-white">Experience</h3><button onClick={() => setAbout(prev => ({ ...prev, experience: [{ id: Date.now().toString(), company: 'Company', role: 'Role', period: '20XX-20XX', description: '' }, ...prev.experience] }))} className="text-xs text-blue-500 font-bold tracking-widest">+ ADD EXP</button></div>
            {about.experience.map(exp => (
              <div key={exp.id} className="p-8 bg-black/20 border border-white/5 rounded-2xl space-y-4 relative">
                <button onClick={() => setAbout(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))} className="absolute top-4 right-4 text-red-900 hover:text-red-500 text-[10px] font-bold">X</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><Label>Company</Label><Input value={exp.company || ''} onChange={e => setAbout(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex) }))} /></div>
                  <div><Label>Role</Label><Input value={exp.role || ''} onChange={e => setAbout(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, role: e.target.value } : ex) }))} /></div>
                  <div><Label>Period</Label><Input value={exp.period || ''} onChange={e => setAbout(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, period: e.target.value } : ex) }))} /></div>
                </div>
                <Label>Description</Label><Textarea rows={2} value={exp.description || ''} onChange={e => setAbout(prev => ({ ...prev, experience: prev.experience.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex) }))} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

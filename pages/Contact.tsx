
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 fade-in text-center">
      <div className="max-w-2xl mx-auto space-y-8 md:space-y-16">
        <div className="space-y-4">
          <p className="text-blue-500 text-[12px] uppercase tracking-[0.5em] font-bold mb-4">CONTACT</p>
          <p className="text-gray-400 text-lg">Currently available for freelance work and new opportunities.</p>
        </div>
        
        <div className="space-y-10 md:space-y-20 pt-5 md:pt-10">
          <p className="text-lg md:text-3xl font-light text-gray-300 pb-2 inline-block">
            hello@heejiwoo.com
          </p>
          
          <div className="flex justify-center gap-16 pt-4">
            <a href="#" className="text-[12px] uppercase tracking-[0.4em] text-gray-500 hover:text-white font-bold transition-all hover:scale-105">LinkedIn</a>
            <a href="#" className="text-[12px] uppercase tracking-[0.4em] text-gray-500 hover:text-white font-bold transition-all hover:scale-105">ArtStation</a>
          </div>
        </div>
        
        <div className="pt-12">
          <button className="bg-white text-black px-6 py-3 md:px-12 md:py-5 rounded-2xl font-bold tracking-widest text-xs md:text-sm hover:bg-blue-500 hover:text-white transition-all uppercase shadow-xl">
            Download Resume (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

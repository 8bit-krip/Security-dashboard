import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e2ecf0] relative overflow-hidden">
      <Navbar />

      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#34808A] opacity-20 rounded-full blur-3xl animate-[blobMove1_12s_infinite]"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#935010] opacity-20 rounded-full blur-3xl animate-[blobMove2_14s_infinite]"></div>

      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-80px)] pt-[80px] gap-12">

      
        <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#15587B] mb-6 leading-tight tracking-tight">
            Welcome to <span className="text-[#34808A]">Consltek</span> Dashboards
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-lg">
            All your key dashboards in one place — from security blueprints to financial strategies. 
            <span className="block mt-1 text-[#935010] font-semibold">Stay organized. Stay informed.</span>
          </p>
        </div>

        {/* Button Panel */}
        <div className="w-full md:w-1/2 bg-white/80 border border-gray-200 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-5 animate-fade-in-down transition-transform duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          {[
            { label: 'Security Dashboard', link: '/Security-Dashboard' },
            { label: 'Ticketing Dashboard' },
            { label: 'Security Blueprint' },
            { label: 'Operational Blueprint' },
            { label: 'Financial Blueprint' },
            { label: 'Customer Documents' },
          ].map((btn, i) => (
            btn.link ? (
              <Link to={btn.link} key={i}>
                <button className="w-full py-3.5 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#34808A] to-[#15587B] hover:from-[#15587B] hover:to-[#34808A] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-[#15587B]/50">
                  {btn.label}
                </button>
              </Link>
            ) : (
              <button key={i} className="w-full py-3.5 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-[#34808A] to-[#15587B] hover:from-[#15587B] hover:to-[#34808A] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-[#15587B]/50">
                {btn.label}
              </button>
            )
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blobMove1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(50px, -30px) scale(1.1); }
        }
        @keyframes blobMove2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-50px, 30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default Homepage;

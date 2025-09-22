
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          議題辯論所
        </h1>
        <p className="text-slate-400 mt-1">一個理性討論公共議題的空間</p>
      </div>
    </header>
  );
};

export default Header;

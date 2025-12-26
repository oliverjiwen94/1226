
import React from 'react';
import { NAVIGATION_STRUCTURE } from '../constants';
import { Cpu, Terminal, Anchor } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900/90 backdrop-blur-xl h-screen sticky top-0 flex flex-col border-r border-sky-500/20 text-slate-400 z-50">
      <div className="p-8 flex items-center gap-4 border-b border-sky-500/10">
        <div className="bg-sky-500/20 p-2.5 rounded-lg border border-sky-400/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
          <Anchor className="text-sky-400 glow-text icon-hover-effect" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-[0.2em] text-white orbitron glow-text">SWS</h1>
          <p className="text-[8px] font-mono text-sky-400/70 tracking-[0.3em] uppercase mt-0.5">科技创新综合管控平台</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-10 custom-scrollbar">
        {NAVIGATION_STRUCTURE.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-black text-sky-400/40 uppercase tracking-[0.4em] mb-5 px-3">
              {section.tier}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all hover:bg-sky-500/15 hover:text-white group relative">
                    <span className="text-sky-700 group-hover:text-sky-400 transition-colors icon-hover-effect">
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-2/3 bg-sky-400 transition-all duration-300 rounded-r-full shadow-[0_0_10px_#00f2ff]"></div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-sky-500/10 bg-sky-900/20">
        <div className="flex items-center gap-4 p-3 border border-sky-500/10 bg-sky-500/5 rounded-lg">
          <div className="w-12 h-12 rounded-lg border-2 border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sm font-black orbitron text-white shadow-inner">
            首席
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black text-white orbitron uppercase tracking-widest">外高桥_首席</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="text-[9px] font-mono text-sky-400/60 uppercase font-bold">节点活跃</p>
            </div>
          </div>
          <Terminal className="text-sky-700 icon-hover-effect" size={16} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

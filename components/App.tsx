
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Cockpit from './components/Cockpit';
import Login from './components/Login';
import { Bell, Monitor, Database } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'standard' | 'cockpit'>('standard');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  if (view === 'cockpit') {
    return <Cockpit onBack={() => setView('standard')} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0a1f3d] relative overflow-hidden">
      {/* 全局背景层 */}
      <div className="scifi-bg"></div>
      <div className="light-rays"></div>
      <div className="scanline"></div>
      
      {/* 海洋气泡粒子 */}
      <div className="particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="bubble" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              width: `${Math.random() * 8 + 2}px`, 
              height: `${Math.random() * 8 + 2}px`, 
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`
            }} 
          />
        ))}
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col relative z-10">
        {/* 顶部科幻导航栏 */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-sky-500/10 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-5">
            {/* 移除搜索框 */}
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 border-r border-sky-500/10 pr-8 mr-2">
               <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black orbitron text-sky-600 tracking-widest uppercase">深度同步状态</span>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-2 h-1.5 bg-sky-500/40 rounded-sm"></div>)}
                  </div>
               </div>
               <button className="p-2 text-sky-700 hover:text-sky-400 transition-all relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]"></span>
               </button>
            </div>

            {/* 进入驾驶舱按钮 */}
            <button 
              onClick={() => setView('cockpit')}
              className="flex items-center gap-3 px-6 py-2.5 bg-sky-500/15 border border-sky-400/40 text-sky-100 rounded-lg text-[11px] font-black orbitron tracking-[0.2em] hover:bg-sky-400 hover:text-black transition-all group shadow-[0_0_20px_rgba(0,242,255,0.1)]"
            >
              <Monitor size={16} className="group-hover:animate-pulse" />
              <span>驾驶舱</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[11px] font-black text-white orbitron tracking-wider">科研管理</p>
                <div className="flex items-center justify-end gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                   <p className="text-[9px] font-mono text-sky-500/60 font-bold">安全等级：S级</p>
                </div>
              </div>
              <div className="w-10 h-10 border border-sky-500/30 bg-sky-500/10 flex items-center justify-center rounded-lg shadow-inner">
                <Database size={20} className="text-sky-400" />
              </div>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default App;

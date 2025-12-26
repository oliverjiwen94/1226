
import React, { useState, useEffect, useRef } from 'react';
import { Lock, Fingerprint, ShieldCheck, Anchor, Navigation } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [scanning, setScanning] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setCoords({ 
        x: (clientX / innerWidth - 0.5) * 20, 
        y: (clientY / innerHeight - 0.5) * 20 
      });
      
      // 动态光照位置更新
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = () => {
    setScanning(true);
    setTimeout(() => {
      onLogin();
    }, 2500);
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a1f3d] perspective-1000 transition-colors duration-700 ${isHovered ? 'bg-[#0f2a52]' : 'bg-[#0a1f3d]'}`}
      style={{
        '--vessel-speed': isHovered ? '0.5' : '1',
      } as React.CSSProperties}
    >
      {/* 核心背景层 */}
      <div className="absolute inset-0 scifi-bg"></div>
      
      {/* 动态光流效应 (光学动态) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 242, 255, 0.2), transparent 80%)`
        }}
      ></div>

      <div className="absolute inset-0 light-rays opacity-50"></div>
      <div className="scanline"></div>
      
      {/* 动态航道 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* 1. 远景：巨型全自动集装箱船 */}
        <div 
          className="absolute top-[20%] -left-[120%] w-[180%] h-[120px] opacity-15 blur-xl"
          style={{ animation: `vessel-heavy calc(150s * var(--vessel-speed)) infinite linear` }}
        >
           <div className="w-full h-full bg-sky-500/30" style={{ clipPath: 'polygon(0% 100%, 15% 40%, 85% 40%, 100% 100%)' }}></div>
           <div className="absolute top-[45%] left-0 w-full h-[1px] bg-sky-400/40 shimmer"></div>
        </div>

        {/* 2. 中景：科考旗舰 SWS-EXPRESS */}
        <div 
          className="absolute top-[45%] -right-[100%] w-[600px] h-[80px] opacity-25 blur-md"
          style={{ animation: `vessel-research calc(90s * var(--vessel-speed)) infinite linear` }}
        >
          <div className="relative w-full h-full">
             <div className="w-full h-full bg-sky-400/50" style={{ clipPath: 'polygon(10% 90%, 0% 50%, 20% 40%, 80% 40%, 100% 80%)' }}></div>
             <div className="absolute top-[42%] left-[20%] w-[50%] h-[2px] bg-sky-300 animate-pulse"></div>
          </div>
        </div>

        {/* 3. 近景：智能深潜隐身艇 */}
        <div 
          className="absolute bottom-[25%] -left-[50%] w-[300px] h-[40px] opacity-40 blur-sm"
          style={{ animation: `vessel-stealth calc(45s * var(--vessel-speed)) infinite ease-in-out` }}
        >
           <div className="w-full h-full bg-cyan-400/40 shadow-[0_0_30px_rgba(0,242,255,0.3)]" style={{ clipPath: 'polygon(0% 50%, 80% 20%, 100% 50%, 80% 80%)' }}></div>
           <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-sky-300 rounded-full animate-ping"></div>
        </div>

        {/* 数字坐标全息层 */}
        <div className="absolute inset-0 opacity-30 font-mono text-[10px] text-sky-400/50 p-10 select-none">
           <div className="absolute top-10 left-10 space-y-2">
              <div className="animate-pulse">纬度: 31.3541 N</div>
              <div className="animate-pulse" style={{ animationDelay: '1s' }}>经度: 121.5832 E</div>
              <div className="text-sky-600">深度: -4205.8m</div>
           </div>
           <div className="absolute bottom-10 right-10 text-right space-y-1">
              <div className="text-xs font-bold text-sky-400/70">节点: 外高桥造船</div>
              <div className="shimmer">加密: RSA-4096-ECC</div>
              <div className="bg-sky-500/20 px-2">系统就绪: 是</div>
           </div>
        </div>

        {/* 浮动几何粒子 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute border border-sky-400/20 rounded-sm animate-[float_20s_infinite_ease-in-out]"
            style={{ 
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDuration: isHovered ? '10s' : '20s'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes vessel-heavy {
          0% { transform: translateX(0) scaleX(1); }
          100% { transform: translateX(250vw) scaleX(1); }
        }
        @keyframes vessel-research {
          0% { transform: translateX(0) scaleX(1); }
          100% { transform: translateX(-250vw) scaleX(1); }
        }
        @keyframes vessel-stealth {
          0% { transform: translateX(0) translateY(0) rotate(2deg); }
          50% { transform: translateX(150vw) translateY(-40px) rotate(-2deg); }
          100% { transform: translateX(250vw) translateY(0) rotate(2deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-100px) rotate(45deg); opacity: 0.4; }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>

      {/* 登录主体 */}
      <div 
        className="w-full max-w-lg p-8 relative z-10 transition-transform duration-500 ease-out"
        style={{ transform: `rotateY(${coords.x * 0.2}deg) rotateX(${-coords.y * 0.2}deg)` }}
      >
        <div className="scifi-panel p-1 border-sky-500/30 rounded-2xl overflow-hidden group shadow-[0_0_50px_rgba(0,242,255,0.05)]">
          <div className="absolute inset-0 bg-sky-500/10 group-hover:bg-sky-500/15 transition-colors"></div>
          
          <div className="p-10 flex flex-col items-center relative z-20">
            {/* 增强版 Logo */}
            <div className="relative mb-10">
              <div className="w-28 h-28 bg-sky-900/40 border-2 border-sky-400/40 rounded-2xl flex items-center justify-center relative shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                <div className="absolute inset-0 border border-sky-400/50 rounded-2xl animate-[ping_5s_infinite] opacity-30"></div>
                <div className="absolute -inset-4 border-2 border-dashed border-sky-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
                <Anchor className="text-sky-400 glow-text drop-shadow-[0_0_15px_rgba(0,242,255,0.8)]" size={56} />
                
                {/* 装饰角标 */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-sky-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-sky-400"></div>
              </div>
            </div>

            <div className="text-center space-y-2 mb-10">
              <h1 className="text-4xl font-black orbitron text-white tracking-[0.4em] uppercase glow-text">
                SWS
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-sky-800"></div>
                <p className="text-[10px] text-sky-400 font-mono tracking-[0.3em] uppercase opacity-80">
                  科技创新综合管控平台
                </p>
                <div className="h-[1px] w-8 bg-sky-800"></div>
              </div>
            </div>

            <div className="w-full space-y-6">
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-transform group-focus-within/input:scale-110">
                  <Navigation size={18} className="text-sky-600 group-focus-within/input:text-sky-400" />
                </div>
                <input 
                  type="text" 
                  defaultValue="SWS_CHIEF_OFFICER"
                  className="w-full bg-slate-900/60 border border-sky-500/30 pl-14 pr-4 py-5 rounded-xl text-sm text-sky-100 focus:outline-none focus:border-sky-400/80 focus:bg-sky-900/40 transition-all font-mono tracking-widest uppercase"
                  placeholder="用户名"
                />
                <div className="absolute bottom-0 left-0 h-[1px] bg-sky-400 w-0 group-focus-within/input:w-full transition-all duration-700"></div>
              </div>
              
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-sky-600 group-focus-within/input:text-sky-400" />
                </div>
                <input 
                  type="password" 
                  defaultValue="SHANGHAI_WAIGAOQIAO"
                  className="w-full bg-slate-900/60 border border-sky-500/30 pl-14 pr-4 py-5 rounded-xl text-sm text-sky-100 focus:outline-none focus:border-sky-400/80 focus:bg-sky-900/40 transition-all font-mono tracking-widest"
                  placeholder="密码"
                />
                <div className="absolute bottom-0 left-0 h-[1px] bg-sky-400 w-0 group-focus-within/input:w-full transition-all duration-700"></div>
              </div>
            </div>

            <button 
              onClick={handleLogin}
              disabled={scanning}
              className="w-full mt-10 relative h-20 bg-sky-500/10 border border-sky-400/40 rounded-xl overflow-hidden hover:bg-sky-500 hover:text-black transition-all group active:scale-95 shadow-[0_0_40px_rgba(0,242,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              
              {scanning ? (
                <div className="flex items-center justify-center gap-5">
                  <div className="relative">
                    <Fingerprint className="animate-pulse text-sky-400 group-hover:text-black" size={32} />
                    <div className="absolute -inset-2 border border-sky-400 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <span className="font-black tracking-[0.3em] text-sm">生物特征识别中...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-5">
                  <ShieldCheck className="group-hover:scale-125 transition-transform" size={28} />
                  <span className="font-black tracking-[0.3em] text-sm uppercase">登录</span>
                </div>
              )}
            </button>

            {/* 底部链路信息 */}
            <div className="mt-12 w-full grid grid-cols-3 gap-3">
               {[
                 { label: '链路', val: '稳定', color: 'text-emerald-400' },
                 { label: '延迟', val: '0.04ms', color: 'text-sky-400' },
                 { label: '安全', val: '极高', color: 'text-sky-400' }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center py-2 border border-sky-500/20 bg-slate-900/80 rounded-lg">
                    <span className="text-[8px] text-sky-500 font-bold uppercase tracking-widest">{stat.label}</span>
                    <span className={`text-[9px] font-black orbitron mt-1 ${stat.color}`}>{stat.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        {/* 版权声明 */}
        <div className="mt-8 flex justify-between items-center px-4 opacity-50">
           <p className="text-[8px] text-sky-400 orbitron tracking-[0.2em] uppercase">
             copyright reserved by sws
           </p>
           <div className="flex gap-2">
             <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse"></div>
             <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
             <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

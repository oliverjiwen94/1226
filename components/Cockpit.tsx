
import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  COCKPIT_KPI_DATA, MOCK_PROJECTS, MOCK_EXCEPTIONS, PARTNER_RANKING 
} from '../constants';
import { ChevronLeft, Maximize2, RefreshCcw, Bell, Activity, ShieldAlert, Cpu, Globe, Target, Clock as ClockIcon, LayoutGrid } from 'lucide-react';

interface CockpitProps {
  onBack: () => void;
}

const Cockpit: React.FC<CockpitProps> = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  const budgetSourceData = [
    { name: '国拨(万)', value: 84100, color: '#ffda00' },
    { name: '自筹(万)', value: 120200, color: '#00f2ff' },
  ];

  const budgetTrendData = [
    { name: '2022', 预算: 86285.39, 归集: 47000 },
    { name: '2023', 预算: 78628.51, 归集: 78935.40 },
    { name: '2024', 预算: 31098.56, 归集: 16349.58 },
    { name: '2025', 预算: 21476.60, 归集: 16470.06 },
  ];

  const costComponents = [
    { name: '设计费', value: 45.55, percentage: 45 },
    { name: '材料费', value: 13414.96, percentage: 87.04 },
    { name: '外协费', value: 1150.92, percentage: 52.00 },
    { name: '专用费', value: 3709.46, percentage: 42.02 },
    { name: '燃料动力费', value: 1995.58, percentage: 49.96 },
    { name: '固定资产使用', value: 991.70, percentage: 24.29 },
    { name: '工资及劳务', value: 13190.86, percentage: 67.90 },
    { name: '差旅费', value: 677.41, percentage: 45.97 },
  ];

  const radarData = [
    { subject: '进度', A: 120, fullMark: 150 },
    { subject: '质量', A: 98, fullMark: 150 },
    { subject: '经费', A: 86, fullMark: 150 },
    { subject: '合规', A: 99, fullMark: 150 },
    { subject: '产出', A: 85, fullMark: 150 },
    { subject: '风险', A: 65, fullMark: 150 },
  ];

  const RANK_COLORS = [
    'from-sky-500 to-sky-300',
    'from-emerald-500 to-emerald-300',
    'from-amber-500 to-amber-300',
    'from-purple-500 to-purple-300',
    'from-cyan-500 to-cyan-300',
    'from-blue-500 to-blue-300',
    'from-rose-500 to-rose-300',
    'from-indigo-500 to-indigo-300',
    'from-teal-500 to-teal-300',
    'from-orange-500 to-orange-300'
  ];

  const NeedleGauge = ({ value, label, color, max = 10 }: { value: number, label: string, color: string, max?: number }) => {
    const intValue = Math.round(value);
    const angle = (intValue / max) * 180;
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-14 overflow-hidden">
          <div className="absolute top-0 left-0 w-28 h-28 rounded-full border-[5px] border-sky-900/30"></div>
          <div 
            className="absolute bottom-0 left-1/2 w-[2px] h-12 origin-bottom transition-all duration-1000 ease-out z-10"
            style={{ transform: `translateX(-50%) rotate(${angle - 90}deg)`, backgroundColor: color }}
          >
             <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full border-2 border-slate-900 shadow-[0_0_10px_#fff]" style={{backgroundColor: color}}></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#0a2a5e] rounded-full border-2 border-sky-400 z-20 shadow-[0_0_5px_rgba(0,242,255,0.5)]"></div>
        </div>
        <div className="text-center mt-2">
          <p className="text-lg font-black digital-font number-hover-effect" style={{color}}>{intValue}</p>
          <p className="text-[9px] text-sky-300 font-bold uppercase tracking-widest">{label}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="cockpit-theme min-h-screen relative flex flex-col p-4 overflow-hidden bg-[#0a1f3d]">
      <div className="scanline"></div>
      
      <header className="relative z-20 flex justify-between items-start mb-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black tracking-tighter text-white orbitron glow-text">SWS</span>
              <div className="h-6 w-[2px] bg-sky-400 shadow-[0_0_15px_#00f2ff]"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-sky-200 font-mono leading-none tracking-widest">数据中心</span>
                <span className="text-[10px] text-sky-400 font-mono flex items-center gap-1">
                  <ClockIcon size={10} className="icon-hover-effect" /> {formatTime(currentTime)}
                </span>
              </div>
            </div>
            <button onClick={onBack} className="mt-2 flex items-center gap-1 text-[10px] text-sky-400 hover:text-white transition-all bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded shadow-inner">
              <ChevronLeft size={12} className="icon-hover-effect" /> 返回系统主页
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-0 text-center w-[600px]">
          <div className="header-bg px-20 py-5 mb-2 relative">
            <h1 className="text-4xl font-extrabold tracking-[0.3em] text-white orbitron glow-text shimmer-text uppercase">
              科研项目管控平台
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex gap-2">
            {[
              { label: '预警中心', active: false },
              { label: '项目中心', active: false },
              { label: '合作伙伴', active: false }
            ].map((item) => (
              <button key={item.label} className="px-5 py-1.5 bg-sky-400/10 border border-sky-400/40 text-[10px] text-sky-100 hover:bg-sky-400 hover:text-black transition-all rounded-sm font-black uppercase tracking-[0.1em] shadow-lg">
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex gap-4 text-sky-300">
            <RefreshCcw size={20} className="cursor-pointer hover:text-white hover:rotate-180 transition-all duration-700 icon-hover-effect" />
            <Bell size={20} className="cursor-pointer hover:text-white animate-bounce icon-hover-effect" />
            <Maximize2 size={20} className="cursor-pointer hover:text-white icon-hover-effect" />
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 relative z-10 overflow-hidden mt-2">
        <div className="col-span-3 flex flex-col gap-6 overflow-hidden">
          <section className="scifi-panel p-6 h-[38%] flex flex-col relative group rounded-xl">
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-sm font-black text-sky-100 flex items-center gap-2 uppercase tracking-widest">
                <Activity size={18} className="text-sky-400 glow-node icon-hover-effect" /> 在研项目经费
              </h3>
            </div>
            <div className="flex-1 flex flex-col relative">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetSourceData}
                      innerRadius="70%"
                      outerRadius="95%"
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {budgetSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{backgroundColor: '#061a38', border: '1px solid #00f2ff', borderRadius: '4px', fontSize: '11px'}} 
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
                <span className="text-4xl font-black text-white digital-font glow-text number-hover-effect">20.43</span>
                <span className="text-[11px] text-sky-400 font-black uppercase tracking-[0.2em]">总额 (亿)</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {budgetSourceData.map((item, idx) => (
                <div key={idx} className="bg-sky-400/5 p-3 rounded-lg border border-sky-400/20 flex flex-col gap-1 transition-all hover:bg-sky-400/10 hover:border-sky-400/40">
                  <span className="text-[10px] text-sky-300/80 font-black uppercase tracking-wider">{item.name}</span>
                  <div className="flex justify-between items-end">
                    <span className="text-base font-black text-white digital-font number-hover-effect">{item.value}</span>
                    <span className="text-xs font-black number-hover-effect" style={{color: item.color}}>{((item.value / 204300) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="scifi-panel p-6 flex flex-col h-[30%] rounded-xl">
            <h3 className="text-sm font-black text-sky-100 flex items-center gap-2 mb-4 uppercase tracking-widest">
              <ShieldAlert size={18} className="text-sky-400 icon-hover-effect" /> 年度预算趋势 (2022-2025)
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetTrendData} margin={{top: 5, right: 5, left: -10, bottom: 0}}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(0, 242, 255, 0.15)" />
                  <XAxis dataKey="name" stroke="#7dd3fc" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis stroke="#7dd3fc" fontSize={11} axisLine={false} tickLine={false} hide />
                  <Tooltip cursor={{fill: 'rgba(0, 242, 255, 0.1)'}} contentStyle={{backgroundColor: '#061a38', border: 'none', borderRadius: '4px'}} />
                  <Bar dataKey="预算" fill="#ffda00" radius={[3, 3, 0, 0]} barSize={20} className="drop-shadow-md" />
                  <Bar dataKey="归集" fill="#00f2ff" radius={[3, 3, 0, 0]} barSize={20} className="drop-shadow-md" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="scifi-panel p-6 flex-1 flex flex-col overflow-hidden rounded-xl">
            <h3 className="text-sm font-black text-sky-100 flex items-center gap-2 mb-4 uppercase tracking-widest">
              <Cpu size={18} className="text-sky-400 icon-hover-effect" /> 经费归集进度
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {costComponents.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-sky-200 font-black tracking-wide group-hover:text-white transition-colors">{idx + 1}. {item.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sky-400 font-black digital-font number-hover-effect">{item.value}万</span>
                      <span className="text-emerald-400 font-black digital-font number-hover-effect">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-sky-950/60 rounded-full overflow-hidden relative border border-sky-400/20 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-white transition-all duration-1000 ease-out" 
                      style={{width: `${item.percentage}%`}}
                    ></div>
                    <div className="shimmer-overlay opacity-40"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-6 flex flex-col gap-6 overflow-hidden">
          <div className="grid grid-cols-4 gap-4">
            {COCKPIT_KPI_DATA.slice(0, 4).map((kpi, idx) => (
              <div key={idx} className="scifi-panel p-4 flex flex-col items-center justify-center bg-sky-400/5 hover:bg-sky-400/20 transition-all cursor-pointer group border-sky-400/30 shadow-lg rounded-xl">
                <span className="text-[11px] text-sky-200 font-black uppercase tracking-[0.2em] mb-2 opacity-60 group-hover:opacity-100">{kpi.label}</span>
                <span className="text-2xl font-black text-white digital-font glow-text number-hover-effect">{Math.round(kpi.value)}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 flex flex-col relative gap-6">
            <div className="grid grid-cols-12 gap-6 h-[42%]">
              <div className="col-span-8 scifi-panel p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-800/20 to-transparent rounded-xl">
                 <div className="text-center z-10 space-y-6">
                   <p className="text-sky-300 text-[11px] tracking-[0.6em] font-black uppercase opacity-60">高端技术研究中心</p>
                   <h2 className="text-white text-4xl font-black tracking-tight leading-tight uppercase drop-shadow-2xl">
                     船舶总装建造数字化升级<br/>
                     <span className="text-sky-400 glow-text">核心示范应用工程</span>
                   </h2>
                   <div className="flex justify-center gap-8 mt-6">
                     {['工艺仿真控制', '全栈数字集成', '敏捷执行模型'].map((t) => (
                       <span key={t} className="px-5 py-2 bg-sky-400/10 border border-sky-400/40 rounded shadow-lg text-[11px] text-sky-100 font-black uppercase tracking-[0.2em]">{t}</span>
                     ))}
                   </div>
                 </div>
                 <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                    <div className="w-[600px] h-[600px] border-[1px] border-sky-400 rounded-full animate-[spin_30s_linear_infinite] border-dashed"></div>
                 </div>
              </div>

              <div className="col-span-4 scifi-panel p-6 flex flex-col items-center justify-center bg-sky-900/10 rounded-xl">
                 <h4 className="text-[11px] font-black text-sky-300 uppercase mb-6 tracking-[0.3em]">科研效能矩阵</h4>
                 <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{fill: '#adfbff', fontSize: 11, fontWeight: 'bold'}} />
                        <Radar name="Performance" dataKey="A" stroke="#00f2ff" fill="#00f2ff" fillOpacity={0.4} />
                      </RadarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>

            <section className="scifi-panel flex-1 flex flex-col overflow-hidden shadow-2xl rounded-xl">
               <div className="flex justify-between items-center px-6 py-5 bg-sky-400/10 border-b border-sky-400/30">
                  <div className="flex items-center gap-4">
                    <div className="bg-sky-500/20 p-2 rounded-lg border border-sky-400/40 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <LayoutGrid size={20} className="text-sky-400 glow-node icon-hover-effect" />
                    </div>
                    <h3 className="text-sm font-black text-sky-100 tracking-[0.2em] uppercase">项目矩阵</h3>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                  </div>
               </div>
               <div className="flex-1 overflow-auto scrollbar-hide">
                 <table className="w-full text-left text-[11px] border-collapse">
                   <thead className="sticky top-0 bg-[#061a38] text-sky-300 uppercase font-black tracking-wider border-b border-sky-900 shadow-md">
                     <tr>
                       <th className="px-6 py-5">项目号</th>
                       <th className="px-6 py-5">项目名称</th>
                       <th className="px-6 py-5">经费执行率</th>
                       <th className="px-6 py-5">计划执行率</th>
                       <th className="px-6 py-5 text-right">结题时间</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-sky-900/20">
                     {MOCK_PROJECTS.map((p, idx) => (
                       <tr key={idx} className="transition-all hover:bg-sky-400/10 cursor-pointer group">
                         <td className="px-6 py-5 text-sky-400 font-mono font-black group-hover:text-white number-hover-effect">{p.id}</td>
                         <td className="px-6 py-5 text-slate-100 truncate max-w-[320px] font-black group-hover:text-white uppercase tracking-tight">{p.name}</td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                               <div className="w-16 h-2 bg-sky-950/80 rounded-full overflow-hidden border border-sky-900/40">
                                  <div className="h-full bg-sky-500 shadow-[0_0_5px_#00f2ff]" style={{width: `${Math.min(p.budget, 100)}%`}}></div>
                               </div>
                               <span className="text-sky-300 font-black digital-font text-xs number-hover-effect">{Math.round(p.budget)}%</span>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                               <div className="w-16 h-2 bg-sky-950/80 rounded-full overflow-hidden border border-sky-900/40">
                                  <div className="h-full bg-emerald-500 shadow-[0_0_5px_#10b981]" style={{width: `${Math.min(p.research, 100)}%`}}></div>
                               </div>
                               <span className="text-emerald-400 font-black digital-font text-xs number-hover-effect">{Math.round(p.research)}%</span>
                            </div>
                         </td>
                         <td className="px-6 py-5 text-slate-500 text-[10px] text-right font-black uppercase tracking-tighter">{p.cycle.split(' - ')[1]}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </section>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-6 overflow-hidden">
          <section className="scifi-panel p-6 h-[45%] flex flex-col overflow-hidden relative rounded-xl">
            <h3 className="text-sm font-black text-sky-100 flex justify-between items-center mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-3"><ShieldAlert size={20} className="text-red-500 glow-node icon-hover-effect" /> 智能风险检测</span>
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] rounded-sm font-black tracking-[0.2em] animate-pulse shadow-lg">警报激活</span>
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-8 scrollbar-hide">
               {MOCK_EXCEPTIONS.map((exc, idx) => (
                 <div key={idx} className="p-4 bg-red-600/5 border border-red-600/30 rounded-lg flex flex-col gap-3 hover:bg-red-600/15 transition-all shadow-md">
                    <p className="text-[12px] text-white font-black leading-tight line-clamp-2 uppercase tracking-tight">{exc.name}</p>
                    <div className="flex justify-between items-center border-t border-red-600/10 pt-2">
                      <span className="text-[10px] text-slate-400 font-black tracking-widest number-hover-effect">{exc.id}</span>
                      <span className="text-[10px] text-red-400 font-black uppercase tracking-widest">进度预警：4项</span>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="flex justify-around items-center pt-6 border-t border-sky-400/20 bg-sky-900/10 rounded-b-xl shadow-inner">
               <NeedleGauge value={1} label="执行滞后项" color="#00f2ff" max={10} />
               <NeedleGauge value={8} label="经费滞后项" color="#ffda00" max={10} />
            </div>
          </section>

          <section className="scifi-panel p-6 flex-1 flex flex-col overflow-hidden rounded-xl">
             <h3 className="text-sm font-black text-sky-100 mb-6 flex justify-between items-center uppercase tracking-widest">
                <span className="flex items-center gap-3"><Globe size={20} className="text-sky-400 icon-hover-effect" /> 合作单位排名</span>
             </h3>
             <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
                {PARTNER_RANKING.map((partner, idx) => (
                  <div key={idx} className="flex flex-col gap-2 group">
                    <div className="flex justify-between items-end">
                      <span className="text-[12px] text-sky-100 font-black group-hover:text-sky-400 transition-colors uppercase tracking-tight">{idx + 1}. {partner.name}</span>
                      <span className="text-[11px] text-sky-400 digital-font font-black number-hover-effect">{Math.round(partner.value)} <span className="text-sky-800 text-[9px] tracking-widest ml-1 uppercase">项目</span></span>
                    </div>
                    <div className="h-2 bg-sky-950/80 rounded-full overflow-hidden relative border border-sky-400/10 shadow-md">
                       <div 
                         className={`h-full bg-gradient-to-r ${RANK_COLORS[idx % RANK_COLORS.length]} shadow-[0_0_10px_rgba(0,242,255,0.2)] transition-all duration-1200 ease-out`} 
                         style={{width: `${(partner.value / 50) * 100}%`}}
                       ></div>
                       <div className="shimmer-overlay opacity-30"></div>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
      
      <footer className="mt-6 flex items-center justify-between px-6 text-[11px] font-black text-sky-600 border-t border-sky-400/20 pt-4 relative z-20">
         <div className="flex gap-12">
            <span className="flex items-center gap-2 uppercase tracking-widest">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> 
              版权归外高桥造船所有
            </span>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-white font-black opacity-30 uppercase tracking-[0.2em]">© 2026 科技创新综合管控平台</span>
         </div>
      </footer>
    </div>
  );
};

export default Cockpit;


import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { 
  Zap, Clock, FileText, Award, Database, Terminal, Waves, Anchor, Target
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_ACTIVITIES } from '../constants';

const Dashboard: React.FC = () => {
  const ipTrendData = [
    { name: '一季度', 发明专利: 12, 实用新型: 18 },
    { name: '二季度', 发明专利: 19, 实用新型: 25 },
    { name: '三季度', 发明专利: 15, 实用新型: 20 },
    { name: '四季度', 发明专利: 22, 实用新型: 28 },
  ];

  return (
    <main className="p-8 space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 标题栏 */}
      <div className="flex justify-between items-end border-b border-sky-500/20 pb-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 scifi-panel rounded-full flex items-center justify-center border-2 border-sky-400/30">
            <Anchor className="text-sky-400 glow-text icon-hover-effect" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black orbitron text-white tracking-[0.2em] glow-text uppercase">重点任务执行进展</h2>
          </div>
        </div>
      </div>

      {/* 指标矩阵 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: '科研经费执行', val: '86.4%', icon: <Zap size={20} />, color: 'text-sky-400' },
          { label: '核心专利产出', val: '42 / 50', icon: <Target size={20} />, color: 'text-amber-400' },
          { label: '在研项目', val: '128', icon: <Database size={20} />, color: 'text-emerald-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="scifi-panel p-6 group hover:bg-sky-500/10 transition-all cursor-default">
            <div className="flex justify-between items-start mb-4">
              <span className={`p-3 bg-slate-800/80 border border-slate-700 rounded-lg ${kpi.color} shadow-lg icon-hover-effect`}>{kpi.icon}</span>
            </div>
            <p className="text-[11px] font-black text-sky-500 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-3xl font-black orbitron text-white group-hover:glow-text transition-all tracking-tight number-hover-effect">{kpi.val}</p>
          </div>
        ))}
      </div>

      {/* 分析区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        
        {/* 左侧：项目执行矩阵 */}
        <div className="lg:col-span-2 scifi-panel flex flex-col rounded-lg">
          <div className="p-6 border-b border-sky-500/10 flex justify-between items-center bg-sky-500/10">
            <h3 className="text-base font-black orbitron text-white tracking-[0.2em] flex items-center gap-3 uppercase">
              <Database size={20} className="text-sky-400 icon-hover-effect" /> 项目矩阵
            </h3>
            <div className="flex gap-4">
               <span className="text-[10px] font-mono text-sky-400 bg-black/40 px-2 py-0.5 rounded border border-sky-900">过滤：活跃项目</span>
               <span className="text-[10px] font-mono text-sky-400 bg-black/40 px-2 py-0.5 rounded border border-sky-900">排序：优先级</span>
            </div>
          </div>
          <div className="p-6 space-y-5 max-h-[600px] overflow-y-auto custom-scrollbar">
            {MOCK_PROJECTS.map((proj) => (
              <div key={proj.id} className="p-5 bg-sky-950/20 border border-sky-500/10 hover:border-sky-500/50 hover:bg-sky-900/30 transition-all group rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-lg border border-sky-500/20 flex items-center justify-center text-sky-400 bg-sky-500/5 font-black orbitron text-lg group-hover:shadow-[0_0_15px_#00f2ff33] transition-all">
                      {proj.id.split('-')[1].charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight leading-tight max-w-md">{proj.name}</h5>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-mono text-sky-400/60 bg-sky-950/50 px-2 rounded">项目号: {proj.id}</span>
                        <span className="text-[10px] font-mono text-sky-400/60 flex items-center gap-2"><Clock size={12} /> 最后同步: {proj.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                       <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${
                        proj.stage === 'Approved' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5' : 'border-amber-500/40 text-amber-400 bg-amber-500/5'
                       } uppercase tracking-widest`}>
                        {proj.stage === 'Approved' ? '已立项' : '审核中'}
                       </span>
                    </div>
                    <span className="text-xl font-black orbitron text-white mt-2 group-hover:glow-text number-hover-effect">{proj.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-sky-950/60 rounded-full overflow-hidden border border-sky-900/30">
                   <div 
                    className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-white group-hover:from-white transition-all duration-1500 ease-out shadow-[0_0_10px_#00f2ff66]" 
                    style={{width: `${proj.progress}%`}}
                   ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：趋势图与日志 */}
        <div className="space-y-8 flex flex-col">
          <div className="scifi-panel p-6 flex flex-col h-[320px] rounded-lg">
            <h3 className="text-sm font-black orbitron text-white tracking-[0.2em] mb-6 flex justify-between items-center uppercase">
               <span>知识库产出趋势</span>
               <Waves size={18} className="text-sky-400 icon-hover-effect" />
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ipTrendData} margin={{top: 0, right: 0, left: -30, bottom: 0}}>
                  <defs>
                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,242,255,0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b', fontWeight: 'bold'}} />
                  <RechartsTooltip contentStyle={{backgroundColor: '#0a1f3d', border: '1px solid #00f2ff', borderRadius: '8px'}} />
                  <Area type="monotone" dataKey="发明专利" stroke="#00f2ff" strokeWidth={3} fillOpacity={1} fill="url(#colorWave)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="scifi-panel p-6 flex flex-col flex-1 rounded-lg">
            <h3 className="text-sm font-black orbitron text-white tracking-[0.2em] mb-6 uppercase flex items-center justify-between">
              <span>重要节点</span>
              <Terminal size={18} className="text-sky-400 icon-hover-effect" />
            </h3>
            <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
              {MOCK_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex gap-4 relative group cursor-default">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:border-sky-400 transition-all group-hover:shadow-[0_0_10px_#00f2ff33]">
                      {activity.type === 'Project' && <FileText size={18} className="text-sky-400 icon-hover-effect" />}
                      {activity.type === 'IP' && <Zap size={18} className="text-emerald-400 icon-hover-effect" />}
                      {activity.type === 'Award' && <Award size={18} className="text-amber-400 icon-hover-effect" />}
                    </div>
                    <div className="w-[1px] flex-1 bg-sky-500/20 my-2 group-hover:bg-sky-400/50 transition-colors"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-xs font-black text-sky-100 group-hover:text-sky-400 transition-colors uppercase leading-tight">{activity.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] font-mono text-sky-400/50 bg-sky-950/40 px-1.5 rounded">用户: {activity.user}</span>
                      <span className="text-[10px] font-mono text-sky-400/40">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 border border-sky-500/20 rounded-sm text-[10px] font-black orbitron text-sky-400/60 hover:text-sky-400 hover:bg-sky-500/10 transition-all tracking-[0.3em] uppercase">
              提取遥测日志数据
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;

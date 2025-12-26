
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface KPIGaugeProps {
  label: string;
  actual: number;
  total: number;
  color: string;
  unit: string;
}

const KPIGauge: React.FC<KPIGaugeProps> = ({ label, actual, total, color, unit }) => {
  const data = [
    { name: 'Completed', value: actual },
    { name: 'Remaining', value: Math.max(0, total - actual) }
  ];
  const percentage = Math.round((actual / total) * 100);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-sm font-medium text-slate-500">{label}</h4>
          <p className="text-2xl font-bold text-slate-900">
            {actual} <span className="text-sm font-normal text-slate-400">{unit}</span>
          </p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${percentage > 80 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {percentage}%
        </span>
      </div>
      
      <div className="flex-1 min-h-[140px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
              startAngle={180}
              endAngle={0}
            >
              <Cell fill={color} />
              <Cell fill="#f1f5f9" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pt-8">
          <span className="text-xl font-bold text-slate-800">{percentage}%</span>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-slate-400 flex justify-between">
        <span>目标: {total}{unit}</span>
        <span>已完成: {actual}{unit}</span>
      </div>
    </div>
  );
};

export default KPIGauge;

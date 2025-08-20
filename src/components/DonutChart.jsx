import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLOR_MAP = {
  Compliant: '#228B22',       
  'Non-Compliant': '#D93434', 
  Other: '#FF9900',           
};

function DonutChart({ compliant = 0, total = 0, other = 0 }) {
  const nonCompliant = Math.max(total - compliant - other, 0);

  const data = [
    { name: 'Compliant', value: compliant },
    { name: 'Non-Compliant', value: nonCompliant },
    ...(other > 0 ? [{ name: 'Other', value: other }] : [])
  ];

  const percent = total > 0 ? Math.round((compliant / total) * 100) : 0;

  if (!total || total === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[140px] text-gray-500 text-sm font-medium italic bg-gradient-to-br from-[#f0f4f8] to-[#e2ecf0] rounded-xl shadow-inner border border-gray-200">
        No data available
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-[150px] h-[150px] transition-transform duration-300 hover:scale-105">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={68}
          paddingAngle={1}
          dataKey="value"
          stroke="none"
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={900}
          animationEasing="ease-out"
        >
          {data.map((entry) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLOR_MAP[entry.name] || '#A0AEC0'}
              stroke={COLOR_MAP[entry.name] || '#A0AEC0'}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #ddd',
            padding: '6px 10px',
            fontSize: '0.875rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
          }}
          formatter={(value, name) => [
            `${value} (${Math.round((value / total) * 100)}%)`,
            name
          ]}
        />
      </PieChart>

      {/* Center Percentage */}
      <span className="absolute text-2xl font-extrabold text-[#15587B] drop-shadow-sm">
        {percent}%
      </span>
    </div>
  );
}

export default DonutChart;

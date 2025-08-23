import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

const getColor = (colour) => {
  const colorMap = {
    Green: '#228B22',
    Red: '#D93434',
    Gray: '#FF9900', 
  };
  return colorMap[colour?.trim()] || '#A0AEC0';
};

const clean = (s) => (s ?? '').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();

const SubheadingModal = ({ service, onClose }) => {
  const subheadings =
    service?.Subheading && typeof service.Subheading === 'object'
      ? Object.entries(service.Subheading)
      : [];

  return (
    <Dialog open={!!service} onClose={onClose} className="relative z-50">
      {/* Dimmed background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#34808A]/60 to-[#15587B]/50 backdrop-blur-md transition-opacity duration-300" aria-hidden="true" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl max-w-5xl w-full p-8 relative ring-1 ring-gray-200 animate-[fadeInUp_0.35s_ease-out]">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-[#935010] transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title */}
          <Dialog.Title className="text-3xl font-extrabold text-[#15587B] mb-8 text-center tracking-tight">
            {service?.title} <span className="text-[#935010]">Overview</span>
          </Dialog.Title>

          {/* Subheading Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {subheadings.map(([subTitle, val], i) => {
              const color = getColor(val?.colour);
              const statusText = clean(val?.status_C?.name);
              const display = statusText !== '' ? statusText : 'N/A';

              return (
                <div
                  key={i}
                  className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
                >
                  {/* Donut Chart */}
                  <div className="relative w-28 h-28 mb-4">
                    <PieChart width={112} height={112}>
                      <Pie
                        data={[{ name: 'Filled', value: 100 }]} 
                        cx="50%"
                        cy="50%"
                        innerRadius={34}
                        outerRadius={52}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270} 
                        stroke="none"   
                      >
                        <Cell key="cell" fill={color} />
                      </Pie>
                    </PieChart>

                    {/* Center text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[0.75rem] font-semibold text-gray-700 text-center px-1">
                        {subTitle}
                      </span>
                    </div>
                  </div>


                  {/* Status Badge */}
                  <p
                    className={`px-4 py-1.5 rounded-full text-sm font-medium text-center shadow-sm ${display.toLowerCase() === 'compliant'
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : display.toLowerCase() === 'non-compliant'
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : 'border'
                      }`}
                    style={
                      display.toLowerCase() !== 'compliant' &&
                        display.toLowerCase() !== 'non-compliant'
                        ? { backgroundColor: '#FF9900', color: '#000', borderColor: '#FF9900' }
                        : {}
                    }
                  >
                    {display}
                  </p>

                </div>
              );
            })}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SubheadingModal;

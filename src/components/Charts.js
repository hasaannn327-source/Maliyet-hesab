import React from 'react';

const CostChart = ({ data }) => {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-indigo-900">Maliyet Dağılımı</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          const percentage = ((value / total) * 100).toFixed(1);
          return (
            <div key={key} className="flex items-center">
              <div className="w-24 text-sm">{key}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                <div 
                  className="bg-indigo-600 h-4 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="w-16 text-sm text-right">{percentage}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CostChart;

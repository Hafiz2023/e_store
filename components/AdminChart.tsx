'use client';

import React from 'react';

const AdminChart = () => {
    // Mock data for monthly sales
    const data = [
        { month: 'Jan', sales: 4000 },
        { month: 'Feb', sales: 3000 },
        { month: 'Mar', sales: 2000 },
        { month: 'Apr', sales: 2780 },
        { month: 'May', sales: 1890 },
        { month: 'Jun', sales: 2390 },
        { month: 'Jul', sales: 3490 },
    ];

    const maxSales = Math.max(...data.map(d => d.sales));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Sales Overview</h3>
            <div className="flex items-end justify-between h-64 space-x-2">
                {data.map((item) => (
                    <div key={item.month} className="flex flex-col items-center flex-1 group">
                        <div
                            className="w-full bg-indigo-200 rounded-t-md relative group-hover:bg-indigo-300 transition-all duration-300"
                            style={{ height: `${(item.sales / maxSales) * 100}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                ${item.sales}
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminChart;

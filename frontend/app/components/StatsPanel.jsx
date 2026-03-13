'use client';

import { useEffect, useState } from 'react';

export default function StatsPanel() {
  const [stats, setStats] = useState({ total: 0, normal: 0, anomalies: 0, percentage: '0.0' });

  useEffect(() => {
    fetch('/all_vessels.json')
      .then((res) => res.json())
      .then((data) => {
        // Calculate the exact metrics from the AI output
        const total = data.length;
        const anomalies = data.filter((vessel) => vessel.anomaly_status === -1).length;
        const normal = total - anomalies;
        const percentage = total > 0 ? ((anomalies / total) * 100).toFixed(1) : '0.0';

        setStats({ total, normal, anomalies, percentage });
      })
      .catch((err) => console.error("Error loading vessel data:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      
      {/* Card 1: Total Scanned */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-semibold">Total Fleet Scanned</p>
          <p className="text-2xl font-bold text-slate-800">{stats.total.toLocaleString()}</p>
        </div>
      </div>

      {/* Card 2: Normal Traffic */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
        <div className="p-3 bg-green-100 text-green-600 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-semibold">Verified Normal</p>
          <p className="text-2xl font-bold text-slate-800">{stats.normal.toLocaleString()}</p>
        </div>
      </div>

      {/* Card 3: Detected Threats */}
      <div className="bg-white p-5 rounded-lg border border-red-200 shadow-sm flex items-center space-x-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>
        <div className="p-3 bg-red-100 text-red-600 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div>
          <p className="text-sm text-red-500 font-semibold">Anomalies Detected</p>
          <p className="text-2xl font-bold text-slate-800">{stats.anomalies.toLocaleString()}</p>
        </div>
      </div>

      {/* Card 4: Threat Level */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-semibold">Network Threat Level</p>
          <p className="text-2xl font-bold text-slate-800">{stats.percentage}%</p>
        </div>
      </div>

    </div>
  );
}
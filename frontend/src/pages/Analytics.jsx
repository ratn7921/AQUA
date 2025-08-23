// src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { getHeatmap, getTrends } from '../api/analyticsApi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Activity,
  Waves,
  MapPin,
  Database,
  Calendar
} from 'lucide-react';

export default function Analytics() {
  const [rawHeatmap, setRawHeatmap] = useState([]);
  const [rawTrends, setRawTrends] = useState([]);
  const [processed, setProcessed] = useState({
    matrix: [],
    xLabels: [],
    yLabels: [],
    trendsChart: [],
    stats: { total: 0, average: 0, max: 0, min: 0, dataPoints: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [trRes, hmRes] = await Promise.all([ getTrends(), getHeatmap() ]);
        const trends = trRes.data || [];
        const heatmap = hmRes.data || [];
        setRawTrends(trends);
        setRawHeatmap(heatmap);

        // process trends
        const trendsChart = trends
          .map(i => ({
            date: i.date || i.timestamp,
            count: +i.count || +i.value || 0
          }))
          .sort((a,b)=>new Date(a.date)-new Date(b.date));

        const counts = trendsChart.map(d=>d.count);
        const stats = {
          total: counts.reduce((s,n)=>s+n,0),
          average: Math.round(counts.reduce((s,n)=>s+n,0)/Math.max(counts.length,1)),
          max: Math.max(...counts,0),
          min: Math.min(...counts,0),
          dataPoints: counts.length
        };

        // process heatmap
        const xLabels = Array.from(new Set(heatmap.map(d=>d.x)));
        const yLabels = Array.from(new Set(heatmap.map(d=>d.y)));
        const matrix = yLabels.map((y)=> {
          const row = { y };
          xLabels.forEach(x=>{
            const cell = heatmap.find(d=>d.x===x&&d.y===y);
            row[x] = cell ? +cell.value : 0;
          });
          return row;
        });

        setProcessed({ matrix, xLabels, yLabels, trendsChart, stats });
      } catch(err) {
        console.error(err);
        setError('Could not load analytics data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900">
        <div className="text-cyan-300 animate-pulse">Loading analytics…</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-red-800">
        <p className="text-red-300 mb-4">{error}</p>
        <button
          onClick={()=>window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >Retry</button>
      </div>
    );
  }

  const { matrix, xLabels, yLabels, trendsChart, stats } = processed;
  const maxHeat = Math.max(...matrix.flatMap(r=>xLabels.map(x=>r[x])), 1);

  // utility for heat cell styles
  function cellStyle(val) {
    const ratio = val / maxHeat;
    const alpha = Math.min(Math.max(ratio, 0.1), 0.8);
    return {
      backgroundColor: `rgba(6,182,212,${alpha})`,
      color: ratio>0.5 ? '#fff' : '#22d3ee'
    };
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 text-cyan-100">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Waves className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <p>Real­‑time trends & heatmap from backend data</p>
      </header>

      {/* stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp, label: 'Total',    value: stats.total },
          { icon: Activity,   label: 'Average',  value: stats.average },
          { icon: Calendar,   label: 'DataPts',  value: stats.dataPoints },
          { icon: Database,   label: 'Peak',     value: stats.max }
        ].map((card,i)=>(
          <div key={i} className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-3">
            {React.createElement(card.icon, { className:'w-6 h-6 text-cyan-400'})}
            <div>
              <p className="text-sm">{card.label}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* trends chart */}
      <section className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5"/> Trends Over Time
        </h2>
        {trendsChart.length
          ? <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendsChart}>
                <CartesianGrid stroke="rgba(34,211,238,0.2)" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#22d3ee" tickFormatter={d=>new Date(d).toLocaleDateString()} />
                <YAxis stroke="#22d3ee" />
                <Tooltip
                  contentStyle={{ backgroundColor:'rgba(15,23,42,0.9)', border:'1px solid #22d3ee'}}
                  labelFormatter={l=>`Date: ${new Date(l).toLocaleDateString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ r:3, fill:'#06b6d4' }}
                  activeDot={{ r:5, fill:'#22d3ee' }}
                />
              </LineChart>
            </ResponsiveContainer>
          : <p className="text-center py-16">No trend data</p>
        }
      </section>

      {/* heatmap */}
      <section className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5"/> Heatmap
        </h2>
        {matrix.length ? (
          <div className="overflow-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-cyan-400/30">
                  <th className="sticky left-0 bg-slate-800/80 p-2">Y \ X</th>
                  {xLabels.map((x,ci)=>(
                    <th key={`xh-${ci}`} className="p-2 text-center">{x}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
               {matrix.map((row, ri) => (
  <tr key={`r-${ri}`} className={ri % 2 ? 'bg-white/5' : ''}>
    <td className="sticky left-0 bg-slate-800/80 p-2 font-medium">{row.y}</td>
    {xLabels.map((x, ci) => {
      const val = Number(row[x]) || 0;
      const style = cellStyle(val);
      return (
        <td
          key={`c-${ri}-${ci}`}
          className="p-2 text-center font-bold"
          style={style}
          title={`${x} – ${row.y}: ${val}`}
        >
          {val}
        </td>
      );
    })}
  </tr>
))}

              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-8">No heatmap data</p>
        )}
      </section>
    </div>
  );
}

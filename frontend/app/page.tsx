import MapWrapper from './components/MapWrapper';
import StatsPanel from './components/StatsPanel';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">DarkWake <span className="text-red-600">Command</span></h1>
            <p className="text-slate-500 mt-1 font-mono text-sm">UNSUPERVISED MARITIME AIS ANOMALY DETECTION</p>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Live Telematics Sync</p>
            </div>
          </div>
        </div>

        {/* The New Metrics Dashboard */}
        <StatsPanel />
        
        {/* The Map Container */}
        <div className="relative">
          {/* Decorative tag overlapping the map border */}
          <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md border border-slate-300 shadow-sm font-mono text-xs font-bold text-slate-700">
            RADAR: ACTIVE SCAN
          </div>
          
          <MapWrapper />
        </div>

      </div>
    </main>
  );
}

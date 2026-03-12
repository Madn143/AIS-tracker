import MapWrapper from './components/MapWrapper';

export default function Home() {
  return (
    // Changed background to a clean off-white (slate-50) and text to dark gray (slate-900)
    <main className="min-h-screen bg-slate-50 text-slate-900 p-10 font-mono">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-2">Maritime Anomaly Tracker</h1>
        <p className="text-slate-600 mb-8">AI-Powered Fleet Telematics & Security</p>
        
        <MapWrapper />
      </div>
    </main>
  );
}
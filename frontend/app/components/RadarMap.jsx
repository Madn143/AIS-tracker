'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function RadarMap() {
  const [vessels, setVessels] = useState([]);

  useEffect(() => {
    fetch('/all_vessels.json')
      .then((res) => res.json())
      .then((data) => setVessels(data));
  }, []);

  return (
    // Changed the border to a lighter gray to match the street theme
    <div className="w-full h-[600px] rounded-lg overflow-hidden border-2 border-slate-300 shadow-xl">
      <MapContainer center={[25.0, -80.0]} zoom={4} style={{ height: '100%', width: '100%' }}>
        
        {/* Swapped the dark URL for the classic OpenStreetMap Street View tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {vessels.map((vessel, index) => {
          const isAnomaly = vessel.anomaly_status === -1;
          
          return (
            <CircleMarker
              key={index}
              center={[vessel.LAT, vessel.LON]}
              radius={isAnomaly ? 5 : 2}
              pathOptions={{ 
                // Red for anomalies, a slightly darker green for normal ships to pop on the white map
                color: isAnomaly ? '#dc2626' : '#16a34a', 
                fillColor: isAnomaly ? '#dc2626' : '#16a34a', 
                fillOpacity: isAnomaly ? 0.9 : 0.5,
                weight: isAnomaly ? 2 : 0
              }}
            >
              {/* Changed popup to white background with dark text */}
              <Popup className="bg-white text-slate-900 font-mono font-bold">
                <strong className={isAnomaly ? "text-red-600" : "text-green-600"}>
                  {isAnomaly ? '🚨 SUSPECT VESSEL' : '✅ NORMAL VESSEL'}
                </strong><br/>
                Speed: {vessel.SOG} knots<br/>
                Heading: {vessel.COG}°<br/>
                Status Code: {vessel.anomaly_status}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
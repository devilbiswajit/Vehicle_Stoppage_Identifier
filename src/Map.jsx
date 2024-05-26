
import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ stoppageData }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    // console.log("Stoppage Data in Map component:", stoppageData); 

    const map = L.map(mapContainer.current).setView([12.9294916, 74.9173533], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    stoppageData.forEach(stoppage => {
      // console.log("Stoppage Coordinates:", stoppage.latitude, stoppage.longitude);

      const marker = L.marker([stoppage.latitude, stoppage.longitude]);

      marker.bindPopup(`
        <h3>Stoppage Information</h3>
        <p>Reach Time: ${new Date(stoppage.reachTime).toLocaleString()}</p>
        <p>End Time: ${new Date(stoppage.endTime).toLocaleString()}</p>
        <p>Stoppage Duration: ${stoppage.duration} minutes</p>
      `);

      marker.addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [stoppageData]);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
}

export default Map;





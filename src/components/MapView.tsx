import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { attractions } from '@/data/attractions';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  selectedAttraction: string | null;
  setSelectedAttraction: (id: string | null) => void;
}

export default function MapView({ selectedAttraction, setSelectedAttraction }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([62.5, 33.0], 7);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    attractions.forEach((attraction) => {
      const marker = L.marker(attraction.coordinates, { icon }).addTo(map);
      
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 8px;">${attraction.name}</h3>
          <p style="font-size: 0.875rem; color: #666; margin-bottom: 12px;">${attraction.description}</p>
          <a 
            href="/attraction/${attraction.id}" 
            style="color: hsl(222.2 47.4% 11.2%); font-size: 0.875rem; font-weight: 500; text-decoration: none;"
            onmouseover="this.style.textDecoration='underline'"
            onmouseout="this.style.textDecoration='none'"
          >
            Подробнее →
          </a>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        setSelectedAttraction(attraction.id);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [setSelectedAttraction, navigate]);

  return <div ref={mapRef} className="h-full w-full" />;
}

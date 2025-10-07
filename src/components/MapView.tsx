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

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 18,
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
        <div style="padding: 0; min-width: 280px; max-width: 320px;">
          <img 
            src="${attraction.image}" 
            alt="${attraction.name}"
            style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px 8px 0 0; display: block;"
          />
          <div style="padding: 12px;">
            <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 8px; color: #1a1a1a;">${attraction.name}</h3>
            <p style="font-size: 0.875rem; color: #666; margin-bottom: 12px; line-height: 1.4;">${attraction.description}</p>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #f0f0f0; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; color: #555;">
                ${attraction.category}
              </span>
            </div>
            <a 
              href="/attraction/${attraction.id}" 
              style="color: hsl(222.2 47.4% 11.2%); font-size: 0.875rem; font-weight: 600; text-decoration: none; display: inline-block;"
              onmouseover="this.style.textDecoration='underline'"
              onmouseout="this.style.textDecoration='none'"
            >
              Подробнее →
            </a>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent, { 
        maxWidth: 320,
        className: 'custom-popup'
      });
      
      marker.on('click', () => {
        setSelectedAttraction(attraction.id);
      });
      
      marker.on('mouseover', () => {
        marker.openPopup();
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
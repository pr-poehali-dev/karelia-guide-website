import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { attractions } from '@/data/attractions';

interface MapViewProps {
  selectedAttraction: string | null;
  setSelectedAttraction: (id: string | null) => void;
}

export default function MapView({ selectedAttraction, setSelectedAttraction }: MapViewProps) {
  const center: [number, number] = [62.5, 33.0];

  return (
    <MapContainer 
      center={center} 
      zoom={7} 
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {attractions.map((attraction) => (
        <Marker 
          key={attraction.id} 
          position={attraction.coordinates}
          eventHandlers={{
            click: () => setSelectedAttraction(attraction.id),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg mb-2">{attraction.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{attraction.description}</p>
              <Link 
                to={`/attraction/${attraction.id}`}
                className="text-primary hover:underline text-sm font-medium"
              >
                Подробнее →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

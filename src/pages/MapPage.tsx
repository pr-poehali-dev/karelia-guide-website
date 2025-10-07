import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { attractions } from '@/data/attractions';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPage() {
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);
  const center: [number, number] = [62.5, 33.0];

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Карелия</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/attractions">
                <Icon name="List" className="mr-2" size={20} />
                Список
              </Link>
            </Button>
            <Button asChild>
              <Link to="/routes">
                <Icon name="Route" className="mr-2" size={20} />
                Маршруты
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <div className="flex-1 relative">
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

        {selectedAttraction && (
          <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:w-96 z-[1000]">
            <CardContent className="p-4">
              {(() => {
                const attraction = attractions.find(a => a.id === selectedAttraction);
                if (!attraction) return null;
                
                return (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{attraction.name}</h3>
                      <button 
                        onClick={() => setSelectedAttraction(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{attraction.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" asChild className="flex-1">
                        <Link to={`/attraction/${attraction.id}`}>
                          Подробнее
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <Link to="/routes">
                          В маршрут
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

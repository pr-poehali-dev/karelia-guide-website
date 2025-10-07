import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { attractions, type Attraction } from '@/data/attractions';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function optimizeRoute(selected: Attraction[]): Attraction[] {
  if (selected.length <= 2) return selected;
  
  const route: Attraction[] = [selected[0]];
  const remaining = [...selected.slice(1)];
  
  while (remaining.length > 0) {
    const current = route[route.length - 1];
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    remaining.forEach((attraction, index) => {
      const distance = calculateDistance(
        current.coordinates[0], current.coordinates[1],
        attraction.coordinates[0], attraction.coordinates[1]
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });
    
    route.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }
  
  return route;
}

export default function Routes() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<Attraction[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setOptimizedRoute([]);
  };

  const generateRoute = () => {
    const selected = attractions.filter(a => selectedIds.includes(a.id));
    const optimized = optimizeRoute(selected);
    setOptimizedRoute(optimized);
  };

  const totalDistance = optimizedRoute.reduce((sum, attraction, index) => {
    if (index === 0) return 0;
    const prev = optimizedRoute[index - 1];
    return sum + calculateDistance(
      prev.coordinates[0], prev.coordinates[1],
      attraction.coordinates[0], attraction.coordinates[1]
    );
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Карелия</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/map">
                <Icon name="Map" className="mr-2" size={20} />
                Карта
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/attractions">
                <Icon name="List" className="mr-2" size={20} />
                Список
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="py-12 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Конструктор маршрутов
          </h1>
          <p className="text-xl text-blue-100">
            Выберите достопримечательности и создайте оптимальный маршрут
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Выберите места для посещения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {attractions.map((attraction) => (
                  <div key={attraction.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition">
                    <Checkbox 
                      id={attraction.id}
                      checked={selectedIds.includes(attraction.id)}
                      onCheckedChange={() => toggleSelection(attraction.id)}
                    />
                    <label htmlFor={attraction.id} className="flex-1 cursor-pointer">
                      <div className="font-semibold">{attraction.name}</div>
                      <div className="text-sm text-muted-foreground">{attraction.description}</div>
                      <Badge variant="outline" className="mt-2">{attraction.category}</Badge>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-4 flex gap-2">
              <Button 
                onClick={generateRoute} 
                disabled={selectedIds.length < 2}
                className="flex-1"
                size="lg"
              >
                <Icon name="Route" className="mr-2" size={20} />
                Построить маршрут ({selectedIds.length})
              </Button>
              {selectedIds.length > 0 && (
                <Button 
                  onClick={() => {
                    setSelectedIds([]);
                    setOptimizedRoute([]);
                  }}
                  variant="outline"
                  size="lg"
                >
                  <Icon name="X" size={20} />
                </Button>
              )}
            </div>
          </div>

          <div>
            {optimizedRoute.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Ваш маршрут
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{optimizedRoute.length}</div>
                        <div className="text-sm text-muted-foreground">объектов</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{Math.round(totalDistance)} км</div>
                        <div className="text-sm text-muted-foreground">общая дистанция</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {optimizedRoute.map((attraction, index) => (
                      <div key={attraction.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {index < optimizedRoute.length - 1 && (
                            <div className="flex-1 w-px bg-border my-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold">{attraction.name}</h4>
                          <p className="text-sm text-muted-foreground">{attraction.address}</p>
                          {index < optimizedRoute.length - 1 && (
                            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="ArrowDown" size={12} />
                              {Math.round(calculateDistance(
                                attraction.coordinates[0], attraction.coordinates[1],
                                optimizedRoute[index + 1].coordinates[0], optimizedRoute[index + 1].coordinates[1]
                              ))} км до следующей точки
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to="/map">
                        <Icon name="Map" className="mr-2" size={16} />
                        Показать на карте
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Icon name="Route" className="mx-auto mb-4 text-muted-foreground" size={64} />
                  <h3 className="text-xl font-semibold mb-2">Маршрут не построен</h3>
                  <p className="text-muted-foreground">
                    Выберите минимум 2 достопримечательности<br />
                    и нажмите "Построить маршрут"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

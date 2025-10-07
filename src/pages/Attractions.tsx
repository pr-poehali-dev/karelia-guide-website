import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { attractions } from '@/data/attractions';

export default function Attractions() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Карелия</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/map" className="text-foreground hover:text-primary transition">
              <Icon name="Map" size={20} />
            </Link>
            <Link to="/routes" className="text-foreground hover:text-primary transition">
              <Icon name="Route" size={20} />
            </Link>
          </div>
        </nav>
      </header>

      <section className="py-12 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Достопримечательности Карелии
          </h1>
          <p className="text-xl text-blue-100">
            {attractions.length} объектов для вашего путешествия
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <Card key={attraction.id} className="flex flex-col overflow-hidden hover:shadow-lg transition">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                
                <CardHeader>
                  <Badge className="w-fit mb-2">{attraction.category}</Badge>
                  <h3 className="text-xl font-bold">{attraction.name}</h3>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {attraction.description}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={`/attraction/${attraction.id}`}>
                      Подробнее
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы спланировать маршрут?</h2>
          <p className="text-muted-foreground mb-6">
            Используйте конструктор маршрутов для создания оптимального путешествия
          </p>
          <Button size="lg" asChild>
            <Link to="/routes">
              <Icon name="Route" className="mr-2" size={20} />
              Создать маршрут
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

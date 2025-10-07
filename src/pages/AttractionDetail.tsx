import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { attractions } from '@/data/attractions';

export default function AttractionDetail() {
  const { id } = useParams();
  const attraction = attractions.find(a => a.id === id);

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Достопримечательность не найдена</h1>
          <Button asChild>
            <Link to="/attractions">Вернуться к списку</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Карелия</span>
          </Link>
          
          <Button variant="ghost" asChild>
            <Link to="/attractions">
              <Icon name="ArrowLeft" className="mr-2" size={20} />
              Назад
            </Link>
          </Button>
        </nav>
      </header>

      <div className="h-96 overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4">{attraction.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{attraction.name}</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {attraction.fullDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{attraction.address}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  Время работы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{attraction.workingHours}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ticket" size={20} />
                  Стоимость
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{attraction.ticketPrice}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Лучшее время
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{attraction.bestTime}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lightbulb" size={20} />
                Советы для посещения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{attraction.tips}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={20} />
                Интересные факты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {attraction.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1" size={16} />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/map">
                <Icon name="Map" className="mr-2" size={20} />
                Посмотреть на карте
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/routes">
                <Icon name="Route" className="mr-2" size={20} />
                Добавить в маршрут
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Mountain" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">Карелия</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition">О регионе</a>
            <Link to="/attractions" className="text-foreground hover:text-primary transition">Достопримечательности</Link>
            <Link to="/map" className="text-foreground hover:text-primary transition">Карта</Link>
            <Link to="/routes" className="text-foreground hover:text-primary transition">Маршруты</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#about" className="text-foreground hover:text-primary transition">О регионе</a>
              <Link to="/attractions" className="text-foreground hover:text-primary transition">Достопримечательности</Link>
              <Link to="/map" className="text-foreground hover:text-primary transition">Карта</Link>
              <Link to="/routes" className="text-foreground hover:text-primary transition">Маршруты</Link>
            </div>
          </div>
        )}
      </header>

      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-green-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Добро пожаловать<br />в путешествие по<br />Республике Карелия
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Откройте для себя северную красоту, древние памятники и дикую природу
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <a href="#about">
              Узнать подробнее
              <Icon name="ChevronDown" className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </section>

      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">О Карелии</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Church" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Культурное наследие</h3>
              <p className="text-muted-foreground">Древние монастыри, деревянное зодчество и объекты ЮНЕСКО</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Trees" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Дикая природа</h3>
              <p className="text-muted-foreground">Тысячи озёр, водопады, заповедники и северное сияние</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Map" className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Активный отдых</h3>
              <p className="text-muted-foreground">Походы, рыбалка, сплавы и экскурсии по островам</p>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-8 max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed mb-4">
              Республика Карелия — удивительный регион на северо-западе России, граничащий с Финляндией. 
              Это край бескрайних лесов, кристально чистых озёр и рек, где сохранились уникальные памятники 
              деревянного зодчества и древние петроглифы.
            </p>
            <p className="text-lg leading-relaxed">
              Карелия известна своими объектами Всемирного наследия ЮНЕСКО: музеем-заповедником Кижи 
              с 22-главой церковью и Соловецким монастырем. Здесь можно увидеть мраморные каньоны, 
              могучие водопады и испытать настоящую северную природу во всей её первозданной красоте.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Начните своё путешествие</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Изучите интерактивную карту достопримечательностей, создайте свой маршрут 
            и отправляйтесь в незабываемое приключение по Карелии
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/map">
                <Icon name="MapPin" className="mr-2" size={20} />
                Открыть карту
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/attractions">
                <Icon name="List" className="mr-2" size={20} />
                Все достопримечательности
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Mountain" size={32} />
            <span className="text-2xl font-bold">Карелия</span>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Туристический гид по Республике Карелия
          </p>
          <p className="text-sm text-primary-foreground/60">
            © 2024 Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}

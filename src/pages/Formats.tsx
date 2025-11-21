import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Format {
  id: string;
  name: string;
  extension: string;
  description: string;
  quality: string;
  size: string;
  color: string;
  enabled: boolean;
}

const Formats = () => {
  const navigate = useNavigate();
  const [formats, setFormats] = useState<Format[]>([
    {
      id: '1',
      name: 'MP4',
      extension: '.mp4',
      description: 'Универсальный формат с высокой совместимостью',
      quality: 'Высокое',
      size: 'Средний',
      color: 'from-primary to-primary/70',
      enabled: true,
    },
    {
      id: '2',
      name: 'AVI',
      extension: '.avi',
      description: 'Классический формат для Windows',
      quality: 'Отличное',
      size: 'Большой',
      color: 'from-secondary to-secondary/70',
      enabled: true,
    },
    {
      id: '3',
      name: 'MKV',
      extension: '.mkv',
      description: 'Открытый формат с поддержкой множества треков',
      quality: 'Максимальное',
      size: 'Большой',
      color: 'from-accent to-accent/70',
      enabled: true,
    },
    {
      id: '4',
      name: 'MOV',
      extension: '.mov',
      description: 'Формат Apple QuickTime',
      quality: 'Высокое',
      size: 'Средний',
      color: 'from-purple-500 to-purple-700',
      enabled: false,
    },
    {
      id: '5',
      name: 'WebM',
      extension: '.webm',
      description: 'Оптимизирован для веб-воспроизведения',
      quality: 'Высокое',
      size: 'Малый',
      color: 'from-green-500 to-green-700',
      enabled: true,
    },
    {
      id: '6',
      name: 'FLV',
      extension: '.flv',
      description: 'Flash Video для потокового видео',
      quality: 'Среднее',
      size: 'Малый',
      color: 'from-red-500 to-red-700',
      enabled: false,
    },
  ]);

  const toggleFormat = (id: string) => {
    setFormats(formats.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Download" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VideoGrab
            </h1>
          </div>
          <nav className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" onClick={() => navigate('/download')}>
              <Icon name="Download" size={18} className="mr-2" />
              Загрузка
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Форматы и конвертация
            </h2>
            <p className="text-muted-foreground text-lg">
              Управляйте доступными форматами видео
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wand2" size={24} className="text-primary" />
                Автоматическая конвертация
              </CardTitle>
              <CardDescription>
                Включите автоматическое преобразование видео в выбранный формат
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="space-y-1">
                  <p className="font-medium">Умная конвертация</p>
                  <p className="text-sm text-muted-foreground">
                    Автоматически конвертирует видео при загрузке
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {formats.map((format) => (
              <Card
                key={format.id}
                className={`border-2 transition-all ${
                  format.enabled
                    ? 'border-primary/30 shadow-lg shadow-primary/5'
                    : 'border-border/50 opacity-60'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${format.color} flex items-center justify-center`}
                        >
                          <Icon name="FileVideo" size={24} className="text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{format.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {format.extension}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={format.enabled}
                      onCheckedChange={() => toggleFormat(format.id)}
                    />
                  </div>
                  <CardDescription className="mt-3">{format.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Sparkles" size={14} />
                        Качество
                      </div>
                      <p className="font-medium">{format.quality}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="HardDrive" size={14} />
                        Размер файла
                      </div>
                      <p className="font-medium">{format.size}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Info" size={24} className="text-secondary" />
                Рекомендации по форматам
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Smartphone" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Для мобильных устройств</h4>
                  <p className="text-sm text-muted-foreground">
                    Используйте MP4 или WebM для лучшей совместимости
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Monitor" size={20} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Для настольных ПК</h4>
                  <p className="text-sm text-muted-foreground">
                    MKV обеспечивает максимальное качество с поддержкой субтитров
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Globe" size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Для веб-сайтов</h4>
                  <p className="text-sm text-muted-foreground">
                    WebM оптимизирован для потоковой передачи в браузерах
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Formats;

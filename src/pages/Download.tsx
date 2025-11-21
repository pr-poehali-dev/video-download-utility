import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Download = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080p');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formats = ['mp4', 'avi', 'mkv', 'mov', 'webm', 'flv'];
  const qualities = ['4K', '1080p', '720p', '480p', '360p'];

  const handleDownload = () => {
    if (!url) {
      toast({
        title: 'Ошибка',
        description: 'Введите URL видео',
        variant: 'destructive',
      });
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast({
            title: 'Успех!',
            description: 'Видео успешно загружено',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
            <Button variant="ghost" onClick={() => navigate('/formats')}>
              <Icon name="Settings" size={18} className="mr-2" />
              Форматы
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Загрузите видео
            </h2>
            <p className="text-muted-foreground text-lg">
              Вставьте ссылку на видео и выберите нужный формат
            </p>
          </div>

          <Card className="border-2 border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Link" size={24} className="text-primary" />
                Параметры загрузки
              </CardTitle>
              <CardDescription>Настройте параметры для скачивания видео</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">URL видео</label>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="FileVideo" size={16} className="text-secondary" />
                    Формат
                  </label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((f) => (
                        <SelectItem key={f} value={f}>
                          .{f.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Sparkles" size={16} className="text-accent" />
                    Качество
                  </label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger className="bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {qualities.map((q) => (
                        <SelectItem key={q} value={q}>
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isDownloading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Загрузка...</span>
                    <span className="font-medium text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isDownloading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать видео
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold">Быстро</h4>
                  <p className="text-sm text-muted-foreground">Максимальная скорость</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                    <Icon name="Shield" size={24} className="text-secondary" />
                  </div>
                  <h4 className="font-semibold">Безопасно</h4>
                  <p className="text-sm text-muted-foreground">Защита данных</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <Icon name="Star" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-semibold">Качество</h4>
                  <p className="text-sm text-muted-foreground">До 4K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Download;

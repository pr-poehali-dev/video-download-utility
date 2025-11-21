import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Download {
  id: string;
  title: string;
  url: string;
  format: string;
  quality: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed' | 'paused' | 'error';
  thumbnail: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState<Download[]>([
    {
      id: '1',
      title: 'Amazing Sunset Timelapse 4K',
      url: 'https://example.com/video1',
      format: 'MP4',
      quality: '4K',
      size: '2.4 GB',
      progress: 100,
      status: 'completed',
      thumbnail: '🌅',
    },
    {
      id: '2',
      title: 'Tutorial: React Advanced Patterns',
      url: 'https://example.com/video2',
      format: 'MKV',
      quality: '1080p',
      size: '1.8 GB',
      progress: 67,
      status: 'downloading',
      thumbnail: '💻',
    },
    {
      id: '3',
      title: 'Nature Documentary - Wildlife',
      url: 'https://example.com/video3',
      format: 'AVI',
      quality: '720p',
      size: '980 MB',
      progress: 0,
      status: 'paused',
      thumbnail: '🦁',
    },
  ]);

  const getStatusColor = (status: Download['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'downloading':
        return 'text-primary';
      case 'paused':
        return 'text-yellow-500';
      case 'error':
        return 'text-destructive';
    }
  };

  const getStatusText = (status: Download['status']) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'downloading':
        return 'Загрузка...';
      case 'paused':
        return 'Приостановлено';
      case 'error':
        return 'Ошибка';
    }
  };

  const stats = {
    total: downloads.length,
    completed: downloads.filter(d => d.status === 'completed').length,
    active: downloads.filter(d => d.status === 'downloading').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Download" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VideoGrab
            </h1>
          </div>
          <nav className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate('/download')}>
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить
            </Button>
            <Button variant="ghost" onClick={() => navigate('/formats')}>
              <Icon name="Settings" size={18} className="mr-2" />
              Форматы
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Менеджер загрузок
            </h2>
            <p className="text-muted-foreground text-lg">
              Скачивайте и конвертируйте видео в любой формат
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Всего загрузок</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="ListVideo" size={24} className="text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Активных</p>
                    <p className="text-3xl font-bold">{stats.active}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="Download" size={24} className="text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Завершено</p>
                    <p className="text-3xl font-bold">{stats.completed}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="CheckCircle2" size={24} className="text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="List" size={24} className="text-primary" />
                  Список загрузок
                </div>
                <Button
                  onClick={() => navigate('/download')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Новая загрузка
                </Button>
              </CardTitle>
              <CardDescription>
                Управляйте всеми загрузками в одном месте
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downloads.map((download) => (
                  <Card key={download.id} className="border border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-3xl flex-shrink-0">
                          {download.thumbnail}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0 mr-4">
                              <h4 className="font-semibold text-lg truncate">{download.title}</h4>
                              <p className="text-sm text-muted-foreground truncate">{download.url}</p>
                            </div>
                            <Badge variant="outline" className="flex-shrink-0">
                              {download.format}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="Sparkles" size={14} />
                              {download.quality}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Icon name="HardDrive" size={14} />
                              {download.size}
                            </div>
                            <div className={`flex items-center gap-1 ${getStatusColor(download.status)}`}>
                              <Icon name="Activity" size={14} />
                              {getStatusText(download.status)}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Прогресс</span>
                              <span className="font-medium">{download.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                                style={{ width: `${download.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            {download.status === 'downloading' && (
                              <Button size="sm" variant="outline">
                                <Icon name="Pause" size={14} className="mr-1" />
                                Пауза
                              </Button>
                            )}
                            {download.status === 'paused' && (
                              <Button size="sm" variant="outline">
                                <Icon name="Play" size={14} className="mr-1" />
                                Продолжить
                              </Button>
                            )}
                            {download.status === 'completed' && (
                              <Button size="sm" variant="outline">
                                <Icon name="FolderOpen" size={14} className="mr-1" />
                                Открыть
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-destructive">
                              <Icon name="Trash2" size={14} className="mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Icon name="Zap" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold">Быстрая загрузка</h4>
                  <p className="text-sm text-muted-foreground">До 10x быстрее</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                    <Icon name="Layers" size={24} className="text-secondary" />
                  </div>
                  <h4 className="font-semibold">Пакетная загрузка</h4>
                  <p className="text-sm text-muted-foreground">Плейлисты целиком</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <Icon name="RefreshCw" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-semibold">Конвертация</h4>
                  <p className="text-sm text-muted-foreground">Любые форматы</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto">
                    <Icon name="Shield" size={24} className="text-purple-500" />
                  </div>
                  <h4 className="font-semibold">Безопасность</h4>
                  <p className="text-sm text-muted-foreground">100% защищено</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;

"use client";

import { useEffect, useState } from 'react';
import { Download, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAStatus() {
  const t = useTranslations('pwa');
  const [isMounted, setIsMounted] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // Check if PWA is installed
    if (typeof window !== 'undefined') {
      const checkInstallation = () => {
        setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
      };

      checkInstallation();
      window.addEventListener('appinstalled', checkInstallation);

      // Check notification permission
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission);
      }

      // Listen for install prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setCanInstall(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener('appinstalled', checkInstallation);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast.error(t('installPromptNotAvailable'));
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        toast.success(t('installing'));
        setCanInstall(false);
        setDeferredPrompt(null);
      } else {
        toast.info(t('installationCancelled'));
      }
    } catch (error) {
      console.error('Error during installation:', error);
      toast.error(t('installationFailed'));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-center gap-2 text-sm">
          {canInstall && (
            <Button
              onClick={handleInstallClick}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-primary hover:text-primary/80"
            >
              <Download className="w-4 h-4" />
              <span>{t('installAvailable')}</span>
            </Button>
          )}

          {notificationPermission === 'default' && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Bell className="w-4 h-4" />
              <span>{t('enableNotifications')}</span>
            </div>
          )}

          {notificationPermission === 'denied' && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <BellOff className="w-4 h-4" />
              <span>{t('notificationsBlocked')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
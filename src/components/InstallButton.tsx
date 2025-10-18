import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { useState, useEffect } from 'react';

export const InstallButton = () => {
  const { canInstall, install, isInstalled } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show the install button if the PWA can be installed and hasn't been dismissed
    if (canInstall && !isInstalled && !isDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [canInstall, isInstalled, isDismissed]);

  const handleInstallClick = async () => {
    const installed = await install();
    if (installed) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    // Store dismissal in localStorage to prevent showing again for a while
    localStorage.setItem('pwaInstallDismissed', 'true');
    const dismissForDays = 7; // Don't show again for 7 days
    localStorage.setItem('pwaInstallDismissedUntil', (Date.now() + dismissForDays * 24 * 60 * 60 * 1000).toString());
  };

  useEffect(() => {
    // Check if the user has previously dismissed the install prompt
    const dismissed = localStorage.getItem('pwaInstallDismissed');
    const dismissedUntil = localStorage.getItem('pwaInstallDismissedUntil');
    
    if (dismissed === 'true' && dismissedUntil) {
      const dismissUntilTime = parseInt(dismissedUntil, 10);
      if (Date.now() < dismissUntilTime) {
        setIsDismissed(true);
      } else {
        // Dismissal period has expired
        localStorage.removeItem('pwaInstallDismissed');
        localStorage.removeItem('pwaInstallDismissedUntil');
        setIsDismissed(false);
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-background/95 p-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-bottom-4">
      <div className="flex-1">
        <p className="text-sm font-medium">Install Auroraa</p>
        <p className="text-xs text-muted-foreground">Add to your home screen for a better experience</p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDismiss}
          className="h-8 w-8 p-0" 
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          onClick={handleInstallClick}
          className="h-8 gap-1"
        >
          <Download className="h-3.5 w-3.5" />
          Install
        </Button>
      </div>
    </div>
  );
};

export default InstallButton;

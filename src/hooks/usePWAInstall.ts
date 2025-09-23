import { useState, useEffect } from 'react';
import { toast } from 'sonner';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show custom install button
      toast.info('Install Auroraa', {
        description: 'Add Auroraa to your home screen for a better experience',
        action: {
          label: 'Install',
          onClick: () => handleInstallClick(),
        },
        duration: 10000,
        dismissible: true,
      });
    };

    const handleAppInstalled = () => {
      console.log('App was installed');
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isAppInstalled);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  };

  return { 
    isInstalled, 
    canInstall: !!deferredPrompt && !isInstalled,
    install: handleInstallClick 
  };
};

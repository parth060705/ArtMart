import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useServiceWorkerUpdate = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    // This is only triggered when a new service worker is installed
    const handleControllerChange = () => {
      if (navigator.serviceWorker.controller) {
        console.log('New content is available; please refresh.');
        showUpdateToast();
      }
    };

    // Listen for the controlling service worker changing
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  const showUpdateToast = () => {
    toast.info('Update Available', {
      description: 'A new version of Auroraa is available.',
      action: {
        label: 'Update',
        onClick: () => updateServiceWorker(),
      },
      duration: 10000,
      dismissible: true,
    });
    setIsUpdateAvailable(true);
  };

  const updateServiceWorker = () => {
    if (waitingWorker) {
      // Send a message to the waiting service worker to skip waiting
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page to activate the new service worker
      window.location.reload();
      
      // Reset the state
      setWaitingWorker(null);
      setIsUpdateAvailable(false);
    }
  };

  return {
    waitingWorker,
    isUpdateAvailable,
    setWaitingWorker,
    updateServiceWorker,
  };
};

import { useCallback, useEffect, useState } from 'react';

// Minimal type for the beforeinstallprompt event which isn't in TS DOM by default
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function getIsStandaloneDisplayMode(): boolean {
  if (typeof window === 'undefined') return false;
  const isStandaloneMedia = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isIosStandalone = (window.navigator as any).standalone === true;
  return Boolean(isStandaloneMedia || isIosStandalone);
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(getIsStandaloneDisplayMode());

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      const bipEvent = event as BeforeInstallPromptEvent;
      setDeferredPrompt(bipEvent);
      setIsInstallable(true);
    }

    function handleAppInstalled() {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // In case display-mode changes while app is open
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => setIsInstalled(getIsStandaloneDisplayMode());
    if (mediaQuery && 'addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handleDisplayModeChange);
    } else if (mediaQuery && 'addListener' in mediaQuery) {
      // Safari fallback
      (mediaQuery as any).addListener(handleDisplayModeChange);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (mediaQuery && 'removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', handleDisplayModeChange);
      } else if (mediaQuery && 'removeListener' in mediaQuery) {
        (mediaQuery as any).removeListener(handleDisplayModeChange);
      }
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return { accepted: false } as const;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      const accepted = choice.outcome === 'accepted';
      if (accepted) {
        setIsInstallable(false);
      }
      return { accepted } as const;
    } catch (error) {
      return { accepted: false } as const;
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    isInstalled,
    promptInstall,
  } as const;
}


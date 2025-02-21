declare global {
  interface Window {
    Clerk?: {
      loaded?: boolean;
      mountCaptcha?: (selector: string) => void;
      addOnLoaded?: (callback: () => void) => void;
    };
  }
}
export {};

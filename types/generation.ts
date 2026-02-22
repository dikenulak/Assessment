export type GenerationStatus =
  | "pending"      // just submitted, waiting for WS ack
  | "generating"   // WS event received, progress 0-100
  | "completed"    // WS complete event
  | "failed";      // WS error event

export type FailureReason = 'server_busy' | 'invalid_prompt' | 'network_error' | 'insufficient_credits' | null;

export interface Generation {
  id: string;
  prompt: string;              // full prompt text
  promptShort: string;         // truncated for display
  version: 'v1' | 'v2';        // alternates per submission
  status: GenerationStatus;
  progress: number;            // 0–100
  failureReason: FailureReason;
  createdAt: Date;
  thumbnailGradient: string;   // random gradient for thumbnail
  trackTitle?: string;         // set on completion
  duration?: string;           // e.g. "3:42"
  audioUrl?: string;           // simulated
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface GenerationStore {
  generations: Generation[];
  isProfileOpen: boolean;
  activeTrack: Generation | null;
  isPlaying: boolean;
  isMobileMenuOpen: boolean;
  notification: Notification | null;
  unseenCount: number;

  // Credits
  credits: number;
  setCredits: (credits: number) => void;

  // Actions
  addGeneration: (prompt: string) => string | null;
  updateGeneration: (id: string, updates: Partial<Generation>) => void;
  removeGeneration: (id: string) => void;
  clearAllGenerations: () => void;
  toggleProfile: () => void;
  closeProfile: () => void;
  playTrack: (track: Generation) => void;
  togglePlay: () => void;
  closePlayer: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
  incrementUnseenCount: () => void;
  clearUnseenCount: () => void;
}

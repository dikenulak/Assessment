import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Generation, GenerationStore, Notification } from '@/types/generation';

export const useGenerationStore = create<GenerationStore>()(
  persist(
    (set) => ({
      generations: [],
      isProfileOpen: false,
      activeTrack: null,
      isPlaying: false,
      notification: null,

      addGeneration: (prompt: string) => {
        // We generate ID client-side to be optimistic and consistent
        // We will send this ID to the server
        const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
        const version = Math.random() > 0.5 ? 'v1' : 'v2';

        // Random gradient from token set (simulated by using css var classes or just string for now)
        // The type expects 'thumbnailGradient' to be a string. 
        // We'll store a class suffix or similar.
        const gradients = ['gentle', 'passionate', 'dreamy', 'energetic'];
        const randomGrad = gradients[Math.floor(Math.random() * gradients.length)];

        const newGen: Generation = {
          id,
          prompt,
          promptShort: prompt.length > 28 ? prompt.slice(0, 28) + '...' : prompt,
          version: version, // This might need to sync with server? We'll prioritize client version or update it later.
          status: 'pending',
          progress: 0,
          failureReason: null,
          createdAt: new Date(),
          thumbnailGradient: randomGrad, // Placeholder
        };

        set((state) => ({
          generations: [newGen, ...state.generations],
          isProfileOpen: true, // Auto-open profile on generate? User didn't specify, but good UX.
        }));

        return id;
      },

      updateGeneration: (id, updates) => set((state) => ({
        generations: state.generations.map((g) =>
          g.id === id ? { ...g, ...updates } : g
        )
      })),

      toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen })),
      closeProfile: () => set({ isProfileOpen: false }),

      playTrack: (track) => set({ activeTrack: track, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      closePlayer: () => set({ activeTrack: null, isPlaying: false }),

      showNotification: (notification) => {
        set({ notification });
        setTimeout(() => set({ notification: null }), 5000);
      },
      hideNotification: () => set({ notification: null }),

      // Prompt Box State
      prompt: '',
      lyrics: '',
      showLyrics: false,
      remixMode: false,
      isFocused: false,
      isSubmitting: false,

      setPrompt: (prompt) => set({ prompt }),
      setLyrics: (lyrics) => set({ lyrics }),
      setShowLyrics: (showLyrics) => set({ showLyrics }),
      setRemixMode: (remixMode) => set({ remixMode }),
      setIsFocused: (isFocused) => set({ isFocused }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    }),
    {
      name: 'musicgpt_generations_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist completed generations and core app states we want to keep
        generations: state.generations.filter(g => g.status === 'completed'),
        // Explicitly NOT persisting the prompt box transient states
      }),
    }
  )
);

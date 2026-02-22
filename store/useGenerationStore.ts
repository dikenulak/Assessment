import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Generation, GenerationStore } from '@/types/generation';

// Module-level ref to clear the auto-hide notification timer
let notificationTimeout: ReturnType<typeof setTimeout> | null = null;

export const useGenerationStore = create<GenerationStore>()(
  persist(
    (set, get) => ({
      generations: [],
      isProfileOpen: false,
      activeTrack: null,
      isPlaying: false,
      isMobileMenuOpen: false,
      notification: null,
      unseenCount: 0,
      credits: 600,

      setCredits: (credits) => set({ credits }),

      addGeneration: (prompt: string) => {
        // We generate ID client-side to be optimistic and consistent
        // We will send this ID to the server
        const id = crypto.randomUUID();
        const version = Math.random() > 0.5 ? 'v1' : 'v2';

        // Random gradient from token set (simulated by using css var classes or just string for now)
        // The type expects 'thumbnailGradient' to be a string. 
        // We'll store a class suffix or similar.
        const gradients = ['gentle', 'passionate', 'dreamy', 'energetic'];
        const randomGrad = gradients[Math.floor(Math.random() * gradients.length)];

        const currentCredits = get().credits;

        if (currentCredits >= 100) {
          const newGen: Generation = {
            id,
            prompt,
            promptShort: prompt.length > 28 ? prompt.slice(0, 28) + '...' : prompt,
            version: version,
            status: 'pending',
            progress: 0,
            failureReason: null,
            createdAt: new Date(),
            thumbnailGradient: randomGrad,
          };

          set((state) => ({
            generations: [newGen, ...state.generations]
          }));
        } else {
          const failedGen: Generation = {
            id,
            prompt,
            promptShort: prompt.length > 28 ? prompt.slice(0, 28) + '...' : prompt,
            version: version,
            status: 'failed',
            progress: 0,
            failureReason: 'insufficient_credits',
            createdAt: new Date(),
            thumbnailGradient: randomGrad,
          };

          set((state) => ({
            generations: [failedGen, ...state.generations],
            unseenCount: state.unseenCount + 1,
            isProfileOpen: true,
          }));
          return null; // Signals failure to components
        }

        return id;
      },

      updateGeneration: (id, updates) => set((state) => ({
        generations: state.generations.map((g) =>
          g.id === id ? { ...g, ...updates } : g
        )
      })),

      removeGeneration: (id) => set((state) => ({
        generations: state.generations.filter((g) => g.id !== id)
      })),

      clearAllGenerations: () => set({ generations: [] }),

      toggleProfile: () => set((state) => {
        const isOpen = !state.isProfileOpen;
        return {
          isProfileOpen: isOpen,
          ...(isOpen ? {} : { unseenCount: 0 })
        };
      }),
      closeProfile: () => set({ isProfileOpen: false, unseenCount: 0 }),

      playTrack: (track) => set({ activeTrack: track, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      closePlayer: () => set({ activeTrack: null, isPlaying: false }),

      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      showNotification: (notification) => {
        if (notificationTimeout) clearTimeout(notificationTimeout);
        set({ notification });
        notificationTimeout = setTimeout(() => set({ notification: null }), 5000);
      },
      hideNotification: () => set({ notification: null }),

      incrementUnseenCount: () =>
        set((state) => ({ unseenCount: state.unseenCount + 1 })),
      clearUnseenCount: () => set({ unseenCount: 0 }),

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

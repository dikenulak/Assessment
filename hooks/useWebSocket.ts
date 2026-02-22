'use client';

import { useEffect, useCallback } from 'react';
import { getSocket } from '@/lib/socket';
import { useGenerationStore } from '@/store/useGenerationStore';
import { EVENTS } from '@/constants/events';

export function useWebSocket() {
  const updateGeneration = useGenerationStore((state) => state.updateGeneration);

  const joinGeneration = useCallback((generationId: string) => {
    const socket = getSocket();
    if (socket.emit) {
      socket.emit('join_generation', generationId);
    }
  }, []);

  useEffect(() => {
    const socket = getSocket();
    // If we're on the server (SSR), socket is a stub — bail out
    if (!socket.on) return;

    function onConnect() {
      console.log('[useWebSocket] Connected to server');
      // Re-join rooms for any active generations on reconnect
      const generations = useGenerationStore.getState().generations;
      generations
        .filter(g => g.status === 'pending' || g.status === 'generating')
        .forEach(g => socket.emit('join_generation', g.id));
    }

    function onDisconnect(reason: string) {
      console.warn('[useWebSocket] Disconnected:', reason);
    }

    function onStart({ id, version }: { id: string; version: string }) {
      updateGeneration(id, { status: 'generating', progress: 0 });
      // Auto-join the room for this generation
      socket.emit('join_generation', id);
    }

    function onProgress({ id, progress, status }: { id: string; progress: number; status: string }) {
      updateGeneration(id, { progress, status: 'generating' });
    }

    function onComplete({ id, trackTitle, duration, audioUrl }: { id: string; trackTitle: string; duration: string; audioUrl: string }) {
      const showNotification = useGenerationStore.getState().showNotification;

      updateGeneration(id, {
        status: 'completed',
        progress: 100,
        trackTitle,
        duration,
        audioUrl,
      });

      showNotification({
        id: `completion-${id}`,
        type: 'success',
        title: '🎉 Track Generated!',
        message: `"${trackTitle}" is ready to play`,
      });
    }

    function onFailed({ id, reason }: { id: string; reason: string }) {
      const showNotification = useGenerationStore.getState().showNotification;

      updateGeneration(id, { status: 'failed', failureReason: reason as any });

      showNotification({
        id: `failure-${id}`,
        type: 'error',
        title: 'Generation Failed',
        message: reason === 'server_busy'
          ? 'Server is busy. Please try again.'
          : 'Invalid prompt. Please refine your description.',
      });
    }

    // Connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(EVENTS.GENERATION_START, onStart);
    socket.on(EVENTS.GENERATION_PROGRESS, onProgress);
    socket.on(EVENTS.GENERATION_COMPLETE, onComplete);
    socket.on(EVENTS.GENERATION_FAILED, onFailed);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(EVENTS.GENERATION_START, onStart);
      socket.off(EVENTS.GENERATION_PROGRESS, onProgress);
      socket.off(EVENTS.GENERATION_COMPLETE, onComplete);
      socket.off(EVENTS.GENERATION_FAILED, onFailed);
    };
  }, [updateGeneration]);

  return { joinGeneration };
}

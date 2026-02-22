import { io, Socket } from 'socket.io-client';

// Lazy singleton — only create the socket in the browser, never on the server (SSR).
let socket: Socket | null = null;

export function getSocket(): Socket {
  if (typeof window === 'undefined') {
    // Return a stub during SSR that won't throw.
    // The real socket is only ever used inside useEffect (client).
    return {} as Socket;
  }

  if (!socket) {
    socket = io({
      path: '/api/socket',
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling'], // prefer WS, fallback to polling
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket?.id);
    });

    socket.on('disconnect', (reason) => {
      console.warn('[Socket] Disconnected:', reason);
    });

    socket.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message);
    });

    socket.on('reconnect_attempt', (attempt) => {
      console.log(`[Socket] Reconnection attempt #${attempt}`);
    });

    socket.on('reconnect', (attempt) => {
      console.log(`[Socket] Reconnected after ${attempt} attempts`);
    });
  }

  return socket;
}

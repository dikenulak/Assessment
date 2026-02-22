import { NextResponse } from 'next/server';
import type { Server } from 'socket.io';

// Declare global type for custom server globals
declare global {
  var io: Server;
  var simulateGeneration: (io: Server, id: string, version: string, prompt: string) => Promise<void>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, id: clientId } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: 'invalid_prompt', message: 'Prompt must be at least 3 characters.' },
        { status: 400 }
      );
    }

    // Sanitize prompt
    const sanitizedPrompt = prompt.trim().slice(0, 500);

    // Use client ID if provided (optimistic UI), else generate
    const id = clientId || crypto.randomUUID();
    const version = Math.random() > 0.5 ? 'v1' : 'v2';

    // Trigger simulation on WebSocket server
    if (global.simulateGeneration && global.io) {
      // Fire and forget — don't block the response
      global.simulateGeneration(global.io, id, version, sanitizedPrompt)
        .catch(err => console.error('[API] Simulation error:', err));
    } else {
      console.error('[API] WebSocket server not available. Are you running via `node server.js`?');
      return NextResponse.json(
        { error: 'server_unavailable', message: 'Generation server is not running.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ id, version, status: 'queued' });
  } catch (error) {
    console.error('[API] Generation error:', error);
    return NextResponse.json(
      { error: 'internal_error', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

import { Server } from "socket.io";
import { EVENTS } from "../constants/events";

type EmitPayload =
  | { id: string; version: string; status: string }                               // GENERATION_START
  | { id: string; progress: number; status: string }                              // GENERATION_PROGRESS
  | { id: string; trackTitle: string; audioUrl: string; duration: string }       // GENERATION_COMPLETE
  | { id: string; reason: string };                                               // GENERATION_FAILED

/**
 * Simulation Engine
 *
 * Emits progress events to a specific generation "room" (`gen:<id>`)
 * so only the client(s) watching that generation receive updates.
 * Falls back to broadcast (`io.emit`) if no sockets are in the room,
 * which handles the case where the client hasn't joined the room yet
 * (e.g. first GENERATION_START event).
 */
export async function simulateGeneration(io: Server, id: string, version: string, prompt: string) {
  const shouldFail = Math.random() < 0.15; // 15% failure rate
  const failureReason = Math.random() > 0.5 ? "server_busy" : "invalid_prompt";

  const emit = (event: string, data: EmitPayload) => {
    const room = io.sockets.adapter.rooms.get(`gen:${id}`);
    if (room && room.size > 0) {
      // Targeted: only sockets in the generation room
      io.to(`gen:${id}`).emit(event, data);
    } else {
      // Fallback: broadcast (for GENERATION_START before client joins room)
      io.emit(event, data);
    }
  };

  // Notify client that generation has started
  emit(EVENTS.GENERATION_START, { id, version, status: "generating" });

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  if (shouldFail) {
    await delay(Math.random() * 2000 + 500);
    emit(EVENTS.GENERATION_FAILED, { id, reason: failureReason });
    return;
  }

  const steps = [
    { progress: 0, status: "Starting AI audio engine", delay: 300 },
    { progress: 10, status: "Analyzing prompt...", delay: 800 },
    { progress: 25, status: "Composing melody...", delay: 1200 },
    { progress: 40, status: "Generating harmony...", delay: 1500 },
    { progress: 55, status: "Building arrangement...", delay: 1500 },
    { progress: 70, status: "Synthesizing instruments...", delay: 1500 },
    { progress: 85, status: "Mixing audio...", delay: 1200 },
    { progress: 95, status: "Finalizing master...", delay: 1000 },
  ];

  for (const step of steps) {
    await delay(step.delay);
    emit(EVENTS.GENERATION_PROGRESS, {
      id,
      progress: step.progress,
      status: step.status,
    });
  }

  await delay(800);
  emit(EVENTS.GENERATION_COMPLETE, {
    id,
    trackTitle: prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt,
    duration: "3:42",
    audioUrl: "/audio/sample.mp3",
  });
}

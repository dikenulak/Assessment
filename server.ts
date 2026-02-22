import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server, Socket } from "socket.io";
import { simulateGeneration } from "./server/wsServer";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    // Performance: prefer websocket, fallback to polling
    transports: ["websocket", "polling"],
    // Ping config for detecting dead connections
    pingTimeout: 30000,
    pingInterval: 15000,
  });

  // Expose globally for API routes (custom server shares process memory)
  (global as any).io = io;
  (global as any).simulateGeneration = simulateGeneration;

  interface ClientState {
    connectedAt: Date;
    activeGenerations: string[];
  }

  // Track connected clients
  const connectedClients = new Map<string, ClientState>();

  io.on("connection", (socket: Socket) => {
    console.log(`[WS] Client connected: ${socket.id}`);
    connectedClients.set(socket.id, {
      connectedAt: new Date(),
      activeGenerations: [],
    });

    // Client can join a "generation room" for targeted events
    socket.on("join_generation", (generationId: string) => {
      socket.join(`gen:${generationId}`);
      const client = connectedClients.get(socket.id);
      if (client) {
        client.activeGenerations.push(generationId);
      }
      console.log(`[WS] Socket ${socket.id} joined gen:${generationId}`);
    });

    // Client can request a retry of a failed generation
    socket.on("retry_generation", async ({ id, prompt }: { id: string, prompt: string }) => {
      console.log(`[WS] Retry requested for gen:${id}`);
      const version = "v1";
      // Re-join the room for targeted events
      socket.join(`gen:${id}`);
      await simulateGeneration(io, id, version, prompt);
    });

    socket.on("disconnect", (reason: string) => {
      console.log(`[WS] Client disconnected: ${socket.id} (${reason})`);
      connectedClients.delete(socket.id);
    });

    socket.on("error", (err: Error) => {
      console.error(`[WS] Socket error for ${socket.id}:`, err);
    });
  });

  // Log server stats periodically in dev
  if (dev) {
    setInterval(() => {
      const count = connectedClients.size;
      if (count > 0) {
        console.log(`[WS] Active connections: ${count}`);
      }
    }, 30000);
  }

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket server on path: /api/socket`);
    console.log(`> Environment: ${dev ? "development" : "production"}`);
  });
});

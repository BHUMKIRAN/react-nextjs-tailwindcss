import http from "http";
import { Server } from "socket.io";

/* create plain HTTP server */
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.IO server running");
});

/* attach socket.io */
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* socket logic */
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Received:", data);

    // broadcast to all clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

/* start server */
server.listen(3001, () => {
  console.log("🚀 Socket server running on http://localhost:3001");
});

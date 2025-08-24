import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express app (handles API routes, middleware, etc.)
const app = express();

// Create an HTTP server and attach Express app to it
const server = http.createServer(app);

// Initialize a new Socket.IO server and bind it to our HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5001"], // Allow requests from this frontend origin
    method: ["GET", "POST"], // Allow only GET and POST requests
  },
});

// Helper function: get the socket ID of a given receiver (userId)
export const getReceiverSocketId = (receiverId) => {
  return userSocketmap[receiverId]; // Looks up userId in the map and returns socket.id
};

// Object to store online users in memory
// Format: { userId: socketId }
const userSocketmap = {};

// Fired when a new client connects to the Socket.IO server
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Extract userId from the client’s connection query params
  const userId = socket.handshake.query.userId;

  // Only store if userId is valid (not "undefined")
  if (userId != "undefined") userSocketmap[userId] = socket.id;

  // Send updated list of online users to *all* connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    // Remove user from map when they disconnect
    delete userSocketmap[userId];

    // Send updated online user list to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

// Export app, io, and server (so they can be used in other files)
export { app, io, server };

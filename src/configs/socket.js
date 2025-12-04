import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
transports: ["websocket", "polling"],
});
socket.on("connect", () => {
  console.log("WS connected", socket.id);
});
socket.on("connect_error", (err) => {
  console.log("❌ WS Error:", err.message);
});
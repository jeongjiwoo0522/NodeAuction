import { Server } from "http";

const SSE = require("sse");

const connectSSE = (server: Server) => {
  const sse = new SSE(server);
  sse.on("connection", (client: any) => {
    setInterval(() => {
      client.send(Date.now().toString());
    }, 1000);
  });
}

export default connectSSE;
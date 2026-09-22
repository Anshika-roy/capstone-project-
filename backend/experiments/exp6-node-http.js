const http = require("http");

const PORT = process.env.EXP6_PORT || 6006;
const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to Travel Destination Explorer\n");
});

server.listen(PORT, () => {
  console.log(`Experiment 6 Node HTTP server is running on port ${PORT}`);
});
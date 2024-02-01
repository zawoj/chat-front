const express = require("express");
const { default: helmet } = require("helmet");
const { Server } = require("socket.io");
const app = express();

const server = require("http").Server(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

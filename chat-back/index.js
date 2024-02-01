const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const {
  sesstionMiddleware,
  wrap,
  corsConfig,
} = require("./controllers/server.controller");

require("dotenv").config();

// routes
const authRouter = require("./controllers/auth/auth.controller");

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(sesstionMiddleware);
app.use(express.json());

app.use("/auth", authRouter);

io.use(wrap(sesstionMiddleware));
io.on("connect", (socket) => {
  console.log(socket.request.session.user.username, "connected");
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

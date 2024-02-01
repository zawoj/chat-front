const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

// Redis
const redisClient = require("./redis");
const RedisStore = require("connect-redis").default;

require("dotenv").config();

// routes
const authRouter = require("./controllers/auth/auth.controller");

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "sid",
    resave: false,
    credentials: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    store: new RedisStore({
      client: redisClient,
      disableTouch: true,
    }),
  })
);
app.use(express.json());

app.use("/auth", authRouter);

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

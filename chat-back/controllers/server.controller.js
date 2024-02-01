// Redis
const redisClient = require("../redis");
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const sesstionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: "sid",
  resave: false,
  credentials: true,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
  }),
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

module.exports = {
  sesstionMiddleware,
  wrap,
  corsConfig,
};

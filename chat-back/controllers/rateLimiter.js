const redisClient = require("../redis");

const reatLimiter = async (req, res, next) => {
  const ip = req.connection.remoteAddress;

  const [response] = await redisClient.multi().incr(ip).expire(ip, 60).exec();

  if (response[1] > 10) {
    return res.status(429).send({
      message: "Too many requests",
    });
  }

  next();
};

module.exports = reatLimiter;

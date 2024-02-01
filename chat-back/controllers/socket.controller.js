module.exports.authorizedUsers = (socket, next) => {
  if (socket.request.session.user) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
};

const loggerOne = (request, response, next) => {
  console.log("Log in index");
  next();
};

module.exports = loggerOne;
const loggerTwo = (request, response, next) => {
  console.log("Log in users router");
  next();
};

module.exports = loggerTwo;
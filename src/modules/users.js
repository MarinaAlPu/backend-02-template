const fs = require("fs");
const path = require("path");


const getUsers = () => {
  const pathFile = path.join(__dirname, "../data/users.json");
  return fs.readFileSync(pathFile);
};


module.exports = getUsers;
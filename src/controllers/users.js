const User = require("../models/user");


const getUsers = (request, response) => {
  // Get all users
};

const getUser = (request, response) => {
  // const { user_id } = request.params;
  // response.statusCode = 200;
  // response.send(`User with id ${user_id}`);

  const { user_id } = request.params;

  return User.findById(user_id).then(
    (user) => { response.status(200).send(user) }
  )
    .catch(e => response.status(500).send(e.message));
};

const createUser = (request, response) => {
  // response.statusCode = 201;
  // response.send(request.body);

  console.log("request.body: ", request.body);

  return User.create({ ...request.body })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch(e => response.status(500).send(e.message));
};

const updateUser = (request, response) => {
  // Update user by ID
};

const deleteUser = (request, response) => {
  // Delete user by ID
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

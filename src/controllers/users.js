const User = require("../models/user");


const getUsers = (request, response) => {
  console.log("Запрос getUsers отправлен по адресу", request.originalUrl);
  return User.find({}).then(
    (data) => { response.status(200).send(data) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const getUser = (request, response) => {
  console.log("Запрос getUser отправлен по адресу", request.originalUrl);
  // const { user_id } = request.params;
  // response.statusCode = 200;
  // response.send(`User with id ${user_id}`);

  const { user_id } = request.params;

  return User.findById(user_id)
    .then((user) => {
      if (!user) {
        return response.status(404).send({ "result": "User not found" });
      }
      response.status(200).send(user);
    })
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const createUser = (request, response) => {
  console.log("Запрос createUser отправлен по адресу", request.originalUrl);
  // response.statusCode = 201;
  // response.send(request.body);

  console.log("request.body: ", request.body);

  return User.create({ ...request.body })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const updateUser = (request, response) => {
  console.log("Запрос updateUser отправлен по адресу", request.originalUrl);
  const { user_id } = request.params;

  return User.findByIdAndUpdate(user_id, { ...request.body }, { new: true }).then(
    (user) => { response.status(200).send(user) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const deleteUser = (request, response) => {
  console.log("Запрос deleteUser отправлен по адресу", request.originalUrl);
  const { user_id } = request.params;

  return User.findByIdAndDelete(user_id).then(
    () => { response.status(200).send({ "result": "User deleted" }) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

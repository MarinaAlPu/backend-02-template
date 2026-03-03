const Book = require("../models/book");


const getBooks = (request, response) => {
  console.log("Запрос getBooks отправлен по адресу", request.originalUrl);
  return Book.find({}).then(
    (data) => { response.status(200).send(data) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const getBook = (request, response) => {
  console.log("Запрос getBook отправлен по адресу", request.originalUrl);
  const { book_id } = request.params;

  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return response.status(404).send({ "result": "Book not found" });
      }
      response.status(200).send(book);
    })
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const createBook = (request, response) => {
  console.log("Запрос createBook отправлен по адресу", request.originalUrl);
  return Book.create({ ...request.body })
    .then((book) => {
      response.status(201).send(book);
    })
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const updateBook = (request, response) => {
  console.log("Запрос updateBook отправлен по адресу", request.originalUrl);
  const { book_id } = request.params;

  return Book.findByIdAndUpdate(book_id, { ...request.body }, { new: true }).then(
    (book) => { response.status(200).send(book) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};

const deleteBook = (request, response) => {
  console.log("Запрос deleteBook отправлен по адресу", request.originalUrl);
  const { book_id } = request.params;

  return Book.findByIdAndDelete(book_id).then(
    () => { response.status(200).send({ "result": "Book deleted" }) }
  )
    .catch(e => response.status(500).send({ "error message": e.message }));
};


module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
}

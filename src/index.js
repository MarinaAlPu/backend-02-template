const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config();


const {
    PORT = 3000,
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://localhost:27017/backend"
} = process.env;


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        if (error) throw error;
    });

const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use(userRouter);
app.use(bookRouter);


app.use((request, response) => {
    response.status(404).json({
        message: "Неправильный URL"
    });
});


app.listen(`${PORT}`, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});

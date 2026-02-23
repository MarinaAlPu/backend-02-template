const http = require('http');
const getUsers = require('./modules/users');
require('dotenv').config();

const PORT = process.env.PORT;


const server = http.createServer((request, response) => {
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200 +
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400 +
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200 +
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200 +
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500 +

    if (request.url === '/favicon.ico') {
        response.statusCode = 204;
        response.end();
        return;
    }


    if (request.url === "/?users") {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type = application/json";
        response.write(getUsers());
        response.end();

        return;
    };


    const url = new URL(request.url, 'http://127.0.0.1:3003');
    const params = url.searchParams;
    const keys = params.keys();

    let paramsNames = [];

    for (let key of keys) {
        paramsNames.push(key);
    }

    if (paramsNames.length > 0) {
        const isParamsNamesWrong = paramsNames.some(paramName => paramName !== "hello");

        if (isParamsNamesWrong) {
            response.status = 500;
            response.statusMessage = "Error";
            response.header = "Content-Type: text/plain";
            response.write("Empty");
            response.end();

            return;
        }

        if (request.url.includes("hello")) {
            const url = new URL(request.url, 'http://127.0.0.1:3003');
            const hasHello = url.searchParams.has('hello');
            const hello = url.searchParams.get('hello');

            if (hasHello) {
                if (hello) {
                    response.status = 200;
                    response.statusMessage = "OK";
                    response.header = "Content-Type: text/plain";
                    response.write(`Hello, ${hello}.`);
                    response.end();

                    return;
                }

                if (!hello) {
                    response.status = 400;
                    response.statusMessage = "Bad request";
                    response.header = "Content-Type: text/plain";
                    response.write("Enter a name");
                    response.end();

                    return;
                }
                return;
            }
            return;
        };
        return;
    };


    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: text/plain";
    response.write("Hello, World!");
    console.log("response.status: ", response.status);
    response.end();
});


server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу 127.0.0.1:${PORT}`);
})

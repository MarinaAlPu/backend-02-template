const http = require('http');
const getUsers = require('./modules/users');
require('dotenv').config();

const PORT = process.env.PORT;
// const name = "Marina";


const server = http.createServer((request, response) => {
    // Написать обработчик запроса:
    // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200 +
    // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400 +
    // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200 +
    // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200 +
    // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

    // console.log("новый запрос");

    if (request.url === '/favicon.ico') {
        response.statusCode = 204;
        response.end();
        return;
    }

    // if (request.url === `?hello=${name}`) {
    //     response.status = 200;
    //     response.statusMessage = "OK";
    //     response.header = "Content-Type: text/plain";
    //     response.write(`Hello, ${name}.`);
    //     response.end();

    //     return;
    // }

    // if (request.url.includes("hello")) {
    //     const url = new URL(request.url, 'http://127.0.0.1');
    //     // console.log("url:", url);

    //     const hasHello = url.searchParams.has('hello');
    //     // console.log("has hello: ", hasHello);

    //     const hello = url.searchParams.get('hello');
    //     // console.log("hello: ", hello);
    //     // console.log("тип данных hello: ", typeof(hello));
    //     // console.log("!hello: ", !hello);
    //     // console.log("тип данных !hello: ", typeof (!hello));
    //     // console.log("!!hello: ", !!hello);
    //     // console.log("тип данных !!hello: ", typeof (!!hello));

    //     if (hasHello) {
    //         if (hello) {
    //             response.status = 200;
    //             response.statusMessage = "OK";
    //             response.header = "Content-Type: text/plain";
    //             response.write(`Hello, ${hello}.`);
    //             response.end();

    //             return;
    //         }

    //         if (!hello) {
    //             response.status = 400;
    //             response.statusMessage = "Bad request";
    //             response.header = "Content-Type: text/plain";
    //             response.write("Enter a name");
    //             response.end();

    //             return;
    //         }
    //         return;
    //     }
    //     return;
    // };

    if (request.url === "/?users") {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = "Content-Type = application/json";
        response.write(getUsers());
        response.end();

        return;
    };

    // console.log("http://${request.headers.host}: ", `http://${request.headers.host}`);

    const url = new URL(request.url, 'http://127.0.0.1:3003');
    // const url = new URL(request.url, `http://${request.headers.host}`);
    console.log("url:", url);

    const params = url.searchParams;
    console.log("параметры в url:", params);

    // const params = new URLSearchParams(request.url);
    // console.log("params: ", params);

    const keys = params.keys();
    console.log("keys: ", keys);

    let paramsNames = [];

    for (let key of keys) {
        paramsNames.push(key);
    }

    console.log("paramsNames: ", paramsNames);


    if (paramsNames.length > 0) {
        const isParamsNamesWrong = paramsNames.some(paramName => {
            console.log("paramName: ", paramName);
            return paramName !== "hello";
        });
        console.log("isParamsNamesWrong: ", isParamsNamesWrong);

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



// const server = http.createServer((request, response) => {
//     // Сразу отфильтровываем favicon.ico
//     if (request.url === '/favicon.ico') {
//         response.statusCode = 204;
//         response.end();
//         return;
//     }

//     // Правильно парсим URL
//     const fullUrl = new URL(request.url, `http://${request.headers.host}`);
//     const searchParams = fullUrl.searchParams;

//     // Получаем все имена параметров
//     const paramsNames = Array.from(searchParams.keys());
//     console.log("paramsNames: ", paramsNames);

//     // Проверяем, что нет параметров, кроме hello
//     if (paramsNames.length > 0) {
//         const hasNonHelloParam = paramsNames.some(paramName => paramName !== "hello");

//         if (hasNonHelloParam) {
//             response.statusCode = 500;
//             response.statusMessage = "Error";
//             response.setHeader('Content-Type', 'text/plain');
//             response.write("Empty");
//             response.end();
//             return;
//         }
//     }

//     response.statusCode = 200;
//     response.setHeader('Content-Type', 'text/plain');
//     response.write("OK");
//     response.end();
// });


server.listen(PORT, () => {
    console.log(`Сервер запущен по адресу 127.0.0.1:${PORT}`);
})

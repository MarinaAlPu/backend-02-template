const cors = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PATCH, DELETE');
    next();
}


module.exports = cors;

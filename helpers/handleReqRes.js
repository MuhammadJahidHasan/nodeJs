const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../route');
const { notFound } = require('../handlers/routeHandler/notFound');
const { parseJson } = require('./utilities');

const handaler = {};
handaler.handleReqRes = (req, res) => {
    const parsePath = url.parse(req.url, true);
    const routePath = parsePath.pathname;
    const trimedPath = routePath.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parsePath.query;
    const header = req.headers;

    const decoder = new StringDecoder('utf-8');
    let reqData = '';

    const requestProperties = {
        parsePath,
        routePath,
        trimedPath,
        method,
        queryStringObj,
        header,
    };

    const selectedHandler = routes[trimedPath] ? routes[trimedPath] : notFound;

    req.on('data', (buffer) => {
        reqData += decoder.write(buffer);
    });

    req.on('end', () => {
        reqData += decoder.end();
        requestProperties.body = parseJson(reqData);
        selectedHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;

            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};
module.exports = handaler;

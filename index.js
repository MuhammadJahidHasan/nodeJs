const http = require('http');

const { handleReqRes } = require('./helpers/handleReqRes');
const data = require('./lib/data');

const environment = require('./helpers/environment');

const app = {};

// data.create('test', 'test', { name: 'Sakib', age: 22 }, (err) => {
//     console.log(err);
// });

// data.read('test', 'test', (err, result) => {
//     console.log(err, result);
// });

// data.update('test', 'test', { name: 'Tarek', age: 23 }, (err) => {
//     console.log(err);
// });

// data.delete('test', 'test', (err) => {
//     console.log(err);
// });
app.createServers = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        console.log(`Listening to ${environment.port}`);
    });
};

app.handleReqRes = handleReqRes;

app.createServers();

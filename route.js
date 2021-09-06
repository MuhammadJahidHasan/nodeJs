const { sampleHandler } = require('./handlers/routeHandler/handlers');
const { usersHandler } = require('./handlers/routeHandler/usersHandler');

const routes = {
    sample: sampleHandler,
    users: usersHandler,
};

module.exports = routes;

const notFoundHandler = {};

notFoundHandler.notFound = (requestProperties, cb) => {
    cb(400, {
        message: 'This URL was not found',
    });
};

module.exports = notFoundHandler;

const handler = {};

handler.sampleHandler = (requestProperties, cb) => {
    console.log('sample');

    cb(200, {
        message: 'This is a URL',
    });
};

module.exports = handler;

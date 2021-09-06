const data = require('../../lib/data');
const { has } = require('../../helpers/utilities');
const { parseJson } = require('../../helpers/utilities');

const handler = {};

handler.usersHandler = (requestProperties, cb) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        // console.log(requestProperties.method);
        handler.users[requestProperties.method](requestProperties, cb);
    } else {
        cb(405);
    }
};

handler.users = {};
handler.users.get = (requestProperties, cb) => {
    const phone =
        typeof requestProperties.queryStringObj.phone === 'string'
        && requestProperties.queryStringObj.phone.trim().length === 11
            ? requestProperties.queryStringObj.phone
            : false;

    if (phone) {
        data.read('users', phone, (err, users) => {
            const user = { ...parseJson(users) };
            if (!err) {
                delete user.password;
                cb(200, user);
            } else {
                cb(404, {
                    error: 'no user available',
                });
            }
        });
    } else {
        cb(404, {
            error: 'no user available',
        });
    }
};
handler.users.post = (requestProperties, cb) => {
    const name =
        typeof requestProperties.body.name === 'string'
        && requestProperties.body.name.trim().length > 0
            ? requestProperties.body.name
            : false;

    const phoneNumber =
        typeof requestProperties.body.phoneNumber === 'string'
        && requestProperties.body.phoneNumber.trim().length === 11
            ? requestProperties.body.phoneNumber
            : false;

    const password =
        typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tosAgreement =        typeof requestProperties.body.tosAgreement === 'boolean'
            ? requestProperties.body.tosAgreement
            : false;
    if (name && phoneNumber && password && tosAgreement) {
        data.read('users', phoneNumber, (err) => {
            if (err) {
                const userObj = {
                    name,
                    phoneNumber,
                    password: has(password),
                    tosAgreement,
                };

                data.create('users', phoneNumber, userObj, (err2) => {
                    console.log(err2);
                    if (!err2) {
                        cb(200, {
                            message: 'User create successfully',
                        });
                    } else {
                        cb(500, {
                            error: 'User does not create successfully',
                        });
                    }
                });
            } else {
                cb(500, {
                    error: 'There is an error in server side',
                });
            }
        });
    } else {
        cb(400, {
            error: 'Bad request',
        });
    }
};
handler.users.put = (requestProperties, cb) => {
    const name =
        typeof requestProperties.body.name === 'string'
        && requestProperties.body.name.trim().length > 0
            ? requestProperties.body.name
            : false;

    const phoneNumber =
        typeof requestProperties.body.phoneNumber === 'string'
        && requestProperties.body.phoneNumber.trim().length === 11
            ? requestProperties.body.phoneNumber
            : false;

    const password =
        typeof requestProperties.body.password === 'string'
        && requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phoneNumber && (name || password)) {
        data.read('users', phoneNumber, (err, result) => {
            const upResult = { ...parseJson(result) };
            if (!err && result) {
                if (name) {
                    upResult.name = name;
                }
                if (password) {
                    upResult.password = has(password);
                }
                data.update('users', phoneNumber, upResult, (err2) => {
                    if (!err2) {
                        cb(400, {
                            message: 'Update successfully',
                        });
                    } else {
                        cb(500, {
                            message: 'Internal server error',
                        });
                    }
                });
            } else {
                cb(405, {
                    error: 'bad request',
                });
            }
        });
    } else {
        cb(405, {
            error: 'bad request',
        });
    }
};
handler.users.delete = (requestProperties, cb) => {
    const phone =
        typeof requestProperties.queryStringObj.phone === 'string'
        && requestProperties.queryStringObj.phone.trim().length === 11
            ? requestProperties.queryStringObj.phone
            : false;

    if (phone) {
        data.read('users', phone, (err, result) => {
            if (!err && result) {
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        cb(200, {
                            error: 'Delete successfully',
                        });
                    } else {
                        cb(500, {
                            error: 'Internal server error',
                        });
                    }
                });
            } else {
                cb(500, {
                    error: 'Internal server error',
                });
            }
        });
    } else {
        cb(404, {
            error: 'not found the user',
        });
    }
};

module.exports = handler;

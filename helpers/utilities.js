const crypto = require('crypto');
const environment = require('./environment');

const utilities = {};

utilities.parseJson = (jsonData) => {
    let result;
    try {
        result = JSON.parse(jsonData);
    } catch {
        result = {};
    }
    return result;
};

utilities.has = (passStr) => {
    if (typeof passStr === 'string' && passStr.length > 0) {
        const hash = crypto
            .createHmac('sha256', environment.secretKey)
            .update(passStr)
            .digest('hex');
        return hash;
    }
    return false;
};
module.exports = utilities;

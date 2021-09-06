const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname, '/../.data/');

lib.create = (dir, fileName, data, cb) => {
    fs.open(`${lib.basedir + dir}/${fileName}.json`, 'wx', (error1, fileDescriptor) => {
        if (!error1 && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, (error2) => {
                if (!error2) {
                    fs.close(fileDescriptor, (error3) => {
                        if (!error3) {
                            cb(false);
                        } else {
                            cb('Error closing the new file');
                        }
                    });
                } else {
                    cb('Error writing the new file');
                }
            });
        } else {
            cb('Error writing the new file or already exists');
        }
    });
};

lib.read = (dir, fileName, cb) => {
    fs.readFile(`${lib.basedir + dir}/${fileName}.json`, 'utf8', (err, data) => {
        cb(err, data);
    });
};

lib.update = (dir, fileName, data, cb) => {
    fs.open(`${lib.basedir + dir}/${fileName}.json`, 'r+', (err1, fileDescriptor) => {
        if (!err1 && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDescriptor, stringData, (error3) => {
                        if (!error3) {
                            fs.close(fileDescriptor, (error4) => {
                                if (!error4) {
                                    cb(false);
                                } else {
                                    cb('Error closing the new file');
                                }
                            });
                        } else {
                            cb('Error writing the new file');
                        }
                    });
                }
            });
        } else {
            console.log('There is an error, may file not exsist');
        }
    });
};

lib.delete = (dir, fileName, cb) => {
    fs.unlink(`${lib.basedir + dir}/${fileName}.json`, (err) => {
        if (!err) {
            cb(false);
        } else {
            cb('Error while deleting the file');
        }
    });
};

module.exports = lib;

const glob = require('glob');

const webpack = require('webpack');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

function getAllEntry() {
    const _path = '/lib/';
    const _suffix = '.js';

    const _util = 'util/';

    let _arr = [];
    let entry = {
        util: {},
        modules: {},
        main: ''
    };

    // util
    glob.sync(`${__dirname}${_path}${_util}*${_suffix}`).forEach((file) => {
        const _file = file.substr(file.lastIndexOf('/') + 1);
        const name = `${_util}${_file.substr(0, _file.length - _suffix.length)}`;

        entry.util[name] =  `.${_path}${name}${_suffix}`;
    });

    Object.keys(entry.util).forEach((item) => {
        _arr.push(entry.util[item]);
    });

    // .modules
    glob.sync(`${__dirname}${_path}*${_suffix}`).forEach((file) => {
        const _file = file.substr(file.lastIndexOf('/') + 1);
        const name = _file.substr(0, _file.length - _suffix.length);

        if(name === 'shine') {
            entry.main = `.${_path}${name}${_suffix}`;
            return false;
        }

        entry.modules[name] =  `.${_path}${name}${_suffix}`;
    });

    Object.keys(entry.modules).forEach((item) => {
        _arr.push(entry.modules[item]);
    });

    _arr.push(entry.main);

    return _arr;
}

module.exports = {
    entry: getAllEntry(),
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'shine.min.js'
    },
    plugins: [
        new uglifyjsWebpackPlugin({
            sourceMap: true,
            parallel: true
        })
    ]
};

// console.log(getAllEntry());
const EjsCompilePlugin = require('../index.js');

const config = {
    mode: 'development',
    entry: {
        'test': './test-entry.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'webpack-3.bundle.js'
    },
    module: {},
    plugins: [
        new EjsCompilePlugin({
            template: 'test/index.ejs',
            filename: 'dist/webpack-3.html',
            properties: {
                test: 'webpack-3-ejs-test'
            },
            webpackVersion: 3
        })
    ]
};

module.exports = config;
